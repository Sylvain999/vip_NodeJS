let db = require('../configDb');

module.exports.insertTableVip = function(vip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "INSERT INTO vip SET \
            vip_nom = " + connexion.escape(vip.vip_nom) + ", \
            vip_prenom = " + connexion.escape(vip.vip_prenom) + ", \
            vip_sexe = " + connexion.escape(vip.vip_sexe) + ", \
            vip_naissance = '" + vip.vip_naissance + "', \
            nationalite_numero = " + vip.nationalite_numero + ", \
            vip_texte = " + connexion.escape(vip.vip_texte) + ", \
            vip_date_insertion = NOW()"

            console.log(sql)

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVipDetails = function(vip_num, callback){
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT nationalite_numero, vip_nom, vip_prenom, vip_sexe, vip_naissance, vip_texte,\
                photo_sujet, photo_commentaire, photo_adresse\
                FROM vip v LEFT OUTER JOIN photo p ON p.vip_numero = v.vip_numero\
                WHERE v.vip_numero = ? AND (photo_numero = 1 || photo_numero = NULL)";

            connexion.query(sql, vip_num, callback);
            connexion.release();
        }
    });
}


module.exports.updateTableVip = function(vip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "UPDATE vip SET \
            vip_nom = " + connexion.escape(vip.vip_nom) + ", \
            vip_prenom = " + connexion.escape(vip.vip_prenom) + ", \
            vip_sexe = " + connexion.escape(vip.vip_sexe) + ", \
            vip_naissance = '" + vip.vip_naissance + "', \
            nationalite_numero = " + vip.nationalite_numero + ", \
            vip_texte = " + connexion.escape(vip.vip_texte) + "\
            WHERE vip_numero = " + vip.vip_numero

            console.log(sql)

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.updateTablePhotoPrincipale = function(photo, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "UPDATE photo SET \
            photo_sujet = " + connexion.escape(photo.photo_sujet) + ", \
            photo_commentaire = " + connexion.escape(photo.photo_commentaire) + " \
            WHERE photo_numero = 1 AND vip_numero = " + photo.vip_numero

            console.log(sql)

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.deletePhotosVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM photo WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};

module.exports.deleteAPourSujetVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM apoursujet WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};

module.exports.deleteLiaisonVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM liaison WHERE vip_numero = " + vip_num + " OR vip_vip_numero = " + vip_num;

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.deleteMariageVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM mariage WHERE vip_numero = " + vip_num + " OR vip_vip_numero = " + vip_num;

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.deleteJoueVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM joue WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};


module.exports.deleteActeurVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM acteur WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};


module.exports.deleteFilmVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM film WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};


module.exports.deleteRealisateurVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM realisateur WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};


module.exports.deleteComposerVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM composer WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};

module.exports.deleteChanteurVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM chanteur WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};

module.exports.deleteDefileDansVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM defiledans WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};

module.exports.deleteAPourAgenceVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM apouragence WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};

module.exports.deleteMannequinVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM mannequin WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};


module.exports.deleteDefileVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM defile WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};

module.exports.deleteCouturierVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM couturier WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};

module.exports.deleteVip = function(vip_num, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "DELETE FROM vip WHERE vip_numero = ?";

            connexion.query(sql, [vip_num], callback);
            connexion.release();
        }
    });
};


