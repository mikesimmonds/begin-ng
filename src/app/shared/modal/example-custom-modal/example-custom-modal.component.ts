import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
/**
 *
 * @usage ```this.modalService.open(ExampleCustomModalComponent, {}).closed.subscribe((result) => {
      console.log(`result: `, result)
    });```
 *
 * @export
 * @class ExampleCustomModalComponent
 */
@Component({
  templateUrl: './example-custom-modal.component.html',
  styleUrls: ['./example-custom-modal.component.scss']
})
export class ExampleCustomModalComponent {

  data: any;

  constructor(
    public dialogRef: DialogRef<string, ExampleCustomModalComponent>,
    @Inject(DIALOG_DATA) data: any
  ) {
    this.data = data;
  }


}
