const {response} = require('express');

const Hospital = require('../model/hospitals.model');

const getHospitals = async(req, res = response) => {

    const hospitals = await Hospital.find()
                                    .populate('user', 'name');

    res.json({
        ok: true,
        hospitals
    });
}

const createHospitals = async(req, res = response) => {

    const id = req.id;
    const hospital = new Hospital({
        user: id,
        ...req.body
    });

    try{

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospitalDB
        });

    } catch (err){
        res.status(500).json({
            ok: false,
            msg: 'ERROR'
        });
    }
}

const updateHospitals = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Hospitals Update'
    });
}

const deleteHospitals = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Hospitals Delete'
    });
}

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}