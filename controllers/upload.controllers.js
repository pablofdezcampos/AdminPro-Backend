const fs = require('fs');
const path = require('path');

const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');

const fileUpload = async(req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    //Files types validation
    const validTypes = ['hospitals', 'medicals', 'users'];
    if(!validTypes.includes(type)){
        res.status(400).json({
            ok: false,
            msg: 'ERROR'
        });
    }

    //Validation of existing file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No file selected'
        });
    }

    //Image process
    const file = req.files.image;

    const cutName = file.name.split('.') //Example => image.1.2.3.jpg, the split eliminates the .
    const fileExtension = cutName[cutName.length - 1];

    //Validate extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if(!validExtensions.includes(fileExtension)){
        return res.status(400).json({
            ok: false,
            msg: 'Invalid extension'
        });
    }

    //Generate the name of the file
    const fileName = `${uuidv4()}.${fileExtension}`; 

    //Path to save the image
    const path = `./uploads/${type}/${fileName}`;

    //Move the image
    file.mv(path, (err) => {
        if (err){
            return res.status(500).json({
                ok: false,
                msg: 'Error when moving the image'
            });
        }

    //Update BBDD
    updateImage(type, id, fileName);    

        res.json({
            ok: true,
            msg: 'File uploaded',
            fileName
        })
      });
}

const returnImage = (req, res = response) => {
    const type = req.params.type;
    const picture = req.params.picture;

    const pathImg = path.join(__dirname, `../uploads/${type}/${picture}`);

    //Default Image
    if(fs.existsSync(pathImg)){
       res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    fileUpload,
    returnImage
}