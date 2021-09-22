const express = require('express');

const googleClientId = '286216419697-fiuupsg66161d7aqejg16h3qv088mn5j.apps.googleusercontent.com';
const googleClientSecret = '1_cksPHcJJ_XWTDjFuE1XAV5';
const googleScopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];
const reDirectUrl = 'http://localhost:3000/login';
const { google } = require('googleapis');

const User = require('../models/Models');
// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const googleController = {};

// Generating an authentication URL:
const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    reDirectUrl,
);


const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: googleScopes,
    client_id: googleClientId,
    redirect_uri: reDirectUrl,
    response_type: 'code',
});


// all this does it redirect user to login page
googleController.login = (req, res, next) => {
    try{
        // params is empty object
        // query is empty object UNTIL user signs in, query gains properties of  :
            // code, scope, authuser, and prompt
        console.log('inside getController.login:')
        // const { code } = req.query.code;
        // console.log('res.query.code',req.query.code)
        // res.locals.code = code;
        // console.log('res.locals.code',res.locals.code)
        // // res.redirect(url);
        res.redirect(url);
        return next();
    }catch (err){
        console.log(req.body);
        res.status(400).json({ message: err.message });
    }
}

// // generates authorization code
googleController.getCode = (req, res, next) => {
    try {
        // console.log('inside getController.retrieveToken: req.query', req.query.code
        console.log('inside of getCode:')
        // console.log('req.query', req.query)
        const code = req.query.code;
        // console.log('inside  of  getCode, req.query.code;', code)
        res.locals.code = code;
        return next();
    } catch (error) {
        console.log(req.body);
        res.status(400).json({ message: error.message });
    }
}

// takes code, generates token
googleController.retrieveToken = async (req, res, next) => {
    try {
        console.log('Inside retrieveToken controller now')
        // console.log('res.locals.code',res.locals.code)
        // console.log('inside getController.retrieveToken: req.query', req.query.code)
        const { tokens } = await oauth2Client.getToken(res.locals.code)
        console.log('token is : ', tokens)
        oauth2Client.setCredentials(tokens);
        //darrens test
        res.locals.password = oauth2Client.credentials.id_token;
        // console.log('credentials: ', oauth2Client.credentials)
        return next();
    } catch (error) {
        console.log(req.body);
        res.status(400).json({ message: error.message });
    }
}
// Now that  we have an access token, we can call google API

//we need a controller that strictly verifies if the user already exists in the database
googleController.verifyUser = async (req, res, next) => {
    try {
        const password = res.locals.password;
        const user = await User.findOne({password: password}).exec();
        console.log('inside verifyUser user  is  ', user);
        if(user) {
            res.locals.user = user;
            return next();
        }else{
            // if user isnt found in database
            const newUser = await User.create({password: password})
            res.locals.user = newUser;
            return next();
        }
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

//after retrieving our token, we want to check first if the user already exists in the database via their password(ie, id_token)
    //if they do, send them to the app itself
    //otherwise, create a new user and then send them to the app
// googleController.createUser = async (req, res, next) => {
//     try{
//         const password = res.locals.password;
//         const users = await User.findOne({password: password}, (err, user) => {
//             if(user === null){
//                 User.create({})
//                 return next();
//             }else{
//                 //we want to create a new user document using the email and id_token properties from the credentials object
//             }
//         }).exec();
//     }catch{
//         res.status(400).json({ message: error.message });
//     };
    
// }

//retrieving the clients access token 
// const { tokens } = oauth2Client.getToken(code)
// oauth2Client.setCredentials(tokens);



// Probably dont need, not refreshing token:
    // oauth2Client.on('tokens', (tokens) => {
    //     if (tokens.refresh_token) {
    //       // store the refresh_token in my database!
    //       console.log(tokens.refresh_token);
    //     }
    //     console.log(tokens.access_token);
    //   });

    // oauth2Client.setCredentials({
    //     refresh_token: `STORED_REFRESH_TOKEN`
    //   });

module.exports = googleController;