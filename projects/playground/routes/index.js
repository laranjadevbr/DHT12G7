const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const { check, validationResult, body } = require('express-validator');
const middlewares = require('../middlewares/log');


const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        // cb(null, '/tmp/my-uploads')
        cb(null, path.join('public', 'images'));
    },
    filename : (req, file, cb) => {
        // cb(null, file.fieldname + '-' + Date.now());
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage : storage
});

const controllers = require('../controllers/controllers');
router.get('/', controllers.index);
router.get('/create', controllers.create);

router.post('/create', upload.any(), middlewares.dblog, [
    check('fullname').isLength({ min : 3 }).withMessage(),
    check('email').isEmail().withMessage(),
    check('password').isLength({ min : 6 }).withMessage(),
    // body('email').custom((value) => {
    //     let user = JSON.parse(fs.readFileSync(path.join('data', 'items.json')));
    //     return user.email == value;
    // }).withMessage('The e-mail already exists!'),
], controllers.save);

router.get('/edit/:id', controllers.edit);
router.put('/edited', controllers.edited);
router.get('/list', middlewares.author, controllers.list);
router.delete('/delete/:id', controllers.delete);
router.get('/log', controllers.log);
router.post('/log', controllers.login);
module.exports = router;