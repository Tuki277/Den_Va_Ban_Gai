var express = require('express');
var router = express.Router();
const adminControllers = require('../controllers/admin')
var multer = require('multer');
var upload = multer({ dest : './public/uploads' }).single('image')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.route('/add')
    .get(adminControllers.getAdd)
    .post(upload, adminControllers.addPost)

router.route('/addImage')
    .get(adminControllers.getAddImage)
    .post(upload, adminControllers.addImage)

router.get('/manage', adminControllers.getManage)

router.get('/site', adminControllers.getSite)

router.get('/deleteImage/:id', adminControllers.deteleImage)

router.get('/deleteText/:id', adminControllers.deteleText)

router.route('/editImage/:id')
    .get(adminControllers.getEditImgae)
    .post(adminControllers.editImage)

router.route('/editText/:id')
    .get(adminControllers.getEditText)
    .post(adminControllers.editText)

module.exports = router;
