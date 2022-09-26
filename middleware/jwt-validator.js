const {response} = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = (req, res = response, next) => {

    //Read the token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'There is not token'
        });
    }

    try{

        const {id} = jwt.verify(token, process.env.JWT);
        
        req.id = id;

        next();

    } catch (err){
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }

}   

module.exports = {
    jwtValidator
}