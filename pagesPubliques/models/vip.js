let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getLettres = (callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            let sql = "SELECT DISTINCT UPPER(SUBSTRING(vip_nom, 1, 1)) AS vip_lettre FROM vip ORDER BY 1;";

            connexion.query(sql, callback)
            connexion.release()
        }
    });
}

module.exports.getAdrPhotos = (lettre, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = "SELECT p.vip_numero, CONCAT(vip_prenom,' ',vip_nom) AS nom, photo_adresse AS adresse "
            sql += "FROM PHOTO p INNER JOIN VIP v ON p.vip_numero = v.vip_numero "
            sql += "WHERE photo_numero = 1 AND vip_nom LIKE'" + lettre + "%'"

            connexion.query(sql, callback)

            connexion.release()
        }
    });
}


module.exports.getDetailsVip = (num, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = "SELECT v.vip_numero, CONCAT(vip_prenom,' ',vip_nom) AS nom, "
            sql += "photo_adresse AS adresse_photo_1, "
            sql += "vip_naissance AS date_naissance, "
            sql += "nationalite_nom AS nationalite, "
            sql += "vip_sexe AS sexe, "
            sql += "vip_texte AS description "
            sql += "FROM VIP v INNER JOIN PHOTO p ON v.vip_numero = p.vip_numero "
            sql += "INNER JOIN NATIONALITE n ON v.nationalite_numero = n.nationalite_numero "
            sql += "WHERE photo_numero = 1 AND p.vip_numero = " + num

            connexion.query(sql, callback)

            connexion.release()
        }
    });
}


module.exports.getProfessionActeur = (num, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = "SELECT film_titre, film_daterealisation, \
            CONCAT(vRea.vip_prenom,' ', vRea.vip_nom) AS nom_realisateur, VRea.vip_numero AS id_realisateur, \
            VRea.vip_texte AS com_realisateur, photo_adresse \
            FROM vip vAct INNER JOIN joue j ON vAct.vip_numero = j.vip_numero \
            INNER JOIN film f ON j.film_numero = f.film_numero \
            INNER JOIN vip vRea ON f.vip_numero = vRea.vip_numero \
            INNER JOIN photo p ON vRea.vip_numero = p.vip_numero \
            WHERE vAct.vip_numero = " + num + " AND photo_numero = 1"

            connexion.query(sql, callback)

            connexion.release()
        }
    });
}


module.exports.getProfessionRealisateur = (num, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = "SELECT film_titre, film_daterealisation "
            sql += "FROM film "
            sql += "WHERE vip_numero = " + num

            connexion.query(sql, callback)

            connexion.release()
        }
    });
}

module.exports.getProfessionChanteur = (num, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = "SELECT chanteur_specialite, album_titre, album_date, maisondisque_nom "
            sql += "FROM chanteur ch INNER JOIN composer co ON ch.vip_numero = co.vip_numero "
            sql += "INNER JOIN album a ON a.album_numero = co.album_numero "
            sql += "INNER JOIN maisondisque m ON a.maisondisque_numero = m.maisondisque_numero "
            sql += "WHERE ch.vip_numero = " + num

            connexion.query(sql, callback)

            connexion.release()
        }
    });
}

module.exports.getProfessionMannequin = (num, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = "SELECT defile_lieu, defile_date, \
            CONCAT(vCou.vip_prenom,' ', vCou.vip_nom) AS nom_couturier, vCou.vip_numero AS id_couturier, \
            photo_adresse, vCou.vip_texte AS com_couturier \
            FROM defileDans dd INNER JOIN defile d ON dd.defile_numero = d.defile_numero \
            INNER JOIN vip vCou ON vCou.vip_numero = d.vip_numero \
            INNER JOIN photo p ON vCou.vip_numero = p.vip_numero \
            WHERE dd.vip_numero = " + num + " AND photo_numero = 1"

            console.log(sql)

            connexion.query(sql, callback)

            connexion.release()

            // 
        }
    });
}

module.exports.getProfessionCouturier = (num, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = "SELECT defile_lieu, defile_date \
            FROM defile \
            WHERE vip_numero = " + num

            connexion.query(sql, callback)

            connexion.release()
        }
    });
}


module.exports.getMariages = (num, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = "SELECT date_evenement, mariage_lieu, mariage_fin, \
            CONCAT(vip_prenom,' ', vip_nom) AS nom_marie, vip_vip_numero AS id_marie, \
            photo_adresse, vip_texte AS com_marie \
            FROM mariage m INNER JOIN vip v ON m.vip_vip_numero = v.vip_numero \
            INNER JOIN photo p ON v.vip_numero = p.vip_numero \
            WHERE m.vip_numero = " + num + " AND photo_numero = 1 \
            UNION \
            SELECT date_evenement, mariage_lieu, mariage_fin, \
            CONCAT(vip_prenom,' ', vip_nom) AS nom_marie, m.vip_numero AS id_marie, \
            photo_adresse, vip_texte AS com_marie \
            FROM mariage m INNER JOIN vip v ON m.vip_numero = v.vip_numero \
            INNER JOIN photo p ON v.vip_numero = p.vip_numero \
            WHERE vip_vip_numero = " + num + " AND photo_numero = 1"

            connexion.query(sql, callback)

            connexion.release()
        }
    });
}


module.exports.getLiaisons = (num, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = "SELECT date_evenement, liaison_motiffin, \
            CONCAT(vip_prenom,' ', vip_nom) AS nom_liaison, vip_vip_numero AS id_liaison, \
            photo_adresse, vip_texte AS com_liaison \
            FROM liaison l INNER JOIN vip v ON l.vip_vip_numero = v.vip_numero \
            INNER JOIN photo p ON v.vip_numero = p.vip_numero \
            WHERE l.vip_numero = " + num + " AND photo_numero = 1 \
            UNION \
            SELECT date_evenement, liaison_motiffin, \
            CONCAT(vip_prenom,' ', vip_nom) AS nom_liaison, l.vip_numero AS id_liaison, \
            photo_adresse, vip_texte AS com_liaison \
            FROM liaison l INNER JOIN vip v ON l.vip_numero = v.vip_numero \
            INNER JOIN photo p ON v.vip_numero = p.vip_numero \
            WHERE vip_vip_numero = " + num + " AND photo_numero = 1"

            connexion.query(sql, callback)

            connexion.release()
        }
    });
}


module.exports.getPhotosAnnexesVip = (num, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = "SELECT photo_adresse AS adresse_photo, photo_sujet \
            FROM VIP v INNER JOIN PHOTO p ON v.vip_numero = p.vip_numero \
            WHERE p.vip_numero = " + num + " AND photo_numero != 1 \
            ORDER BY photo_numero"

            connexion.query(sql, callback)

            connexion.release()
        }
    });
}




//Articles
module.exports.getVips = (callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = "SELECT CONCAT(vip_prenom,' ', vip_nom) AS vip_nom, vip_numero \
            FROM VIP v \
            WHERE EXISTS( SELECT vip_numero FROM apoursujet a WHERE v.vip_numero = a.vip_numero  )"

            console.log(sql)

            connexion.query(sql, callback)

            connexion.release()
        }
    });
}


module.exports.getArticles = (num, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            var sql = 'SELECT article_titre, article_resume, article_date_insert AS article_date \
            FROM APOURSUJET s INNER JOIN ARTICLE a ON s.article_numero = a.article_numero \
            WHERE s.vip_numero = ' + num

            connexion.query(sql, callback)

            connexion.release()
        }
    });
}