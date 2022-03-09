export interface AuthCredentialsResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  roles: string[];
  token_type: string;
  username: string;
}

export interface AuthCredentials extends AuthCredentialsResponse {
  expires_at: number;
}

export interface LoginDetails {
  username: string;
  password: string;
}
