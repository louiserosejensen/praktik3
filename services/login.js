const mysql = require('../config/mysql.js');

module.exports = {
    
    login_hash: (email) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`
                SELECT id_users, user_email, user_role_level, user_hashed_password
                FROM users
                wHERE user_email = ?`, [email], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        reject(err.message);
                    } else {
                        if (rows.length == 1) {
                            resolve(rows[0]);
                        } else {
                            reject('Email or password is incorrect');
                        } 
                    }
                });
        });
    }
};