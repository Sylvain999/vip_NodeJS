let model = require("../models/album.js");
let async = require("async")

// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = 	(request, response) => {
   response.title = 'Album des stars';

   vip_num = request.params.vip_num;
   photo_num = request.params.photo_num === undefined ? 1 : request.params.photo_num;


   if ( request.params.page_album !== undefined){

      request.session.page_num = request.params.page_album

   } else if (request.session.page_num === undefined) {

      request.session.page_num = 1;

   }


   page_num = request.session.page_num



   async.parallel([
      function (callback) {
         model.getPhotos(page_num,(err, resLettres)=>{
            callback(null, resLettres)
         })
      },
      function (callback) {

         if (vip_num === undefined){
            model.getDetailsPhotoByDefault((err, resLettres)=>{
               callback(null, resLettres)
            })
         }else{
            model.getDetailsPhoto(vip_num, (err, resLettres)=>{
               callback(null, resLettres)
            })
         }
         
      },
      function (callback) {
         model.getNbPhotosVip((err, resLettres)=>{
            callback(null, resLettres)
         })
      }

      ],

      (err, result) => {
         if (err){
            console.log(err)
            return
         };

         response.nb_vips = result[2][0].nb_vips;

         response.photos = result[0];
         

         if ( page_num > 1 ){
            response.page_avant = parseInt(page_num) - 1;
         }

         if ( page_num < parseInt(response.nb_vips / 12) ){
            response.page_apres = parseInt(page_num) + 1;
         }


         //définit la photo qui est à afficher
         if (photo_num >= 1 && photo_num <= result[1].length) {
            response.photo_actuel = result[1][photo_num-1];
         }
         
         //si il y a une photo avant, on affiche un lien pour y acceder
         if (photo_num > 1) {
            response.click_avant = parseInt(photo_num) - 1
         }

         //si il y a une photo après, on affiche un lien pour y acceder
         if (photo_num < result[1].length){
            response.click_apres = parseInt(photo_num) + 1
         }

         response.photo_num = photo_num
         response.vip_numero = vip_num === undefined ? response.photo_actuel.vip_numero : vip_num

         
         response.render('listerAlbum', response);

      }   
   
   );

} ;
