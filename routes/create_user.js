const db = require('../config/mysql')();
const fs = require('fs');

module.exports = (app) => {
    app.get('/admin/create_user', (req, res, next) => {
        res.render('create_user');
    });

    app.post('/admin/create_user', (req, res, next) => {
        console.log(req.fields);
        // res.send();
        db.query(`INSERT INTO users (user_email, user_role_level) 
        VALUES (?, ?);`, [req.fields.user_email, req.fields.user_role_level], (err, results) => {
                if (err) { res.send(err); return; }

                res.redirect('/admin');
            });
    });

    app.get('/admin/create_user/edit/:id', (req, res, next) => {
        const sql =
            `
        SELECT users.user_id, users.user_email, users.user_role_level
        FROM users
        WHERE users.user_id = ?;
        `;

        db.query(sql, [req.params.id], (err, results) => {
            res.render('create_user', { 'mainResults': results });
        });
    });

    app.post('/admin/create_user/edit/:id', (req, res, next) => {
        if(!req.fields.user_email){
            db.query(`UPDATE users
            SET users.user_email = ?, users.users_role_level = ?
            WHERE users.user_id = ?;`, [req.fields.user_email, req.fields.user_role_level, req.params.id], (err, results) => {
                if (err) res.send(err);
                res.redirect('/admin');
            });
        } else {
            
            db.query(`UPDATE users
            SET users.user_name = ?, users.user_role_level = ?
            WHERE users.user_id = ?;`, [req.fields.user_email, req.fields.user_role_level, req.params.pages_id], (err, results) => {
                if (err) res.send(err);
                res.redirect('/admin');
            });
        };

    });

    // DELETE ---------------------------------------------------

    //Delete check
    app.get('/admin/create_user/delete-tjek/:id', (req, res, next) => {
        const sql =
            `   
        SELECT users.user_id, users.user_email, users.user_role_level
        FROM users
        WHERE users.user_id = ?;
        `;

        db.query(sql, [req.params.id], (err, results) => {
            res.render('delete_user', { 'mainResults': results });
        });
    });

    //Delete IT
    app.get('/admin/create_user/delete/:id', (req, res, next) => {
        const sql =
            `
        DELETE FROM users WHERE users.user_id = ?;
        `;

        db.query(sql, [req.params.id], (err, results) => {
            res.redirect('/admin');
        });
    });

}