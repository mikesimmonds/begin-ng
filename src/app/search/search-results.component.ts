import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SearchResult } from '../services/api.service';
import { SearchService } from './search.service';

@Component({
  selector: 'cesg-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  results$!: Observable<SearchResult[]>;
  searchTerm: Observable<string> = this.searchService.searchUpdate$.pipe(
    map((update) => update.query)
  );

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.results$ = this.route.queryParams.pipe(
      switchMap((params: Params) => {
        return this.searchService.search(params['searchTerm']);
      })
    );
  }
}
