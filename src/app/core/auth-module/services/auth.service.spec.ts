import {HttpClientTestingModule} from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import {AuthService} from './auth.service';

/*
Don't forget to user ng-mocks for mocking!
 */

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory({
    service: AuthService,
    imports: [
      HttpClientTestingModule
    ],
    providers: [
//      mockProvider(ServiceMock, {
//        someMethod: () => ({key: value})
//      }),
    ]
  });

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
