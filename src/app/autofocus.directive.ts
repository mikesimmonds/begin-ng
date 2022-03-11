import { Directive, ElementRef } from '@angular/core';
/**
 * Autofocus directive for Angular.
 * Required as the native autoficus only works on page reload - which may not be the case in an SPA
 *
 * @export
 * @class AutofocusDirective
 */
@Directive({
  selector: '[autofocus]',
})
export class AutofocusDirective {
  constructor(private host: ElementRef) {}

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }
}
