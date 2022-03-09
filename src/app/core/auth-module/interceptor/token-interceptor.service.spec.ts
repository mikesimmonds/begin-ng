// import {HTTP_INTERCEPTORS} from '@angular/common/http';
// import {createHttpFactory, HTTPMethod, SpectatorHttp} from '@ngneat/spectator';
// import {environment} from '../../../../environments/environment';
// import { TokenInterceptorService } from './token-interceptor.service';
//
// describe('TokenInterceptorService', () => {
//   let spectator: SpectatorHttp<TokenInterceptorService>;
//
//   const createHttp = createHttpFactory({
//     service: TokenInterceptorService,
//     imports: [],
//     providers: [
//       {
//         provide: HTTP_INTERCEPTORS,
//         useClass: TokenInterceptorService,
//         multi: true,
//       }
//     ]
//   });
//
//
//
//   beforeEach(() => {
//     spectator = createHttp();
//   });
//
//   it('should create', () => {
//     expect(spectator.service).toBeTruthy();
//   });
//
//   /*
//   It:
//   should add headers to GET/POST etc requests
//   should attempt to refresh the token if 401
//   should logout user if 401 refresh fails with 403.
//
//   (new) should attempt token refresh on 403
//    */
//   describe('Adds Bearer token to all calls', () => {
//
//     const url = `${environment.api_url}/member/memberData`;
//     const mockResponse = {startDate: '13 Dec 2019', group: 'SharePeople', coverage: null, utilisation: '0.9'};
//
//     beforeEach(() => {
//       window.localStorage.clear();
//     });
//
//     it('should add http headers to GET Requests', () => {
//       spectator.httpClient.get(url).subscribe(
//         res => {
//           expect(res).toEqual(mockResponse);
//         }
//       );
//       const httpMock = spectator.controller.expectOne(url, HTTPMethod.GET);
//       expect(httpMock.request.headers.get('Authorization')).toContain('Bearer ');
//       console.log(httpMock.request.headers.get('Authorization'));
//       httpMock.flush(mockResponse); // Flush is a way to complete the request - lets give it a body to return.
//       spectator.controller.expectNone(url, HTTPMethod.GET);
//     });
//
//     it('should add http headers to POST Requests', () => {
//       spectator.httpClient.post(url, mockResponse).subscribe(
//         res => {
//           expect(res).toEqual(mockResponse);
//         }
//       );
//       const httpMock = spectator.controller.expectOne(url, HTTPMethod.POST);
//       expect(httpMock.request.headers.get('Authorization')).toContain('Bearer ');
//       httpMock.flush(mockResponse); // Flush is a way to complete the request - lets give it a body to return.
//       spectator.controller.expectNone(url, HTTPMethod.POST);
//     });
//
//     it('should add http headers to PUT Requests', () => {
//       spectator.httpClient.put(url, mockResponse).subscribe(
//         res => {
//           expect(res).toEqual(mockResponse);
//         }
//       );
//       const httpMock = spectator.controller.expectOne(url, HTTPMethod.PUT);
//       expect(httpMock.request.headers.get('Authorization')).toContain('Bearer ');
//       httpMock.flush(mockResponse); // Flush is a way to complete the request - lets give it a body to return.
//       spectator.controller.expectNone(url, HTTPMethod.PUT);
//     });
//   });
//
// });
