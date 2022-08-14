import { DataSource } from '@angular/cdk/collections';
import {
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TemplateNameDirective } from '../template-name.directive';

interface DisplayedColumn {
  propName: string;
  colTitle: string;
}

@Component({
  selector: 'stock-table-base',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.scss'],
})
export class TableBaseComponent<TData extends {}> implements OnChanges {


  @Input() data: TData[] | null = [];
  @Input() displayedColumns!: DisplayedColumn[];

  @ContentChildren(TemplateNameDirective)
  templates!: QueryList<TemplateNameDirective<TData>>;

  private tableData = new BehaviorSubject([]);

  dataSource = new TableBaseDataSource(this.tableData.asObservable());
  columns: keyof TData[] | null = null;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.tableData.next(changes['data'].currentValue);
    }
    if (changes['displayedColumns']) {
      this.columns = changes['displayedColumns'].currentValue.map((dCol: DisplayedColumn) => dCol.propName);
    }
  }

  getTemplate(name: string): TemplateRef<TData> | null {
    let template = this.templates.find((template) => template.name === name);
    return template ? template.template : null;
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class TableBaseDataSource<TData> extends DataSource<TData> {
  /** Stream of data that is provided to the table. */
  constructor(private tableData: Observable<TData[]>) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<TData[]> {
    return this.tableData;
  }

  disconnect() {}
}
