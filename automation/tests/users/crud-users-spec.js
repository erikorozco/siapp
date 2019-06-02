const SiappConfig = require("../../siapp-conf.js");
const UserListPage = require("../../page-objects/users/user-list.js");
const UserFormPage = require("../../page-objects/users/user-form.js");
const CoreControls = require("../../utils/core-controls.js");
const RandomData = require("../../utils/random-data");
const EC = protractor.ExpectedConditions;
const apiResource = require("protractor-api-resource").ProtractorApiResource;

describe("TEST USERS CRUD MODULE", function() {
    username = RandomData.generateRandomString(10);
    beforeAll(function() {
        browser.get('http://localhost:4200/home/users');
    });

    describe("ADD USER", function() {

        it("Url should be add-user", function(done) {
            UserListPage.clickAddButton();
            expect(browser.getCurrentUrl()).toBe(SiappConfig.hostUrl + "home/add-user");
            done();
        });

        it("Can save new user", function(done) {
            UserFormPage.fillNewUserInformation(username);
            UserFormPage.clickSaveButton();
            CoreControls.waitForSuccessNotification();
            done();
        });

        it("Cannot save user with same username", function(done) {
            browser.get(SiappConfig.hostUrl + "home/add-user");
            UserFormPage.fillNewUserInformation(username);
            UserFormPage.clickSaveButton();
            CoreControls.waitForErrorNotification();
            done();
        });
    });

    describe("EDIT USER", function() {
        it("Can search user", function(done) {
            browser.get(SiappConfig.hostUrl + 'home/users');
            UserListPage.searchUser(username);
            done();
        });

        it("Can edit user", function(done) {
            UserListPage.clickEditButton();
            UserFormPage.fillEditUserInformation(username);
            UserFormPage.clickSaveButton();
            CoreControls.waitForSuccessNotification();
            done();
        });
    });

    describe("Verify edited information", function() {

        beforeAll(function() {
            browser.get(SiappConfig.hostUrl + 'home/users');
            UserListPage.searchUser(username);
            UserListPage.clickEditButton();
        });

        UserFormPage.verifyEditedInformation(username);
    });

    describe("EDIT USER", function() {

        beforeAll(function() {
            browser.get(SiappConfig.hostUrl + 'home/users');
            UserListPage.searchUser(username);
        });

        it("Can deactivate user", function(done) {
            UserListPage.clickDeactivateButton();
            CoreControls.waitForSuccessNotification();
            expect(browser.getCurrentUrl()).toContain("home/view-user");
            done();
        });
    });


});