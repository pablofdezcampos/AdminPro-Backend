const {response} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../model/users.model');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    try{
        const {email, name, picture} = await googleVerify(req.body.token);

        //Include the user for google in the collection of users
        const userDB = await User.findOne({email});
        let user;

        //Check if an user with that email exists, if not, includes in the collection
        if(!userDB){
            user = new User({
                name: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            user = userDB;
            user.google = true;
        }

        //Save user
        await user.save();

        //Generation of token
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            email, name, picture,
            token
        });
        
    } catch(err) {
        res.status(400).json({
            ok: false,
            msg: 'The token is not correct'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}