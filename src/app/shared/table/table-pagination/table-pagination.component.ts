import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PagedResult } from 'projects/lib/src/public-api';
import { FilterParams } from '../../core/models/filterParams.model';

@Component({
  selector: 'stock-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePaginationComponent<T> implements OnChanges {
  @Input() pagedResult!: PagedResult<T>;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  @Output() filterChange = new EventEmitter<FilterParams>();

  totalResults = 0;
  totalPages = 0;
  initialPageSize = this.pageSizeOptions[0];

  visiblePageSelectors: number[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['pagedResult'] &&
      changes['pagedResult'].currentValue !== null
    ) {
      const pagedResult = changes['pagedResult'].currentValue as PagedResult<T>;
      this.totalResults = pagedResult.totalResults;
      this.totalPages = Math.ceil(
        pagedResult.totalResults / pagedResult.pageSize
      );
      this.visiblePageSelectors = this.createRange(
        pagedResult.totalResults,
        pagedResult.pageSize,
        pagedResult.pageNumber
      );
    }
  }

  gotoPage(pageNumber: number) {
    this.filterChange.emit({ pageSize: this.pagedResult.pageSize, pageNumber });
  }

  setPageSize(pageSize: number) {
    this.filterChange.emit({
      pageNumber: this.pagedResult.pageNumber,
      pageSize,
    });
  }

  // Set Max items based on container size (to show as many as possible)
  private createRange(
    totalResults: number,
    pageSize: number,
    pageNumber: number,
    pagesToShow: number = 6
  ): number[] {
    if (totalResults < pageSize) {
      return [1];
    }

    // Pivot around the current page number
    let totalPages = Math.ceil(totalResults / pageSize);
    let start = pageNumber - Math.round(pagesToShow / 2);
    let end = pageNumber + Math.round(pagesToShow / 2);

    let boundedStart = start < 0 ? 0 : start;
    let boundedEnd = end > totalPages ? totalPages : end;

    let pagesShown = boundedEnd - boundedStart;

    // Always try to show as many items as we can
    if (pagesShown < pagesToShow && boundedStart > 0) {
      boundedStart = totalPages - pagesToShow;
    } else if (pagesShown < pagesToShow && boundedEnd < totalPages) {
      boundedEnd = pagesToShow;
    }

    let displayed = [];

    for (let i = boundedStart; i < boundedEnd; i++) {
      displayed.push(i + 1);
    }

    return displayed;
  }
}
