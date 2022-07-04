import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface DisplayedColumn {
  propName: string;
  colTitle: string;
};

@Component({
  selector: 'stock-table-base',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.scss']
})
export class TableBaseComponent implements OnChanges {

  @Input() displayedColumns!: DisplayedColumn[];

  columns: string[] | null = null;
  @Input() data: (any[] | null) = [];

  _tableData: BehaviorSubject<any[]> = new BehaviorSubject([] as any[]);
  tableData$ = this._tableData.asObservable();

  // test workaround implement onchanges for dynamic table
  dataSource: any = new TableBaseDataSource<any[]>(this.tableData$);

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`changes: `, changes)
    if (changes['data']) {
      this._tableData.next(changes['data'].currentValue);
    }
    if (changes['displayedColumns']) {
      this.columns = changes['displayedColumns'].currentValue.map((dCol: DisplayedColumn) => dCol.propName);
    }

  }

}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
 export class TableBaseDataSource<T> extends DataSource<T> {
   /** Stream of data that is provided to the table. */
   constructor(private tableData: Observable<T[]>) {
     super()
   }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<T[]> {
    return this.tableData;
  }

  disconnect() {}
}
