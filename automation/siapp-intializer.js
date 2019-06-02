const SiappConfig = require("./siapp-conf.js");
const EC = protractor.ExpectedConditions;

const Initializer = {

    loginToSiapp: function() {
        console.log("Logging in...");
        browser.get(SiappConfig.webUrl).then(() => {
            if (SiappConfig.requiresLogin) {
                element(by.id('username')).sendKeys(SiappConfig.username);
                element(by.id('password')).sendKeys(SiappConfig.passoword);

                element(by.buttonText('Entrar')).click();
                browser.wait(EC.urlIs('http://localhost:4200/home'), 50000);
            }
        });
    }

}

module.exports = Initializer;