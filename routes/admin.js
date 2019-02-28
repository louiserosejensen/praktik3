const db = require('../config/mysql')();
const fs = require('fs');

module.exports = (app) => {
    app.get('/admin', (req, res, next) => {
        const sql = ``;
        db.query(sql, [req.params.id], (err, results) => {
            res.render('admin', { 'title': 'Admin'});
        });
    });     
};