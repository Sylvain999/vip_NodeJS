let HomeController = require('./../controllers/HomeController');
let AddVipController = require('./../controllers/AddVipController')
let ModifyVipController = require('./../controllers/ModifyVipController')
let DeleteVipController = require('./../controllers/DeleteVipController')
let AddPhotoController = require('./../controllers/AddPhotoController')
let DeletePhotoController = require('./../controllers/DeletePhotoController')


// Routes
module.exports = function(app){

//Login
    app.get('/', HomeController.LoginGet);
    app.get('/login', HomeController.LoginGet);
    app.post('/login', HomeController.LoginPost)

    app.all('*', function (req, res, next) {
        if(req.session.id_user === undefined){
            res.redirect('/login');
        }else{
            next(); // pass control to the next handler
        }
      }
    )

    app.get('/deconnexion', HomeController.Deconnexion)

//addVip
    app.get('/addVip', AddVipController.FormAddVip)
    app.post('/addVip', AddVipController.PostAddVip)

//SupprVip
    app.get('/modifyVip', ModifyVipController.TableVipSelect)
    app.get('/modifyVip/:vip_num', ModifyVipController.GetVipsModify)
    app.post('/modifyVip/:vip_num', ModifyVipController.PostVipsModify)


//SupprVip
    app.get('/deleteVip', DeleteVipController.GetDeleteVipForm)
    app.get('/deleteVip/:vip_num', DeleteVipController.DeleteVipSQL)


//addPhoto
    app.get('/addPhoto', AddPhotoController.GetAddPhoto)
    app.post('/addPhoto', AddPhotoController.POSTAddPhoto)

//SupprPhoto
    app.all('/deletePhoto', DeletePhotoController.GetDeletePhotoForm)
    app.get('/deletePhoto/:num', DeletePhotoController.GetDeletePhotoForm)

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
