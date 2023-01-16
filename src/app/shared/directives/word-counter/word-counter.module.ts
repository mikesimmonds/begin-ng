import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordCounterDirective } from './word-count-input.directive';



@NgModule({
  declarations: [
    WordCounterDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WordCounterDirective
  ]
})
export class WordCounterModule { }
