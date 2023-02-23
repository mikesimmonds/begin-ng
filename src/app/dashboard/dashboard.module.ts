import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ExampleModalComponent } from '../example/example-modal/example-modal.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NavBarComponent,
    ExampleModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
