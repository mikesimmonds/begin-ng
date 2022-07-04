import { Component, HostListener } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-wrapper" *ngIf="isLoading$ | async">
      <ng-content></ng-content>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  isLoading$ = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService) {}
}
