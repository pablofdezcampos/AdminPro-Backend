/*
    Route: /api/all:search
*/

const {Router} = require('express');
const { jwtValidator } = require('../middleware/jwt-validator');

const { getAll } = require('../controllers/searchs.controllers');

const router = Router();

router.get('/:search', jwtValidator, getAll);
router.get('/collection/:table/:search', jwtValidator, getAll);

module.exports = router;