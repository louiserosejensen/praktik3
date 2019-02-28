const db = require('../config/mysql.js')();

module.exports = {
    hent_alle: () => {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT user_id, user_email, user_role_level
                FROM users`, [], (err, rows) => {
                if (err) {
                    console.log(err.message);
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    signup: (email, password, role_level) => {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO users SET user_email = ?, user_hashed_password = ?, user_role_level = ? ", [email, password, role_level])
                if (err) {
                    console.log(err.message);
                    reject(err.message);
                } else {
                    resolve(rows);
                }
        });
    }
}
