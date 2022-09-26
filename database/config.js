const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {

    try {
        mongoose.connect(process.env.DB_CNN, {
            //Those options are not neccesary, its are implicits in the .connect
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true 
        });

        console.log('Db connection');

    } catch(error){
        throw new Error('ERROR')
    }
}

module.exports = {
    dbConnection
}