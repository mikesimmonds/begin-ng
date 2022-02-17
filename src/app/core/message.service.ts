import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
/**
 * This service is provided to display messages to the user, usually via Toastr or something similar.
 * It helps keep the Toastr/Snackbar/etc decoupled from the application and keeps the
 * message strings in a sinlge place for better reuse and management.
 * NB - please prefer this service to adding message strings in the app itself or using the Toastr Service directly.
 * @export
 * @class MessageService
 */
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(@Inject(Injector) private injector: Injector) {}

  getToastr() {
    return this.injector.get(ToastrService);
  }

  showGenericHttpError(error: HttpErrorResponse) {
    this.getToastr().error('A communication error has occurred, please retry.');
  }

  showServerError(error: HttpErrorResponse) {
    this.getToastr().error(
      'An error occured on the server, please retry and if the probelm persists refresh the page.'
    );
  }
  showAuthError(error: HttpErrorResponse) {
    this.getToastr().error(
      'An authentication issue has occurred, please retry and if the probelm persists refresh the page.'
    );
  }
}
