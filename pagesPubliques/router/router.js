let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let ArticleController = require('./../controllers/ArticleController');



// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:num', VipController.DetailVip)

//article
  app.get('/articles', ArticleController.ArticleVide)
  app.get('/articles/:num', ArticleController.Article)

 // albums
   app.get('/album', AlbumController.ListerAlbum);
   app.get('/album/:vip_num', AlbumController.ListerAlbum)
   app.get('/album/:vip_num/:photo_num', AlbumController.ListerAlbum)
   app.get('/album/:vip_num/:photo_num/:page_album', AlbumController.ListerAlbum)

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
