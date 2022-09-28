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
app.use('/api/hospitals', require('./routes/hospitals.routes')) //CRUD of Hospitals
app.use('/api/medicals', require('./routes/medicals.routes')) //CRUD of Medicals
app.use('/api/all', require('./routes/searchs.routes')) //Search
app.use('/api/upload/', require('./routes/upload.routes')) //Search
app.use('/api/login', require('./routes/auth.routes')); //Login of Users



app.listen(process.env.PORT, () => {
    console.log('Server Running in port: ' + process.env.PORT);
});