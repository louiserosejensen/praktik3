const db = require('../config/mysql')();
const fs = require('fs');

module.exports = (app) => {
    app.get('/profile/:id', (req, res, next) => {
        const sql = ``;
        db.query(sql, [req.params.id], (err, results) => {
            res.render('profile', { 'title': 'Profile'});
        });
    });     
};