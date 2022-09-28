/*
    Route: /api/hospitals
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middleware/field-validator');

const {getHospitals, createHospitals, updateHospitals, deleteHospitals} = require('../controllers/hospitals.controllers');
const { jwtValidator } = require('../middleware/jwt-validator');

const router = Router();

router.get('/', getHospitals);

router.post('/',
    [
        jwtValidator,
        check('name', 'The name of the hospital is required').not().isEmpty(),
        fieldValidator
    ],
    createHospitals);

router.put('/:id', 
    [],
    updateHospitals);    

router.delete('/:id',
    deleteHospitals
);    

module.exports = router;