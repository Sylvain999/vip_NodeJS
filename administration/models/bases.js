let db = require('../configDb');

module.exports.nationalite = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = 
            "SELECT nationalite_numero as id, nationalite_nom as nom \
            FROM nationalite \
            ORDER BY 2";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.getVips = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = 
            "SELECT vip_numero as id, CONCAT(vip_nom,' ',vip_prenom) as nom \
            FROM vip \
            ORDER BY 2";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.insertImage = function(image, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "INSERT INTO photo SET \
            photo_numero = " + image.photo_numero + ", \
            vip_numero = " + image.vip_numero + ", \
            photo_sujet = " + connexion.escape(image.photo_sujet) + ", \
            photo_commentaire = " + connexion.escape(image.photo_commentaire) + ", \
            photo_adresse = " + connexion.escape(image.photo_adresse)

            connexion.query(sql, image, callback);
            connexion.release();
        }
    });
};