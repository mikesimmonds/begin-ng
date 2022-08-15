import { Injectable } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { RestService } from '../core/rest.service';
import { SearchResult } from '../services/api.service';
import { SearchInputComponent } from './search-input/search-input.component';

export interface SearchUpdate {
  currentSearchValue: string;
  query: string;
  results: any[];
  isLoading: boolean;
}

/**
 * Todo:
 *  1. Make more generic so you can have multiple searches in one app.
 *    this will require the config includes a service or reference to the search endpoint. A factory fn to create the services .
 */

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  config = {
    queryParamKey: 'searchTerm',
  };

  initSearchUpdate: SearchUpdate = {
    currentSearchValue: '',
    query: '',
    results: [],
    isLoading: false,
  };

  _searchUpdate: BehaviorSubject<SearchUpdate> = new BehaviorSubject(
    this.initSearchUpdate
  );
  searchUpdate$: Observable<SearchUpdate> = this._searchUpdate
    .asObservable()
    .pipe(distinctUntilChanged());

  isSubmitted = false;

  ngForm!: NgForm;

  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  registerSearchControl(searchInputCompo: SearchInputComponent) {
    this.ngForm = searchInputCompo.ngForm;
    this.isSubmitted = this.ngForm.submitted;
    const searchControl = this.ngForm.form.get(this.config.queryParamKey);
    if (searchControl) {
      this.listenToSearchValueChanges(searchControl);
    }
    this.listenToSubmit(this.ngForm);
    this.listenToParamChanges();
  }

  listenToSubmit(ngForm: NgForm) {
    ngForm.ngSubmit
      .pipe(
        map(() => this._searchUpdate.getValue()),
        tap((searchUpdateValue) => {
          this._searchUpdate.next({
            ...searchUpdateValue,
            isLoading: true,
            query: searchUpdateValue.currentSearchValue,
          });
        }),
        switchMap((searchUpdateValue) => {
          return this.search(searchUpdateValue.currentSearchValue);
        })
      )
      .subscribe((results) => {
        const currentValue = this._searchUpdate.getValue();
        this._searchUpdate.next({
          ...currentValue,
          isLoading: false,
          query: currentValue.currentSearchValue,
          results: results,
        });
      });
  }

  listenToSearchValueChanges(searchControl: AbstractControl) {
    searchControl.valueChanges
      .pipe(map((searchValue) => searchValue.toString())) // consider error handling
      .subscribe((searchValue: string) => {
        this._searchUpdate.next({
          ...this._searchUpdate.getValue(),
          currentSearchValue: searchValue,
        });
      });
  }

  /**
   *On route params change we update the value of the search input and submit the form programatically
   *
   * @memberof SearchService
   */
  listenToParamChanges() {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params[this.config.queryParamKey];
      if (searchTerm) {
        this.ngForm.form.get(this.config.queryParamKey)?.setValue(searchTerm);
        this.ngForm.ngSubmit.emit();
      }
    });
  }

  setParams(searchTerm: string) {
    this.router.navigate([''], {
      queryParams: { searchTerm },
      skipLocationChange: true,
    });
  }

  search(query: string): Observable<SearchResult[]> {
    return this.restService
      .search(query)
      .pipe(map((response) => response.results));
  }
}
