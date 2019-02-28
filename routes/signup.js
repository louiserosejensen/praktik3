const fs = require('fs');
const db = require('../config/mysql')();

module.exports = (app) => {

    app.get('./signup', (req, res, next) => {
        res.render('signup', { 'title' : 'Sign Up'});
    });

    app.post('./signup', (req, res, next) => {
        let success = true;
        let errorMessage;

        if(req.fields){

            db.query(`SELECT users.user_email
            FROM users 
            WHERE users.user_email LIKE ?;`, [req.fields.uname], (err, checkResults) => {


                if(checkResults.length > 0){
                    success = false;
                    errorMessage = 'There is already a user with this email';
                }

            else if(!req.fields.name || !req.fields.email || !req.fields.password || !req.fields.confirmpassword){
                success = false;
                errorMessage = 'One or more fields are empty';
            }
    
            else if(req.fields.email.indexOf('@') < 1 || req.fields.email.indexOf('.') < 1){
                success = false;
                errorMessage = 'Email adress is not valid';
            }

            else if(req.fields.password !== req.fields.confirmpassword){
                success = false;
                errorMessage = 'Password and Confirm Password do not match';
            }

            if(success === true){
                db.query(`INSERT INTO users (name, email, password, user_role)
                VALUES (?, ?, ?, ?, 1);`, [req.fields.name,  req.fields.email, req.fields.passphrase] , (err, results) => {
                    res.redirect('/');
                });
            } else {
                res.render('signup', { ...req.fields, 'title': 'Sign up', errorMessage });
            }
        });
    }
    
});

}