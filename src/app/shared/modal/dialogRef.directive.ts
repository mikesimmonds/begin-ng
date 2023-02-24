import { DialogRef } from '@angular/cdk/dialog';
import { Directive, EmbeddedViewRef, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

interface DialogRefContext {
  $implicit: any;
}
/**
 * This structural directive exposes the dialog reference to a
 * #templateReference so that the modal can be closed from the template.
 * If the template is used anywhere that is not a modal, an ugly error will be
 * thrown!
 *
 * @example
 * ```
 * <ng-template #modalContent>
 *  <div *dialogRef="let dialogRef">
 *   <button appButton (click)="dialogRef.close()">Close</button>
 *  </div>
 * </ng-template>
 * ```
 *
 * @export
 * @class DialogRefDirective
 * @implements {OnInit}
 */
@Directive({
  selector: '[dialogRef]',
})
export class DialogRefDirective implements OnInit {
  static ngTemplateContextGuard(
    _dir: DialogRefDirective,
    ctx: unknown
  ): ctx is DialogRefContext {
    return true;
  }

  private view?: EmbeddedViewRef<DialogRefContext>;

  dialogData!: any;

  constructor(
    private templateRef: TemplateRef<DialogRefContext>,
    private vcr: ViewContainerRef,
    private dialogRef: DialogRef
  ) {}

  ngOnInit(): void {
      this.setContext();
  }

  setContext() {
    if (!this.dialogRef) {
      this.view?.destroy();
      this.view = undefined;
      throw new Error('*dialogRef directive is not being used within a dialog')
      return;
    }

    if (this.view) {
      this.view.context.$implicit = this.dialogRef;
      this.view.markForCheck();
      return;
    }

    // create an embedded view of the templateRef (whats inside the element that has the directive on it)
    // set the context of the embedded view to the error (to allow  "let error" syntax)
    this.view = this.vcr.createEmbeddedView(this.templateRef, {
      $implicit: this.dialogRef,
    });
  }

}
