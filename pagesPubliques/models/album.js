let db = require('../configDb');

module.exports.getDetailsPhoto = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT CONCAT(vip_prenom,' ',vip_nom) AS nom,\
            photo_adresse, photo_commentaire \
            FROM vip v INNER JOIN photo p ON v.vip_numero = p.vip_numero \
            WHERE v.vip_numero = " + vip_num

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.getDetailsPhotoByDefault = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT T1.vip_numero, nom, photo_adresse, photo_commentaire \
            FROM (SELECT vip_numero, CONCAT(vip_prenom,' ',vip_nom) AS nom \
                FROM vip \
                ORDER BY vip_nom, vip_prenom \
                LIMIT 1 \
            ) T1, photo p \
            WHERE p.vip_numero = T1.vip_numero \
            ORDER BY 1"

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getPhotos = function(num_page, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = 'SELECT p.vip_numero, photo_adresse \
            FROM photo p INNER JOIN vip v ON v.vip_numero = p.vip_numero \
            WHERE photo_numero = 1 \
            ORDER BY vip_nom, vip_prenom \
            LIMIT 12 OFFSET ' + (num_page - 1) * 12 ;

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.getNbPhotosVip = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = 'SELECT COUNT(*) AS nb_vips FROM (SELECT vip_numero AS nb_vips '
            sql += 'FROM photo p '
            sql += 'GROUP BY vip_numero) T'

           

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};