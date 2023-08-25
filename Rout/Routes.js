require('dotenv').config();

const express = require('express');
const Routes = express.Router();
const AuthenUser = require('../Middleware/AuthenUser');

const Reg = require('../RoutPaths/Reg');
const SendOtp = require('../RoutPaths/SendOtp');
const LoginMe = require('../RoutPaths/LoginMe');
const AmILogged = require('../RoutPaths/AmILogged');
const MyData = require('../RoutPaths/MyData');
const ChangeUserData = require('../RoutPaths/ChangeUserData');
const LogOut = require('../RoutPaths/LogOut');
const DeleteId = require('../RoutPaths/DeleteId');


// Registering 
Routes.post('/registration', 
Reg 
)

//Verify Otp
Routes.post('/sendOtp',
SendOtp 
)

//Login 
Routes.post('/login',
LoginMe 
)

//Checking if lcoalstorage token actually is still at token database cause sometime even after log out token may be there
Routes.get('/amILogged/:token',
AmILogged 
)


//getting own user Data
Routes.get('/getMyIdData/:usersl', 
AuthenUser, 
MyData)


// change user profile
Routes.post('/changethisid/:usersl', 
AuthenUser, 
ChangeUserData 
)

//Logout Me and add my last logout time when
Routes.get('/logout/:usersl', 
AuthenUser, 
LogOut 
)


// Routes Delete Id Permanently
Routes.get('/deleteId/:usersl', 
AuthenUser, 
DeleteId 
)




module.exports = Routes;