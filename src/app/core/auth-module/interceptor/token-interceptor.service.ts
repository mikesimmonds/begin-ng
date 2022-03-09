// import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// import {Injectable} from '@angular/core';
// import {EMPTY, Observable, throwError} from 'rxjs';
// import {catchError, switchMap} from 'rxjs/operators';
// import {AuthCredentialsResponse} from '../auth.model';
// import {AuthService} from '../auth.service';
//
// @Injectable()
// export class TokenInterceptorService  implements HttpInterceptor {
//
//   constructor(
//     private authService: AuthService
//   ) { }
//
//   addHeaders(req: HttpRequest<any>, token: string): HttpRequest<any> {
//     return req.clone({
//       url: `${req.url}`,
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//       }
//     });
//   }
//
//   handle401Error(
//     req: HttpRequest<any>,
//     next: HttpHandler,
//     error: HttpErrorResponse
//   ): Observable<HttpEvent<any>> {
//     return this.authService.refreshAccessToken()
//       .pipe(
//         switchMap((newCredentials: AuthCredentialsResponse) => {
//           const newAccessToken = newCredentials.access_token;
//           if (newAccessToken) {
//             this.storeAuthCredentials(newCredentials);
//             return next.handle(this.addHeaders(req, newAccessToken));
//           }
//         })
//       );
//   }
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (this.isRefreshUrl(req.url)) {
//         return next.handle(req);
//     } else {
//     return next.handle(this.addHeaders(req, this.getAccessToken()))
//       .pipe(
//         catchError(accessError => {
//           if (this.accessTokenIsInvalid(accessError)) {
//             return this.handle401Error(req, next, accessError)
//               .pipe(
//                 catchError(() => {
//                     this.forceLogout();
//                     return EMPTY;
//                   }
//                 )
//               );
//           } else {
//             return throwError(accessError);
//           }
//         })
//       );
//     }
//   }
//
//   isRefreshUrl(url: string): boolean {
//     return this.authService.isRefreshUrl(url);
//   }
//
//   accessTokenIsInvalid(error: HttpErrorResponse): boolean {
//     return error instanceof HttpErrorResponse && error.status === 401;
//   }
//
//   getAccessToken(): string {
//     return this.authService.getAccessToken() || undefined;
//   }
//
//   forceLogout(): void {
//     this.authService.logout();
//   }
//
//   private storeAuthCredentials(newCredentials: AuthCredentialsResponse) {
//     this.authService.setAuthCredentialsResponse(newCredentials);
//   }
// }
