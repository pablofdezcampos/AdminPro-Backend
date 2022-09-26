const {response} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../model/users.model');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const {email, password} = req.body;

    try{

        //Verify email
        const userDB = await User.findOne({email})
        
        if(!userDB){
            return res.status('400').json({
                ok: false,
                msg: 'Incorrect email'
            });
        }

        //Verify password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        //Generation of tokens
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token
        });

    } catch(error) {
        console.log(error),
        res.status(500).json({
            ok: false,
            msg: 'Incorrect Login'
        });
    }
}

module.exports = {
    login
}