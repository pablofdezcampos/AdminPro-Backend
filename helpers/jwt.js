const jwt = require('jsonwebtoken');

const generateJWT = (id) => {

    return new Promise( (resolve, reject) => {
        
        const payload = {
            id
        };
    
        jwt.sign(payload, process.env.JWT, {
            expiresIn: '12h'
        }, (err, token) => {

            if(err){
                reject('JWT not generated');
            } 
            else {
                return resolve(token);
            }

        });
    });
}

module.exports = {
    generateJWT
}