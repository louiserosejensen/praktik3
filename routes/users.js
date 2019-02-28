const user_service = require('../services/users.js');
const bcrypt = require('bcryptjs');

const roller = [{
    "level": "1",
    "name": "User"
}, {
    "level": "10",
    "name": "Moderator"
}, {
    "niveau": "100",
    "name": "Administrator"
}];

module.exports = (app) => {

    app.get('/admin/users', (req, res) => {

console.log(bcrypt.hashSync('1234', 10));

        (async () => {
            try {
                let all_users = [];

                await user_service.hent_alle()
                    .then(result => {
                        all_users = result;
                    })
                
                res.render('', {
                    "title": "Users",
                    "all_users": all_users,
                    "formtype": "Sign up",
                    "bruger": {

                    }
                });
            } catch (error) {
                res.render ('login', {
                    "title": "login",
                    "page": "login",
                    "besked": "Email is already in use",
                    "email": req.fields.email
                });
            }
        });
    });

    app.post('/admin/users', (req, res) => {

        let password = req.body.user_password;
        if (password == undefined || password == '') {
            res.render('pages/user_admin', {
                "title": "Users",
                "all users": [],
                formtype: "Sign up",
                "users": {
                    "user_email": req.body.user_email,
                    "user_role_level": req.body.user_role_level
                },
                "roller": roller,
                "page": "user_admin",
                "session": req.session,
                "besked": "Password is missing!"
            });
        } else {
            let hashed_password = bcrypt.hashSync(password, 10);
            user_service.signup(req.body.user_email, hashed_password, req)
                .then(result => {
                    res.redirect('/admin/users');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    });

    app.get('/admin/users/edit/:user_id', (req, res) => {
        (async () => {
            try {
                let all_users = [];
                let one_user = {
                    "user_id": 0,
                    "user_email": "",
                    "user_role_level": ""
                }
            } catch (error) {
                res.render(
                )};
        })
    });
} 