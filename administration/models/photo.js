let db = require('../configDb');

module.exports.getIndexLastPhoto = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = 
            "SELECT photo_numero \
            FROM photo \
            WHERE vip_numero = ?\
            ORDER BY 1 DESC\
            LIMIT 1";

            console.log(vip_num);

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};

module.exports.getPhotosVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = 
            "SELECT photo_numero, photo_adresse, photo_sujet \
            FROM photo \
            WHERE vip_numero = ? \
            ORDER BY 1";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};



module.exports.deletePhoto = function(vip_num, photo_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = 
            "DELETE FROM photo WHERE vip_numero = " + vip_num + " AND photo_numero = " + photo_num;

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


