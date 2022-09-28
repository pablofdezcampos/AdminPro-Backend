/*
    Route: /api/upload
*/

const {Router} = require('express');
const { jwtValidator } = require('../middleware/jwt-validator');
const expressFileUpload = require('express-fileupload');

const { fileUpload, returnImage } = require('../controllers/upload.controllers');

const router = Router();

router.use(expressFileUpload());
router.put('/:type/:id', jwtValidator, fileUpload);

router.get('/:type/:img', returnImage);

module.exports = router;