#Auth Module

This Auth Module contains all the necessary components and services to 'pre roll' an authentification flow.

This module should always be directly imported into the AppModule's imports array. This is a critical part of any application and does not need to be lazy-loaded.

##Dependencies:
Shared-forms module that contains input-wrappers. If you do not want to use the shared-forms module then you can just customise the HTML with your own form elements.

environment variables
This assumes you have all of the authentication urls in the environments.ts file
For example:
````
const BASE_URL = 'http://localhost:8080';
export const environment = {
  production: false,
  baseUrl: BASE_URL,
  apiUrl: BASE_URL + '/api/v1',

  // Authentication TODO: copy these as example to Auth module readme
  loginUrl: BASE_URL + '/login',
  refreshTokenUrl: BASE_URL + '/oauth/access_token',
  registrationUrl: BASE_URL + '/registration',
  resetPasswordUrl: BASE_URL + '/resetPassword',
};
````
