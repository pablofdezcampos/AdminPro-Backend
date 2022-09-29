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

    const uid = req.id;
    const medical = new Medical({
        user: uid,
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

const updateMedicals = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.id;

    try{

        const medical = await Medical.findById(id);
        
        if(!medical){
            return res.status(404).json({
                ok: false,
                msg: 'The medical does not exist'
            });
        }

        const changesMedical = {
            ...req.body,
            user: uid
        }

        const updateMedical = await Medical.findByIdAndUpdate(id, changesMedical, {new: true});

        res.json({
            oK: true,
            updateMedical
        });

    }catch(err){
        
        res.json({
            oK: false,
            err: 'ERROR'
        })
    }
}

const deleteMedicals = async(req, res = response) => {
   
    const id = req.params.id;

    try{
        const medicalDB = await Medical.findById(id);

        if(!medicalDB){
            res.status(404).json({
                ok: false,
                msg: 'The medical does not exist'
            });
        }

        await Medical.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'The medical was remove sucessfuly'
        });

    } catch(err){
        res.status(500).json({
            ok: false,
            err
        })
    }
}

module.exports = {
    getMedicals,
    createMedicals,
    updateMedicals,
    deleteMedicals
}