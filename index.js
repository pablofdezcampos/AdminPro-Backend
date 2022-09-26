require('dotenv').config();

const express = require('express');
var cors = require('cors');

//Configuration of Express Server
const {dbConnection} = require('./database/config');

//Creating Express server
const app = express();

//Configuration of Cors
app.use(cors());

//Lecture and parsing of body
app.use(express.json());

//Database
dbConnection();

//Routes
app.use('/api/users', require('./routes/users.routes')); //CRUD of Users
app.use('/api/login', require('./routes/auth.routes')); //Login of Users


app.listen(process.env.PORT, () => {
    console.log('Server Running in port: ' + process.env.PORT);
});