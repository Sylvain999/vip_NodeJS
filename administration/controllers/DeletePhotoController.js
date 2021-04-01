let modelPhoto = require("../models/photo.js");
let modelBases = require("../models/bases.js")
let async = require('async');


module.exports.GetDeletePhotoForm = function(request, response){

    response.title = "Supprimer une Photo";

    console.log(request.body.vip)

    if (request.body.vip !== undefined){
        request.session.vip_photo_sup = request.body.vip
    }

    vip_num = request.session.vip_photo_sup

    photo_num = request.params.num


    async.series([
        function (callback) {
           modelBases.getVips( (err, resVips)=>{
              callback(null, resVips)
           })
        },
        function (callback) {
            if (vip_num !== undefined && photo_num !== undefined && photo_num !== 1){
                modelPhoto.deletePhoto( vip_num, photo_num, (err, resVips)=>{
                    callback(null, resVips)
                })
            }else{
                callback(null, undefined)
            }
        },
        function (callback) {
            if (vip_num !== undefined){
                modelPhoto.getPhotosVip( vip_num, (err, resVips)=>{
                    callback(null, resVips)
                })
            }else{
                callback(null, undefined)
            }
        },
        ],
  
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            };

            response.vips = result[0];
            response.photos = result[2];
            response.vip_num = vip_num;

            console.log(response.photos)

            response.render('supprPhoto', response);
  
        })
};