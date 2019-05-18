export const API_URL_CONFIG = {
    baseURL: 'http://localhost:8080/api/',
    usersAPI: {
      name: 'users/',
      endpoints: {
        getAll : 'getAllUsers',
        getUser : 'getUser/',
        createUser : 'createUser',
        updateUser : 'updateUser/',
        filterUsers: 'filterUsers/',
        findUserByName:  'findUserByName/'
      }
    }
};

export const TOKEN_CONFIG = {
    accessTokenKey: 'access_token',
    oauthKey: 'oauth/token'
};

