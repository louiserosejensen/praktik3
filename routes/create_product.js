const db = require('../config/mysql')();
const fs = require('fs');

module.exports = (app) => {
    app.get('/admin/create_product', (req, res, next) => {
        res.render('create_product');
    });

    app.post('/admin/create_product', (req, res, next) => {
        // console.log(req.files);
        // res.send();
        // return;

        if (!req.files || !req.files.product_image) {
            return next(new Error('Der var ingen fil med formularen.'));
        }

        fs.readFile(req.files.product_image.path, (err, data) => {

            if (err) {
                console.log (err);
                return next(new Error('Den midlertidige fil kunne ikke læses.'));
            }

            
            let time = Date.now();
            // 327623746364_strawberry.jpg
            let newFilname = time + '_' + req.files.product_image.name; 

            fs.writeFile(`./public/img/${newFilname}`, data, (err) => {

                if (err) {
                    console.log(err);
                    return next(new Error('Filen kunne ikke gemmes.'));
                }


                db.query(`INSERT INTO products (product_name, product_price, product_description, product_image) 
        VALUES (?, ?, ?, ?);`,
        [req.fields.product_name, req.fields.product_price, req.fields.product_description, newFilname], (err, results) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        } else {
                            res.redirect('/admin');
                        }
                    });
            });
        });
    });

    app.get('/admin/create_product/edit/:id', (req, res, next) => {
        const sql =
            `
        SELECT products.id_product, products.product_name, products.product_price, products.products_description
        FROM products
        WHERE products.id_product = ?;
        `;

        db.query(sql, [req.params.id], (err, results) => {
            res.render('create_product', { 'mainResults': results });
        });
    });

    app.post('/admin/create_product/edit/:id', (req, res, next) => {
        if (!req.files.product_image.name) {
            db.query(`UPDATE products 
            SET products.product_name = ?, products.product_description = ?
            WHERE products.id_product = ?;`, [req.fields.product_name, req.fields.product_description, req.params.id_product], (err, results) => {
                    if (err) res.send(err);
                    res.redirect('/admin');
                });
        } else {

            if (!req.files || !req.files.product_image) {
                return next(new Error('Der var ingen fil med formularen.'));
            }

            fs.readFile(req.files.product_image.path, (err, data) => {

                if (err) {
                    return next(new Error('Den midlertidige fil kunne ikke læses.'));
                }

                fs.writeFile(`./public/img/${req.files.product_image.name}`, data, (err) => {

                    if (err) {
                        return next(new Error('Filen kunne ikke gemmes.'));
                    }

                    db.query(`UPDATE products 
            SET products.product_name = ?, products.product_description = ?, products.product_image = ?
            WHERE products.id_product = ?;`, [req.fields.product_name, req.fields.product_description, req.files.product_image.name, req.params.id_product], (err, results) => {
                            if (err) res.send(err);
                            res.redirect('/admin');
                        });
                });
            });
        }

    });

    // DELETE ---------------------------------------------------

    //Delete check
    app.get('/admin/create_product/delete-tjek/:id', (req, res, next) => {
        const sql =
            `   
        SELECT products.id_product, products.product_name, products.product_image
        FROM products
        WHERE products.id_product = ?;
        `;

        db.query(sql, [req.params.id_product], (err, results) => {
            res.render('delete_products', { 'mainResults': results });
        });
    });

    //Delete IT
    app.get('/admin/create_product/delete/:id', (req, res, next) => {
        const sql =
            `
        DELETE FROM products WHERE products.id_product = ?;
        `;

        db.query(sql, [req.params.id_product], (err, results) => {
            res.redirect('/admin');
        });
    });

} // Afslutter: module.exports