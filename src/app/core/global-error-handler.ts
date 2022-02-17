import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private messageService: MessageService) {}

  handleError(error: Error) {
    // Check if it's an error from an HTTP response
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400:
        case 404:
          this.messageService.showGenericHttpError(error);
          break;

        case 402:
        case 403:
          this.messageService.showAuthError(error);
          break;

        case 500:
          this.messageService.showServerError(error);
          break;

        default:
          this.messageService.showGenericHttpError(error);
          break;
      }
      console.error(error.error);
      // If non-http error, just log to console (same as the standard Ng error handler)
    } else {
      console.error(error);
    }
  }
}
