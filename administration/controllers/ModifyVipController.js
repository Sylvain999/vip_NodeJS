let modelVip = require("../models/vip.js");
let modelBases = require("../models/bases.js")
let async = require('async');
let _ = require('lodash');
let moment = require('moment');

  // ////////////////////////////////////////////// A C C U E I L
module.exports.TableVipSelect = function(request, response){

    response.title = "Modifier un VIP";

    async.parallel([
        function (callback) {
           modelBases.getVips( (err, resVip)=>{
              callback(null, resVip)
           })
        }
        ],
  
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          };

          response.vips = result[0];

          response.render('modifVipTable', response);
  
        })
};


module.exports.GetVipsModify = function(request, response){

    response.title = "Ajouter un VIP";

    let vip_num = request.params.vip_num

    let vip = {
        vip_num : vip_num,
        vip_nom : '',
        vip_prenom : '',
        vip_sexe : '',
        vip_naissance : '',
        nationalite_numero : '',
        vip_texte : '',
    }

    let image = {
        vip_numero : vip_num,
        photo_numero : 1,
        photo_sujet : '',
        photo_commentaire : "",
        photo_adresse : '',
    }

    async.parallel([
        function (callback) {
            modelBases.nationalite( (err, resNationalite)=>{
                callback(null, resNationalite)
            })
        },
        function (callback){
            modelVip.getVipDetails( vip_num, (err, resVip)=>{
                callback(null, resVip);
            })
        },
    ],
    (err, result) => {
        if (err) {
            console.log(err);
            return;
        };

        response.nationalite = result[0];

        response.vip = {
            vip_num : vip_num,
            vip_nom : result[1][0].vip_nom,
            vip_prenom : result[1][0].vip_prenom,
            vip_sexe : result[1][0].vip_sexe,
            vip_naissance : moment(result[1][0].vip_naissance).format("YYYY-MM-DD"),
            nationalite_numero : result[1][0].nationalite_numero,
            vip_texte : result[1][0].vip_texte,
        } 
        
        response.image = {
            photo_numero : 1,
            photo_sujet : result[1][0].photo_sujet,
            photo_commentaire : result[1][0].photo_commentaire,
            photo_adresse : result[1][0].photo_adresse,
        }

        response.render('modifVip', response);
    }
    
    ) 

};


module.exports.PostVipsModify = function(request, response){

    response.title = "Modifier un VIP";

    let vip = {
        vip_numero : request.params.vip_num,
        vip_nom : request.body.nom,
        vip_prenom : request.body.prenom,
        vip_sexe : request.body.sexe,
        vip_naissance : request.body.date,
        nationalite_numero : parseInt(request.body.nationalite),
        vip_texte : request.body.commentaire,
    }

    let image = {
        vip_numero : request.params.vip_num,
        photo_numero : 1,
        photo_sujet : request.body.sujet_image,
        photo_commentaire : request.body.commentaire_photo,
    }

    if (vip.vip_nom === "" || vip.vip_prenom === ""){

        response.render('modifVip', response);

    }else{


        async.parallel([
            function (callback) {
                modelBases.nationalite( (err, resNationalite)=>{
                    callback(null, resNationalite)
                })
            },
            function (callback){
                modelVip.updateTableVip( vip, (err, resVip)=>{
                    callback(null, resVip);
                })
            },
            function (callback){
                modelVip.updateTablePhotoPrincipale(image, (err, resPhoto)=>{
                    callback(null, resPhoto);
                })
            }
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            };

            response.nationalite = result[0];

            
            response.redirect('/modifyVip');

            
        }
        
        )

    }  

};
