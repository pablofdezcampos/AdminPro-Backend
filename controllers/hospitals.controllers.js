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

    const uid = req.id;
    const hospital = new Hospital({
        user: uid,
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

const updateHospitals = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid; //We have access to the uid (user id) cause of the token

    try{

        const hospitalDB = await Hospital.findById(id);
        
        if(!hospitalDB){
            res.status(404).json({
                ok: true,
                msg: 'Not found hospital'
            });    
        }

        const changesHospital = {
            ...req.body, //Body of the hospital, includes de the new values in the body (Postman)
            user: uid
        }

        const updateHospital = await Hospital.findByIdAndUpdate(id, changesHospital, {new: true}) //new: true to get the last document, with the new values

        res.json({
            ok: true,
            updateHospital
        });

    } catch(err) {
        res.status(500).json({
            ok: false,
            err
        })
    }
}

const deleteHospitals = async(req, res = response) => {

    const id = req.params.id;

    try {
        const hospitalDB = await Hospital.findById(id);
        
        if(!hospitalDB){
            res.status(404).json({
                ok: true,
                msg: 'Not found hospital'
            });    
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital was remove sucessfuly'
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            err
        })
    }

}

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}