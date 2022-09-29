/*
    Route: /api/medicals
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middleware/field-validator');

const { getMedicals, createMedicals, updateMedicals, deleteMedicals } = require('../controllers/medicals.controller');
const { jwtValidator } = require('../middleware/jwt-validator');

const router = Router();

router.get('/', getMedicals);

router.post('/',
    [
        jwtValidator,
        check('name', 'The name of the medical is required').not().isEmpty(),
        check('hospital', 'The hospital id must be valid').isMongoId(), //The id of the hospital must be a MongoId
        fieldValidator
    ],
    createMedicals);

router.put('/:id', 
    [
        jwtValidator,
        check('name', 'The name of the medical is required').not().isEmpty(),
        check('hospital', 'The name of the hospital is required').isMongoId(),
        fieldValidator
    ],
    updateMedicals);    

router.delete('/:id',
    [
        jwtValidator,
        deleteMedicals
    ]
);    

module.exports = router;