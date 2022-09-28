const {Schema, model} = require('mongoose');

const MedicalSchema = Schema({
    name: {
        type: String,
        required: true
    },   
    img: {
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

module.exports = model('Medicals', MedicalSchema);