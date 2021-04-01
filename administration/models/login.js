let db = require('../configDb');


module.exports.logins = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = 
            "SELECT login, passwd \
            FROM parametres";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

