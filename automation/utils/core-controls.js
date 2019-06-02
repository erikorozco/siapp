const EC = protractor.ExpectedConditions;

const successNotificationXpath = '//div[@aria-label="Operacion exitosa"]';
const errorNotificationXpath = '//div[@aria-label="Operacion invalida"]';
let CoreControl = {

    getElementByXpath: function(xpath) {
        browser.wait(EC.elementToBeClickable(element(by.xpath(xpath))), 5000);
        return element(by.xpath(xpath));
    },

    getElementById: function(id) {
        browser.wait(EC.elementToBeClickable(element(by.id(id))), 5000);
        return element(by.id(id));
    },

    getElementByButtonText: function(buttonText) {
        browser.wait(EC.elementToBeClickable(element(by.buttonText(buttonText))), 5000);
        return element(by.buttonText(buttonText));
    },

    waitForSuccessNotification: function()  {
        browser.wait(EC.elementToBeClickable(element(by.xpath(successNotificationXpath))), 5000);
    },

    waitForErrorNotification: function()  {
        browser.wait(EC.elementToBeClickable(element(by.xpath(errorNotificationXpath))), 5000);
    },

};
module.exports = CoreControl;