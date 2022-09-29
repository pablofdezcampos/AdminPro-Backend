/*
    Route: /api/login
*/


const { Router } = require('express');
const { check } = require('express-validator');
const  {login, googleSignIn, renewToken} = require('../controllers/auth.controllers');
const { fieldValidator } = require('../middleware/field-validator');
const {jwtValidator} = require('../middleware/jwt-validator')

const router = Router();

router.post('/', 
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        fieldValidator
    ],
    login);

    
router.post('/google', 
    [
        check('token', 'The token from google is required').not().isEmpty(),
        fieldValidator
    ],
    googleSignIn);

router.get('/renew', 
    jwtValidator,
    renewToken        
);    

module.exports = router;