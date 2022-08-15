import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'cesg-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit, AfterViewInit {
  @ViewChild('ngForm') ngForm!: NgForm;
  searchForm!: FormGroup;

  searchDebounceTimeMs = 2000;
  lastSearch: number = new Date().getTime();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    console.log(this.ngForm);
    this.searchForm = this.createSearchForm();
  }

  ngAfterViewInit() {
    this.searchService.registerSearchControl(this);
  }

  createSearchForm(): FormGroup {
    return this.fb.group({
      searchTerm: ['', Validators.required],
    });
  }

  onSubmit() {
    const searchTermControl = this.searchForm.get('searchTerm');
    if (this.debounceSearch() || !searchTermControl?.value) return;
    if (!this.searchForm.valid || !searchTermControl) {
      this.searchForm.markAllAsTouched;
    }
    this.router.navigate(['./search'], {
      queryParams: { searchTerm: searchTermControl?.value },
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
