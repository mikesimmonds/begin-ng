import { Component, Input, OnInit } from '@angular/core';
import { SearchResult } from 'src/app/services/api.service';

@Component({
  selector: 'cesg-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  @Input() result!: SearchResult | null;

  constructor() {}

  ngOnInit(): void {}
}
