import { ApplicationRef, Component, getPlatform, Injectable, Renderer2 } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
/**
 * This class creates an overlay container element that the modal can be
 * displayed inside of.
 * This overrides the framework OverlayContainer the (see modal.module.ts
 * providers array)
 * The default would attach the modals to the <body> element, which means some
 * app styles are not applied. This custom container is attached to <app-root>.
 *
 * Ideally we would create an angular component and append that to app-root so
 * we could add the styles from modal-global.scss in an encapsulated way.
 * However getting a reference to the app-root component ViewContainerRef
 * required private methods and would be at risk of breaking on framework
 * updates.
 *
 * For reference on how this works - see:
 * https://github.com/angular/components/blob/main/src/cdk/overlay/overlay-container.ts
 *
 * @export
 * @class CustomOverlayContainer
 * @extends {OverlayContainer}
 */
@Injectable()
export class CustomCdkOverlayContainer extends OverlayContainer {

  override _createContainer(): void {
    let container = document.createElement('div');
    // Class is cdk-overlay-container so the backdrop in modal-global.scss is attached to the correct place.
    container.classList.add('cdk-overlay-container');

    const appRoot = document.querySelector('app-root');

    if (!appRoot) {
      throw new Error('Could not attach overlay container to app-root')
    } else {
      appRoot.appendChild(container);
      this._containerElement = container;
    }
  }
}
