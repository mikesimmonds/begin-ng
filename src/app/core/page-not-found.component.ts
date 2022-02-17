import { Component } from '@angular/core';

@Component({
  template: `
    <div>
      <h1>Page not found</h1>
      <a [routerLink]="'/'" bgngArrowLink>Return to hompage</a>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        position: absolute;
        inset: 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      div {
        padding: 5% 10%;
        border: 1px solid var(--secondary);
        text-align: center;
      }
    `,
  ],
})
export class PageNotFoundComponent {}
