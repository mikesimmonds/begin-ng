import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormModule } from '../custom-form/custom-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormModule,
    LayoutModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormModule,
    LayoutModule,
  ],
})
export class SharedModule {}
