const {response} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../model/users.model');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async(req, res) => {

    //From = pagination
    const from = req.query.from || 0;

    //To make filters
    //const users = await User.find({}, 'name email role google');

    /*const users = await User.find()
                            .skip(from)
                            .limit(5);

    //Number of indexes values in database (number of registers)
    const total = await User.count();*/
    
    //Promise to resolve
    const [users, total] = await Promise.all([
        User.find({}, 'name email role img')
            .skip(from)
            .limit(5),

        User.count()   
    ]);
    
    res.json({
        ok: true,
        users,
        id: req.id,
        total
    });
}

const createUser = async(req, res = response) => {

    const {email, password} = req.body;

    try{

        const exitsEmail = await User.findOne({email});

        if(exitsEmail){
            return res.status(400).json({
                ok: false,
                msg: 'The email is already registered'
            });
        }

        const user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        await user.save();

        //Generation of tokens
        const token = await generateJWT(user.id);

    
        res.json({
            ok: true,
            user,
            token
        });

    } catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ERROR'
        });
    }
}

const updateUsers = async (req, res = response) => {

    //Validate token and check if the user is correct

    const id = req.params.id;

    try {

        const userDB = await User.findById(id);

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'There is not an user with that id'
            });
        }

        //Updates
        const  {password, google, email, ...fields} = req.body;

        //The user can not update the email by an email that already is registered
        if(userDB.email === email){
            delete fields.email;
        } else {
            const exitsEmail = await User.findOne({ email: email });
            if (exitsEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Email is already registered'
                });
            }
        }

        fields.email = email;

        //Delete the password because we do not want an update of that field
        delete fields.password;
        delete fields.google;

        const updateUser = await User.findByIdAndUpdate(id, fields);

        res.json({
            ok: true,
            user: updateUser
        })

    } catch(error){
        res.status(500).json({
            ok: false,
            msg: 'ERROR'
        });
    }
}

const deleteUser = async (req, res = response) => {
    
    const id = req.params.id;

    try{

        const userDB = await User.findById(id);

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: ''
            });
        }

        await User.findByIdAndDelete(id);

        res.json({
            ok: true, 
            msg: 'User deleted successfully'
        })

    }catch(error){

    }
}

module.exports = {
    getUsers,
    createUser,
    updateUsers,
    deleteUser
}