import { Component } from '@angular/core';

@Component({
  template: `
    <div>
      <h1>four-oh-four! That page is not found</h1>
      <a [routerLink]="'/'">Return to hompage</a>
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
        pointer-events: none;
        background: white;
      }
    `,
  ],
})
export class PageNotFoundComponent {}
