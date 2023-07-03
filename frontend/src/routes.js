const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signPath: () => [apiPath, 'signup'].join('/'),
  chat: () => '/',
  login: () => 'login',
  signup: () => 'signup',
  error: () => '*',
};
