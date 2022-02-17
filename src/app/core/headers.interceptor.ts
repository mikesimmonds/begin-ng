import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // 'Cache-Control': 'no-cache',
      // Pragma: 'no-cache',
    };
    const headed = req.clone({ setHeaders: headers });
    return next.handle(headed);
  }
}
