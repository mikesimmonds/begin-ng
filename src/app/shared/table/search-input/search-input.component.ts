import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';

/* This isn;t the greatest implementation for a number of reasons
 - doesnt reflect chagnes in qParams
 - isn't particularly nice to implement / reuse
 - requires unnecessary changes to the containing element.

 A pipe based solution would e much better
 */

@Component({
  selector: 'cesg-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() unfilteredData: any[] | null = [];
  @Output() filteredData: EventEmitter<any[] | null> = new EventEmitter();

  @ViewChild('ngForm') ngForm!: NgForm;
  searchForm!: UntypedFormGroup;

  searchDebounceTimeMs = 2000;
  lastSearch: number = new Date().getTime();

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.createSearchForm();
    this.searchForm.valueChanges.subscribe((_) => this.onSubmit());
  }

  ngAfterViewInit() {
    // TODO (@nmtmason): Why is unfilteredData sometimes null at this point?
    if (this.unfilteredData) {
      this.filteredData.emit(this.unfilteredData);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['unfilteredData'].firstChange) {
      this.onSubmit();
    }
  }

  createSearchForm(): UntypedFormGroup {
    return this.fb.group({
      searchTerm: ['', Validators.required],
    });
  }
  /**
   * The  submitted, the component updates the urlbar which is picked up by the service.
   *
   * @return {*}
   * @memberof SearchInputComponent
   */
  onSubmit() {
    const searchTermControl = this.searchForm.get('searchTerm');
    if (!searchTermControl?.value) {
      this.filteredData.emit(this.unfilteredData);
      return;
    }
    if (this.debounceSearch() || !this.unfilteredData?.length) return;
    if (!this.searchForm.valid || !searchTermControl) {
      this.searchForm.markAllAsTouched;
    }
    const filteredData = this.filter(
      searchTermControl.value,
      this.unfilteredData
    );
    this.filteredData.emit(filteredData);
  }

  /**
 *If any of the data items are strings that contain the query
 then display the whole data item
 *
 * @param {string} query
 * @param {any[]} unfilteredData
 * @return {*}  {any[]}
 * @memberof SearchService
 */
  filter(query: string, unfilteredData = [] as any[]): any[] {
    return unfilteredData.filter((dataItem) => {
      return Object.values(dataItem).find((val: any) => {
        return (
          typeof val == 'string' &&
          val.toLocaleLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }

  /**
   * returns true if search should be suppressed
   *
   * @return {*}  {boolean}
   * @memberof SearchInputComponent
   */
  debounceSearch(): boolean {
    const timeNow = new Date().getTime();
    const interval = timeNow - this.lastSearch;
    return interval < this.searchDebounceTimeMs;
  }
}
