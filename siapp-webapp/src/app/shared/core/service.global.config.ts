export const API_URL_CONFIG = {
    baseURL: 'http://localhost:8080/api/',
    usersAPI: {
      name: 'users/',
      endpoints: {
        getAll : 'getAllUsers'
      }
    }
};

export const TOKEN_CONFIG = {
    tokenKey: 'token',
    accessTokenKey: 'access_token',
    oauthKey: 'oauth/token'
};

