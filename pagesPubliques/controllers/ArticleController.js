let model = require("../models/vip.js");

var async = require('async')

module.exports.ArticleVide = 	function(request, response){
    response.title = 'Articles';

    response.sansArticles = true ;

    model.getVips(function(err, result){

        response.vips = result

        response.render('article', response);

    })
 
 } ;


module.exports.Article = (request, response) => {
    response.title = 'Articles';
    num_vip = request.params.num;

    response.sansArticles = false;

    async.parallel([
        function (callback) {
           model.getVips((err, resLettres)=>{
              callback(null, resLettres)
           })
        },
        function (callback){
           if (num_vip != undefined){
              model.getArticles(num_vip, (err, resVip)=>{
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
            response.vips = result[0]
            response.articles = result[1]

            response.vip_num = num_vip

            console.log(response.vip_num)



            response.render('article', response);
         }   
     
     );
}