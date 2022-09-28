const {response} = require('express');

const User = require('../model/users.model');
const Hospital = require('../model/hospitals.model');
const Medical = require('../model/medicals.model');

const getAll = async(req, res = response) => {

    const search = req.params.search;
    const regex = new RegExp(search, 'i') //'i' is not case sensitive

    const [users, hospitals, medicals] = await Promise.all([
        User.find({name: regex}),
        Hospital.find({name: regex}),
        Medical.find({name: regex}),
    ]);

    res.json({
        ok: true,
        users,
        hospitals,
        medicals
    });
}

const getCollections = async(req, res = response) => {

    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp(search, 'i') //'i' is not case sensitive

    let data = [];

    switch(table){
        case 'medicals':
            data = await Medical.find({name: regex})
                                .populate('user', 'name img')
                                .populate('hospital', 'name img');
            break;

        case 'hospitals':
            data = await Hospital.find({name: regex})
                                 .populate('user', 'name img');;
            break;

        case 'users':
            data = await User.find({name: regex});
            break;
        
        default:
            return res.status(400).json({
                ok: false,
                msg: 'ERROR'
            });    
    }

    res.json({
        ok: true,
        results: data
    });
}

module.exports = {
    getAll,
    getCollections
}