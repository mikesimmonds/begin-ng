import {
  AfterContentInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValidationErrorMessageService } from './validation-error-message.service';

/*
To use this directive:

This is the preferred way as you explicitly provide an element in which to insert the
validation errors.
<input type="text" formControlName="projectName" [bgngValidationErrors]="projectName">
<div #projectName>**error-message**</div>

If you do not give the directive a template reference, it will create an element and
attach it as a sibling to the input element
<input type="text" formControlName="projectName" bgngValidationErrors>
<inserted-div>**error-message**</inserted-div>




 */

@Directive({
  selector: '[bgngValidationErrors]',
})
export class ValidationErrorsDirective implements AfterContentInit {
  @Input('bgngValidationErrors') errorEl!: HTMLElement;

  constructor(
    private errorService: ValidationErrorMessageService,
    @Self() private ngControl: NgControl,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterContentInit(): void {
    this.createErrorEl();
    this.errorService
      .registerForErrors(this.elRef, this.ngControl.control)
      .subscribe((errorMessage: string) => {
        this.applyErrorMessage(errorMessage);
      });
  }

  private createErrorEl() {
    if (!this.errorEl) {
      this.insertErrorEl();
    }
  }

  private applyErrorMessage(errorMessage: string) {
    if (this.errorEl) {
      this.errorEl.innerText = errorMessage;
    } else {
      console.error('Could not find or create an element to display errors');
    }
  }

  private insertErrorEl() {
    this.errorEl = this.renderer.createElement('span');
    this.renderer.addClass(this.errorEl, 'validation-error-message');
    this.renderer.appendChild(
      this.elRef.nativeElement.parentElement,
      this.errorEl
    );
  }
}
