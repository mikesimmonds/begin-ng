import { createHttpFactory, HttpMethod } from '@ngneat/spectator';
import { AuthRestService } from './auth-rest.service';

describe('AuthRestService', () => {
  let spectator: SpectatorHttp<AuthRestService>;
  const createHttp = createHttpFactory(AuthRestService);

  beforeEach(() => spectator = createHttp());

 it('can test HttpClient.get', () => {
    // spectator.service.getTodos().subscribe();
    // spectator.expectOne('api/todos', HttpMethod.GET);
  });
});