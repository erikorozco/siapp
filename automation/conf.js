exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        //'tests/todo-spec.js'
        'tests/users/crud-users-spec.js'
    ],

    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        print: function() { /* Prevent the default spec dots from appearing in the output */ }
    },

    onPrepare: function() {
        const SpecReporter = require("jasmine-spec-reporter").SpecReporter;
        const HtmlReporter = require("protractor-beautiful-reporter");
        const Initializer = require("./siapp-intializer.js");

        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: `./reports/Tests Results`,
            screenshotsSubfolder: "images",
            jsonsSubfolder: "json",
            docName: "report.html",
            docTitle: "Bigcommerce app tests results",
            takeScreenShotsOnlyForFailedSpecs: true
        }).getJasmine2Reporter());

        //login to Siapp
        return Initializer.loginToSiapp();
    },

    // Browser capabilities.
    multiCapabilities: [

        //  {
        //    browserName: 'firefox',
        //    acceptInsecureCerts: true
        //  }

        // ,

        {
            browserName: "chrome",
            'chromeOptions': {
                //args: ["--test-type", "--ignore-certificate-errors"]
                args: ['--disable-web-security', '--user-data-dir=~/.e2e-chrome-profile']
            }
        }

    ],

};