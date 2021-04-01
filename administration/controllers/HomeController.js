let Cryptr = require('cryptr');
let model = require("../models/login.js");
let async = require('async');
let _ = require('lodash');

  // ////////////////////////////////////////////// A C C U E I L
module.exports.LoginGet = function(request, response){

  if (request.session.id_user !== undefined){
    response.redirect('/addVip');
  }else{
    
    response.title = "Login";

    response.layout = "login"

    response.render('loginForm', response);
  } 

};



module.exports.LoginPost = function(request, response){
    response.title = "Login";

    
    let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF')

    let identifiant = request.body.login
    let mdp = request.body.mdp

    async.parallel([
      function (callback) {
         model.logins( (err, resLogin)=>{
            callback(null, resLogin)
         })
      },
      function (callback) {
        model.logins( (err, resLogin)=>{
           callback(null, resLogin)
        })
      }
      ],

      (err, result) => {
        if (err) {
          console.log(err);
          return;
        };


        let logBD = _.find(result[0], (o) => {return o.login === identifiant });


        if (logBD === undefined){
          response.layout = "login";
          response.render('loginForm', response);
        }else{          

          if (cryptr.decrypt(logBD.passwd) !== mdp){
            response.layout = "login";
            response.render('loginForm', response);
          }else{
            request.session.id_user = identifiant;
            response.redirect('/addVip');
          }

        }
      })    
}

module.exports.Deconnexion = function(request, response){
  request.session.id_user = undefined;
  response.redirect('/login');
};


module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};
