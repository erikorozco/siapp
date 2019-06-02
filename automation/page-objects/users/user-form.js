const EC = protractor.ExpectedConditions;
const CoreControl = require('../../utils/core-controls.js');

//SELECTORS
const userFormSelectors = [{
        selector: "name",
        type: "id",
        data: "testName",
        editedData: "editedData"
    },
    {
        selector: "last_name",
        type: "id",
        data: "testName",
        editedData: "editedData"
    },
    {
        selector: "second_last_name",
        type: "id",
        data: "testName",
        editedData: "editedData"
    },
    {
        selector: "phone",
        type: "id",
        data: "1234567890",
        editedData: "09876543"
    },
    {
        selector: "speciality",
        type: "id",
        data: "testName",
        editedData: "editedData"
    },
    {
        selector: "username",
        type: "id",
        data: '',
        editedData: "editedData"
    },
    {
        selector: "password",
        type: "id",
        data: "testName1",
        editedData: "editedData",
        skipCheck: true
    }
];

const UserFormPage = {

    clickSaveButton: function() {
        CoreControl.getElementByButtonText("Guardar").click();
    },

    getUserStatus: function() {
        return CoreControl.getElementByXpath('//h3[@class="text-success"]').count();
    },

    fillNewUserInformation: function(username) {
        userFormSelectors.forEach(d => {
            if (d.selector !== 'username' && d.selector !== 'name') {
                CoreControl.getElementById(d.selector).sendKeys(d.data);
            } else {
                CoreControl.getElementById(d.selector).sendKeys(username);
            }

        });
    },

    fillEditUserInformation: function(username) {
        userFormSelectors.forEach(d => {
            if (d.selector !== 'username' && d.selector !== 'name') {
                CoreControl.getElementById(d.selector).clear().sendKeys(d.editedData);
            } else {
                CoreControl.getElementById(d.selector).clear().sendKeys(username);
            }

        });
    },

    verifyEditedInformation: function(username) {
        userFormSelectors.forEach(d => {
            if (!d.skipCheck) {
                if (d.selector !== 'username' && d.selector !== 'name') {
                    it(`${d.selector} OK`, function(done) {
                        expect(CoreControl.getElementById(d.selector).getAttribute('value')).toEqual(d.editedData);
                        done();
                    });
                } else {
                    it(`${d.selector} OK`, function(done) {
                        expect(CoreControl.getElementById(d.selector).getAttribute('value')).toEqual(username);
                        done();
                    });
                }
            }
        });
    },

}
module.exports = UserFormPage;