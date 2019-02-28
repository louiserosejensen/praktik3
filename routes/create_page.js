const db = require('../config/mysql')();
const fs = require('fs');

module.exports = (app) => {
    app.get('/admin/create_page', (req, res, next) => {
        res.render('create_page');
    });

    app.post('/admin/create_page', (req, res, next) => {
        console.log(req.fields);
        // res.send();
        db.query(`INSERT INTO pages (pages_name, pages_description) 
        VALUES (?, ?);`, [req.fields.pages_name, req.fields.pages_description], (err, results) => {
                if (err) { res.send(err); return; }

                res.redirect('/admin');
            });
    });

    app.get('/admin/create_page/edit/:id', (req, res, next) => {
        const sql = 
        `
        SELECT pages.id_pages, pages.pages_name, pages.pages_description
        FROM pages
        WHERE pages.id_pages = ?;
        `;

        db.query(sql, [req.params.id], (err, results) => {
            res.render('create_page', {'mainResults': results[0]});
        });
    });
    
    app.post('/admin/create_page/edit/:id', (req, res, next) => {
        if(!req.fields.pages_name){
            db.query(`UPDATE pages 
            SET pages.pages_name = ?, pages.pages_description = ?
            WHERE pages.id_pages = ?;`, [req.fields.name, req.fields.description, req.params.id], (err, results) => {
                if (err) res.send(err);
                res.redirect('/admin');
            });
        } else {
            
            db.query(`UPDATE pages
            SET pages.pages_name = ?, pages.pages_description = ?
            WHERE pages.id_pages = ?;`, [req.fields.pages_name, req.fields.pages_description, req.params.pages_id], (err, results) => {
                if (err) res.send(err);
                res.redirect('/admin');
            });
        };

    });

    // DELETE ---------------------------------------------------

    //Delete check
    app.get('/admin/create_page/delete-tjek/:id', (req, res, next) => {
        const sql = 
        `   
        SELECT pages.id_pages, pages.pages_name, pages.pages_image
        FROM pages
        WHERE pages.id_pages = ?;
        `;

        db.query(sql, [req.params.pages_id], (err, results) => {
            res.render('delete_pages', {'mainResults': results});
        });
    });

    //Delete IT
    app.get('/admin/create_page/delete/:id', (req, res, next) => {
        const sql = 
        `
        DELETE FROM pages WHERE pages.id_pages = ?;
        `;

        db.query(sql, [req.params.pages_id], (err, results) => {
            res.redirect('/admin');
        });
    });

}