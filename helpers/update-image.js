const fs = require('fs');

const User = require('../model/users.model');
const Medical = require('../model/medicals.model');
const Hospital = require('../model/hospitals.model');

const deleteImage = (path) => {
    if(fs.existsSync(path)){
        //Delete previous image
        fs.unlinkSync(path);
    }
}

const updateImage = async(type, id, fileName) => {

    let oldPath = '';

    switch(type){
        case 'medicals':
            const medical = await Medical.findById(id);
            if(!medical){
                return false;
            }

            oldPath = `./uploads/medicals/${medical.img}`;
            deleteImage(oldPath);
            
            medical.img = fileName;
            await medical.save();
            return true;

        break;

        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                return false;
            }

            oldPath = `./uploads/hospitals/${hospital.img}`;
            deleteImage(oldPath);

            hospital.img = fileName;
            await hospital.save();
            return true;

        break;

        case 'users':
            const user = await User.findById(id);
            if(!user){
                return false;
            }

            oldPath = `./uploads/users/${user.img}`;
            deleteImage(oldPath);

            user.img = fileName;
            await user.save();
            return true;
            
        break;
    }
}


module.exports = {
    updateImage
}