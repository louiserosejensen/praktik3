const login = require ('../services/login.js');
const bcrypt = require('bcryptjs');
const db = require('../config/mysql')();


module.exports = (app) => {

    app.get('/login', (req, res) => {
        res.render('login', {
            "title": "Login",
            "page": "login"
        });
    });

    app.post('/login', (req, res) => {
        // login.login_hash(req.fields.email)
        //     .then(result => {
        //         console.log('user not found, please check password');
        //         if (bcrypt.compareSync(req.fields.password, result.user_hashed_password)) {
        //             req.session.id_users = result.id_users;
        //             // res.direct('/');
        //         } else {
        //             console.log("else 1")
        //             //  res.render('login', {
        //             //      "title": "Login",
        //             //      "page": "login",
        //             //     "besked": "Wrong email or password",
        //             //     "email": req.fields.email
        //             // });
        //         }
        //     })
        //     .catch(error => {
        //         console.log("There are no users with this email");
        //         // res.render('login', {
        //         //     "title": "Login",
        //         //     "page": "login",
        //         //     "besked": "Wrong username or password",
        //         //     "email": req.fields.email
        //         // });
        //     });
    
            
        db.query("SELECT * FROM praktik3.users WHERE user_email = ? AND user_password = ?",
        [req.fields.email, req.fields.password], (err, result) => {
            if (err) {
                console.log("if error: " + err)
                return res.send(err);
            }
            else {

                
                if (result.length  === 1){
                    req.session.user = result[0].id;
                    console.log("query if")
                    res.redirect('/admin');
                } else {
                    let errorMessage = 'The password is incorrect';
                    console.log("query else")
                    res.render('login', {'title': 'Log in', 'errorMessage': errorMessage });
                    
                    
                }
            }

        });
        
        //res.send()
    });



    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });
}

//To do: Hashing