const express = require('express');

const googleClientId = '286216419697-fiuupsg66161d7aqejg16h3qv088mn5j.apps.googleusercontent.com';
const googleClientSecret = '1_cksPHcJJ_XWTDjFuE1XAV5';
const googleScopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];
const reDirectUrl = 'http://localhost:8080';
const { google } = require('googleapis');

// google.options({
//     // All requests from all services will contain the above query parameter
//     // unless overridden either in a service client or in individual API calls.
//     params: {
//       quotaUser: 'user123@example.com'
//     }
//   });
const queryString = require('query-string');

const { User } = require('../models/Models');
// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const googleController = {};

googleController.session = async (req, res, next) => {
    console.log('req.session.userID', req.session.userId);
    const user = await User.findOne({username:  req.session.userId})
    res.locals.user = user;
    return next();
}





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



// googleController.accessQueryString = (req,res,next) => {
//     try {
//         // const { code } = await req.query;
//         // const urlParams = new URLSearchParams();
//         // console.log('windowlocation',window.location)
//         // console.log('urlParams: ', code)
//         console.log('oauth2Client,', oauth2Client);
//         // console.log('location.search: ', location.search)
//         return next();
//     }catch (error) {
//         console.log(error);
//         return next();
//     }
// }

// all this does it redirect user to login page
googleController.login = (req, res, next) => {
    try{
        // params is empty object
        // query is empty object UNTIL user signs in, query gains properties of  :
            // code, scope, authuser, and prompt
        console.log('inside getController.login:')
        // console.log('req.query: ', req.query)
        const { code } = req.query.code;
        // console.log('res.query.code',req.query.code)
        res.locals.code = code;
        // console.log('res.locals.code',res.locals.code)
        res.redirect(url);
        return next();
    }catch (err){
        console.log(req.body);
        res.status(400).json({ message: err.message });
        return next();
    }
}

// // generates authorization code
googleController.getCode = (req, res, next) => {
    try {
        // console.log('inside getController.retrieveToken: req.query', req.query.code
        console.log('inside of getCode:')
        console.log('req.query', req.query)
        const code = req.query.code;
        const token = oauth2Client.setCredentials(code);
        console.log('inside  of  getCode, req.query.code;', code)
        res.locals.code = code;
        return next();
    } catch (error) {
        console.log(req.body);
        res.status(400).json({ message: error.message });
        return next();
    }
}

// takes code, generates token
googleController.retrieveToken = (req, res, next) => {
    try {
        console.log('Inside retrieveToken controller now')
        // console.log('res.locals.code',res.locals.code)
        // console.log('inside getController.retrieveToken: req.query', req.query.code)
        const { tokens } = oauth2Client.getToken(res.locals.code)

        console.log('token is : ', tokens)
        oauth2Client.setCredentials(tokens);
        console.log('oauth2Client,', oauth2Client);
        console.log('oauth2Client,', oauth2Client.credentials);
        //darrens test
        res.locals.password = oauth2Client.credentials.id_token;
        // res.locals.username = oauth2Client.credentials.access_token;
        // console.log('credentials: ', oauth2Client.credentials)
        return next();
    } catch (error) {
        console.log(req.body);
        // res.status(400).json({ message: error.message });
        return next();
    }
}
// Now that  we have an access token, we can call google API

//we need a controller that strictly verifies if the user already exists in the database
googleController.verifyUser = async (req, res, next) => {
    const password = res.locals.password;
    const user = await User.findOne({password: password}).exec();
    // const randomUsername = password.substr(0,9);
    // console.log('randomUsername', randomUsername);
    console.log('inside verifyUser user  is  ', user);
    try {
        if(user) {
            // res.locals.user = user;
            // res.redirect('http://localhost:8080');
            return next();
        }else{
            // if user isnt found in database
            const newUser = await User.create({password: password});
            // res.locals.user = newUser;
            // res.redirect('http://localhost:8080');
            return next();
        }
    }catch(error){
        res.status(400).json({ message: error.message });
        return next();
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