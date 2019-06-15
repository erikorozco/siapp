import { assign } from 'lodash';
export const API_URL_CONFIG = {
    baseURL: 'http://localhost:8080/api/',
    usersAPI: {
      name: 'users/',
      endpoints: {
        getAll : 'getAllUsers',
        getUser : 'getUser/',
        createUser : 'createUser',
        updateUser : 'updateUser/',
        updateUserStatus : 'updateUserStatus/',
        filterUsers: 'filterUsers/',
        findUserByName:  'findUserByName/'
      }
    },
    therapistsAPI: {
      name: 'therapists/',
      endpoints: {
        getAll : 'getAllTherapists',
        getTherapist : 'getTherapist/'
      }
    },
    recordsAPI: {
      name: 'records/',
      endpoints: {
        assignRecord : 'assignRecord',
        getAll : 'getAll',
        findRecordById : 'findRecordById/',
        findRecordsByTherapistId : 'findRecordsByTherapistId/',
        createRecord : 'createRecord',
        updateRecord : 'updateRecord/',
        removeRecordPermission: 'removeRecordPermission'
      }
    },
    personsAPI: {
      name: 'persons/',
      endpoints: {
        getAll : 'getAllPersons',
        getPerson : 'getPerson/',
        createPerson: 'createPerson',
        updatePerson : 'updatePerson/',
      }
    },
    privacyAgreementAPI: {
      name: 'privacyAgreement/',
      endpoints: {
        getPrivacyAgreement : 'get/',
        createPrivacyAgreement : 'create',
      }
    },
};

export const TOKEN_CONFIG = {
    accessTokenKey: 'access_token',
    oauthKey: 'oauth/token'
};

