const EC = protractor.ExpectedConditions;
const CoreControl = require('../../utils/core-controls.js');

const UserListPage = {

    clickAddButton: function() {
        CoreControl.getElementByXpath('//a/span[contains(text(), "Agregar Terapeuta")]').click();
        browser.wait(EC.urlIs('http://localhost:4200/home/add-user'), 5000);
    },

    searchUser: function(searchCriteria) {
        CoreControl.getElementById("search-input").sendKeys(searchCriteria);
    },

    clickEditButton: function() {
        CoreControl.getElementByXpath('//table//tbody//tr[1]//button[@ng-reflect-mdb-tooltip="Editar"]').click();
    },

    clickViewButton: function() {
        CoreControl.getElementByXpath('//table//tbody//tr[1]//button[@ng-reflect-mdb-tooltip="Ver detalles"]').click();
    },

    clickDeactivateButton: function() {
        CoreControl.getElementByXpath('//table//tbody//tr[1]//button[@ng-reflect-mdb-tooltip="Desactivar"]').click();
    },

}
module.exports = UserListPage;