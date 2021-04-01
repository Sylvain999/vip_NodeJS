let modelBases = require("../models/bases.js")
let modelPhotos = require("../models/photo.js")
let async = require('async');
let _ = require('lodash');


module.exports.GetAddPhoto = function(request, response) {

    response.title = "Ajouter une photo";

    async.parallel([
            function(callback) {
                modelBases.getVips((err, resLogin) => {
                    callback(null, resLogin)
                })
            }
        ],

        (err, result) => {
            if (err) {
                console.log(err);
                return;
            };

            response.vips = result[0];

            response.render('ajoutPhoto', response);

        })
};



module.exports.POSTAddPhoto = function(request, response) {

    response.title = "Ajouter une photo";

    let photo = {
        photo_numero: -1,
        vip_numero: parseInt(request.body.id_vip),
        photo_sujet: request.body.titre_photo,
        photo_commentaire: request.body.photo_commentaire,
        photo_adresse: request.body.photo
    }


    async.series([
            function(callback) {
                modelBases.getVips((err, resVips) => {
                    callback(null, resVips)
                })
            },
            function(callback) {
                modelPhotos.getIndexLastPhoto(photo.vip_numero, (err, resLastPhoto) => {
                    console.log(resLastPhoto);
                    photo.photo_numero = resLastPhoto[0].photo_numero + 1;
                    callback(null, resLastPhoto)
                })
            },
            function(callback) {
                modelBases.insertImage(photo, (err, resPhotoInsert) => {
                    console.log(resPhotoInsert)
                    callback(null, resPhotoInsert)
                })
            }
        ],

        (err, result) => {
            if (err) {
                console.log(err);
                return;
            };

            response.vips = result[0];

            response.render('ajoutPhoto', response);

        })

    response.render('ajoutPhoto', response);
};