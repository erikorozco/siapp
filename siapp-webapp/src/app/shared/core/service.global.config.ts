
export let host = () => {
  return `${window.location.protocol}//${window.location.hostname}:8080/api/`;
};

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
        findUserByName:  'findUserByName/',
        tokenDetails: 'tokenDetails'
      }
    },
    therapistsAPI: {
      name: 'therapists/',
      endpoints: {
        getAll : 'getAllTherapists',
        getTherapist : 'getTherapist/',
        getAssignedRecordsId: 'getAssignedRecordsId/',
        isAllowedToRecord: 'isAllowedToRecord/'
      }
    },
    recordsAPI: {
      name: 'records/',
      endpoints: {
        assignRecord : 'assignRecord',
        getAll : 'getAll',
        filter : 'filter',
        findRecordById : 'findRecordById/',
        findRecordsByTherapistId : 'findRecordsByTherapistId/',
        findRecordByPersonId : 'findRecordByPersonId/',
        createRecord : 'createRecord',
        updateRecord : 'updateRecord/',
        removeRecordPermission: 'removeRecordPermission',
        uploadGenogram: 'uploadGenogram'
      }
    },
    personsAPI: {
      name: 'persons/',
      endpoints: {
        getAll : 'getAllPersons',
        filter : 'filter',
        getPerson : 'getPerson/',
        createPerson: 'createPerson',
        updatePerson : 'updatePerson/',
        deletePerson : 'deletePerson/',
      }
    },
    privacyAgreementAPI: {
      name: 'privacyAgreement/',
      endpoints: {
        getPrivacyAgreement : 'get/',
        createPrivacyAgreement : 'create',
      }
    },
    personAttachmentsAPI: {
      name: 'personAttachments/',
      endpoints: {
        getFile : (personId, fileName) => `getFile/${personId}/${fileName}`,
        getImagesByPersonId : 'getImagesByPersonId/',
        uploadFile: 'uploadFile'
      }
    },
    sessionsAPI: {
      name: 'sessions/',
      endpoints: {
        getSessionsByRecordId : 'getSessionsByRecordId/',
        getSession : 'getSession/',
        createSession: 'createSession',
        updateSession : 'updateSession/',
      }
    },
    rolesAPI: {
      name: 'roles/',
      endpoints: {
        getAll : 'getAllRoles/',
      }
    },
    derivationAPI: {
      name: 'derivations/',
      endpoints: {
        getDerivation: 'getDerivation/',
        getDerivationByRecordId : 'getDerivationByRecordId/',
        updateDerivation: 'update/',
        createDerivation: 'create',
        createDerivations: 'createDerivations'
      }
    },
    permissionAPI: {
      name: 'permissions/',
      endpoints: {
        isAllowedToRecord: 'isAllowedTo',
        getAllPermissions: 'getAllPermissions'
      }
    },
    medicalReleaseAPI: {
      name: 'medicalReleases/',
      endpoints: {
        getByMedicalReleaseByDerivationId: 'getByMedicalReleaseByDerivationId/',
        getMedicalRealease: 'getMedicalRealease/',
        update: 'update/',
        create: 'create',
      }
    },
    dropAPI: {
      name: 'drops/',
      endpoints: {
        getByDropByDerivationId: 'getByDropByDerivationId/',
        getDrop: 'getDrop/',
        update: 'update/',
        create: 'create',
      }
    },
    surveyAPI: {
      name: 'surveys/',
      endpoints: {
        getBySurveyByDerivationId: 'getBySurveyByDerivationId/',
        getSurvey: 'getSurvey/',
        update: 'update/',
        create: 'create',
      }
    },
    nutritionSessionAPI: {
      name: 'nutritionSessions/',
      endpoints: {
        getByRecordId: 'getByRecordId/',
        get: 'get/',
        update: 'update/',
        create: 'create',
      }
    },
    crisisInterventionsAPI: {
      name: 'crisisInterventions/',
      endpoints: {
        getByPersonId: 'getByPersonId/',
        get: 'get/',
        update: 'update/',
        create: 'create',
        delete: 'delete/',
      }
    },
    psycometricsManagementAPI: {
      name: 'psycometricsManagement/',
      endpoints: {
        getAll: 'getAll',
        getAllActive: 'getAllActive',
        get: 'get/',
        update: 'update/',
        create: 'create',
        delete: 'delete/',
        updateStatus: 'updateStatus/'
      }
    },
    psycometricsApplicationAPI: {
      name: 'psycometricsApplication/',
      endpoints: {
        getByPersonId: 'getByPersonId/',
        get: 'get/',
        update: 'update/',
        create: 'create',
        delete: 'delete/',
      }
    },
    satisfactionSurveyAPI: {
      name: 'satisfactionSurveys/',
      endpoints: {
        getBySurveyByDerivationId: 'getByDerivationId/',
        get: 'get/',
        update: 'update/',
        create: 'create',
      }
    },
};

export const TOKEN_CONFIG = {
    accessTokenKey: 'access_token',
    oauthKey: 'oauth/token'
};

