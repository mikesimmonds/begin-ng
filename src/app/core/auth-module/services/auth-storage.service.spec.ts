import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { AuthStorageService } from './auth-storage.service';

describe('AuthStorageService', () => {
  let spectator: SpectatorService<AuthStorageService>;
  const createService = createServiceFactory(AuthStorageService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});