const {response} = require('express');

const Medical = require('../model/medicals.model');

const getMedicals = async(req, res = response) => {

    const medicals = await Medical.find()
                                  .populate('user', 'name img')  
                                  .populate('hospital', 'name img')  

    res.json({
        ok: true,
        medicals
    });
}

const createMedicals = async(req, res = response) => {

    const id = req.id;
    const medical = new Medical({
        user: id,
        ...req.body
    })

    try{

        const medicalDB = await medical.save();
     
        res.json({
            ok: true,
            medical: medicalDB
        });            

    } catch(err){
        res.status(500).json({
            ok: false,
            msg: 'ERROR'
        });
    }
}

const updateMedicals = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Medicals Update'
    });
}

const deleteMedicals = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Medicals Delete'
    });
}

module.exports = {
    getMedicals,
    createMedicals,
    updateMedicals,
    deleteMedicals
}