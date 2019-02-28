const fs = require('fs');
const path = require('path');

module.exports = function (app) {

    fs.readdirSync(__dirname, { withFileTypes: true }).forEach(file => {
        if (file.name !== path.basename(__filename)) {
            let fileToRequire = path.join(__dirname, file.name);
            // console.log ("File to require: " + fileToRequire);
            try {
                require(fileToRequire)(app);
            }
            catch {
                console.log (`Advarsel: Filen er muligvis tom (${fileToRequire})`);
            }
        }
    });


    // fs.readdirSync(__dirname, { withFileTypes: true }).forEach(file => {
    //     if (file.name !== path.basename(__filename)) {
    //         let fileToRequire = path.join(__dirname, file.name);
    //         console.log ("File to require: " + fileToRequire);
    //         require(fileToRequire)(app);
    //         // require(path.join(__dirname, file.name))(app);
    //     }
    // });
};