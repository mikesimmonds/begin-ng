import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormModule } from '../custom-form/custom-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomFormModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, CustomFormModule],
})
export class SharedModule {}
