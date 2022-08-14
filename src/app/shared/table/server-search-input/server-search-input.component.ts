import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'stock-server-search-input',
  templateUrl: './server-search-input.component.html',
  styleUrls: ['./server-search-input.component.scss'],
})
export class ServerSearchInputComponent implements OnInit {
  @Output() searchChange = new EventEmitter<string>();

  searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.searchChange.emit(this.searchForm.value.searchTerm || '');
  }
}
