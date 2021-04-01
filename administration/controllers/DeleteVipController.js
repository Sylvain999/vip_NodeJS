let modelVip = require("../models/vip.js");
let modelBases = require("../models/bases.js")
let async = require('async');
let _ = require('lodash');

  // ////////////////////////////////////////////// A C C U E I L
module.exports.GetDeleteVipForm = function(request, response){

    response.title = "Supprimer un VIP";

    async.parallel([
        function (callback) {
           modelBases.getVips( (err, resVips)=>{
              callback(null, resVips)
           })
        }
        ],
  
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          };

          response.vips = result[0];

          response.render('supprVip', response);
  
        })
};



module.exports.DeleteVipSQL = function(request, response){

    response.title = "Supprimer un VIP";

    let vip_num = request.params.vip_num

    async.series([
        function (callback) {
            modelVip.deletePhotosVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteAPourSujetVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteLiaisonVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteMariageVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteJoueVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteActeurVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteFilmVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteRealisateurVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteComposerVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteChanteurVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteDefileDansVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteAPourAgenceVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteMannequinVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteDefileVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteCouturierVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
            modelVip.deleteVip(vip_num, (err, resVips)=>{
               callback(null, resVips)
            })
        },
        function (callback) {
           modelBases.getVips( (err, resVips)=>{
              callback(null, resVips)
           })
        }
        ],
  
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          };

          response.vips = result[result.length - 1];

          response.render('supprVip', response);
  
        })
};