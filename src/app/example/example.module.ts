import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example.component';
import { ExampleNavBarComponent } from './example-nav-bar/example-nav-bar.component';
import { ExampleModalComponent } from './example-modal/example-modal.component';



@NgModule({
  declarations: [
    ExampleComponent,
    ExampleNavBarComponent,
    ExampleModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ExampleModule { }
