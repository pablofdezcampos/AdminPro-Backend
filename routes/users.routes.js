/*
    Route: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middleware/field-validator');

const { getUsers, createUser, updateUsers, deleteUser} = require('../controllers/users.controllers');
const { jwtValidator } = require('../middleware/jwt-validator');

const router = Router();

router.get('/', jwtValidator, getUsers);

router.post('/',
    [
        check('name', 'The field name is required').not().isEmpty(),
        check('password', 'The field password is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        fieldValidator
    ],
    createUser);

router.put('/:id', 
    [
        jwtValidator,
        check('name', 'The field name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('role', 'The field role is required').not().isEmpty()
    ],
    updateUsers);    

router.delete('/:id',
    jwtValidator, 
    deleteUser
);    

module.exports = router;