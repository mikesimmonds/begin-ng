import { FocusTrapFactory, InteractivityChecker, FocusMonitor } from '@angular/cdk/a11y';
import { CdkDialogContainer, DialogConfig } from '@angular/cdk/dialog';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, NgZone, OnInit, Optional } from '@angular/core';
/**
 * This component replaces the standard CdkDialogContainer, which is used by the Dialog. Please see: https://github.com/angular/components/blob/main/src/cdk/dialog/dialog-container.ts to learn how to use it
 *
 *
 * https://stackoverflow.com/questions/73831569/creating-a-custom-dialog-container-using-cdkdialogcontainer
 *
 * @export
 * @class BaseContainerComponent
 * @extends {CdkDialogContainer}
 */
@Component({
  selector: 'app-whatever',
  templateUrl: './base-container.component.html',
  styleUrls: ['./base-container.component.scss']
})
export class BaseContainerComponent extends CdkDialogContainer {}
