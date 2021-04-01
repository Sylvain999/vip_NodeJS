let model = require("../models/vip.js");

var async = require('async')


// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des stars';
   lettre = request.query.lettre;

   async.parallel([
      function (callback) {
         model.getLettres((err, resLettres)=>{
            callback(null, resLettres)
         })
      },
      function (callback){
         if (lettre != undefined){
            model.getAdrPhotos(lettre, (err, resVip)=>{
               callback(null, resVip)
            })
         }else{
            callback(null, undefined)
         }
      }],
      function (err, result){
         if (err){
            console.log(err)
            return
         };
         response.lettresVip = result[0]
         response.adrPhotos = result[1]
         response.render('repertoireVips', response);
      }
   
   );

} ;


module.exports.DetailVip = (request, response) =>{
   response.title = 'Détail de la personne'
   vip_num = request.params.num

   async.parallel([
      function (callback) {
         model.getLettres((err, resLettres)=>{
            callback(null, resLettres)
         })
      },
      function (callback) {
         model.getDetailsVip(vip_num, (err, resDetails)=>{
            callback(null, resDetails)
         })
      },
      function (callback) {
         model.getPhotosAnnexesVip(vip_num, (err, resPhotos)=>{
            callback(null, resPhotos)
         })
      },
      function (callback) {
         model.getProfessionActeur(vip_num, (err, resActeur) =>{
            callback(null, resActeur)
         })
      },
      function (callback) {
         model.getProfessionRealisateur(vip_num, (err, resRealisateur) =>{
            callback(null, resRealisateur)
         })
      },
      function (callback) {
         model.getProfessionChanteur(vip_num, (err, resChanteur) =>{
            callback(null, resChanteur)
         })
      },
      function (callback) {
         model.getProfessionMannequin(vip_num, (err, resMannequin) =>{
            callback(null, resMannequin)
         })
      },
      function (callback) {
         model.getProfessionCouturier(vip_num, (err, resCouturier) =>{
            callback(null, resCouturier)
         })
      },
      function (callback) {
         model.getMariages(vip_num, (err, resMariage) =>{
            callback(null, resMariage)
         })
      },
      function (callback) {
         model.getLiaisons(vip_num, (err, resLiaison) =>{
            callback(null, resLiaison)
         })
      },
   ],
   function (err, result){
      if (err){
         console.log(err)
         return
      };

      response.lettresVip = result[0]
      response.details = result[1][0]
      response.photos = result[2]
      response.acteur = result[3]
      response.realisateur = result[4]

      if (result[5].length != 0){
         response.chanteur = {
            specialite : result[5][0].chanteur_specialite,
            details : result[5]
         }
      }

      response.mannequin = result[6]
      response.couturier = result[7]
      response.mariage = result[8]
      response.liaison = result[9]

      response.render('detailVip', response)
   })

   
}
