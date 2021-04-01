let modelVip = require("../models/vip.js");
let modelBases = require("../models/bases.js")
let async = require('async');
let _ = require('lodash');

  // ////////////////////////////////////////////// A C C U E I L
module.exports.FormAddVip = function(request, response){

    response.title = "Ajouter un VIP";

    async.parallel([
        function (callback) {
           modelBases.nationalite( (err, resLogin)=>{
              callback(null, resLogin)
           })
        }
        ],
  
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          };

          response.nationalite = result[0];

          response.render('ajoutVIP', response);
  
        })
};


module.exports.PostAddVip = function(request, response){

    response.title = "Ajouter un VIP";

    let vip = {
        vip_nom : request.body.nom,
        vip_prenom : request.body.prenom,
        vip_sexe : request.body.sexe,
        vip_naissance : request.body.date,
        nationalite_numero : parseInt(request.body.nationalite),
        vip_texte : request.body.commentaire,
    }

    let image = {
        vip_numero : -1,
        photo_numero : 1,
        photo_sujet : request.body.sujet_image,
        photo_commentaire : request.body.commentaire_photo,
        photo_adresse : request.body.image,
    }

    if (vip.vip_nom === "" || vip.vip_prenom === "" || image.photo_adresse === ""){

        response.error = "Un champs obligatoire est manquant"

        response.render('ajoutVIP', response);

    }else{


        async.series([
            function (callback) {
                modelBases.nationalite( (err, resNationalite)=>{
                    callback(null, resNationalite)
                })
            },
            function (callback){
                modelVip.insertTableVip( vip, (err, resInsertVip)=>{
                    image.vip_numero = resInsertVip.insertId;
                    callback(null, resInsertVip);
                })
            },
            function (callback){
                modelBases.insertImage(image, (err, resInsertPhoto)=>{
                    callback(null, resInsertPhoto);
                })
            }
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            };

            response.nationalite = result[0];

            response.message = vip.vip_prenom + " " + vip.vip_nom +" a été ajouté"

            response.render('ajoutVip', response);
        }
        
        )

    }  

};