import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormModule } from './custom-form/custom-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { HourMinSecPipe } from './hour-min-sec.pipe';

@NgModule({
  declarations: [HourMinSecPipe],
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
    HourMinSecPipe,
  ],
})
export class SharedModule {}
