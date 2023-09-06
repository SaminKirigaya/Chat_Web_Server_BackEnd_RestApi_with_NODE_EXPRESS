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
const ChangeAvatar = require('../RoutPaths/ChangeAvatar');
const SearchedUser = require('../RoutPaths/SearchedUser');
const SendReq = require('../RoutPaths/SendReq');
const GettingAllReq = require('../RoutPaths/GettingAllReq');
const AcceptThisReq = require('../RoutPaths/AcceptThisReq');
const AllMyFriends = require('../RoutPaths/AllMyFriends');
const UnfriendHim = require('../RoutPaths/UnfriendHim');
const GetUserName = require('../RoutPaths/GetUserName');
const GetConv = require('../RoutPaths/GetConv');
const GetNotis = require('../RoutPaths/GetNotis');
const DelThisNoti = require('../RoutPaths/DelThisNoti');
const GetTotalNumbers = require('../RoutPaths/GetTotalNumbers');
const ThreeGuys = require('../RoutPaths/ThreeGuys');
const setmeinMSGbox = require('../RoutPaths/setmeinMSGbox');
const setmeoutMSGbox = require('../RoutPaths/setmeoutMSGbox');
const ForgotMyPass = require('../RoutPaths/ForgotMyPass')
const CreateGroup = require('../RoutPaths/CreateGroup');
const GetMyOwnGroups = require('../RoutPaths/GetMyOwnGroups');
const DelThisGroup = require ('../RoutPaths/DelThisGroup');
const GetAvailFriends = require('../RoutPaths/GetAvailFriends');
const AddEmToGroup = require('../RoutPaths/AddEmToGroup');
const ShowMemberGroups = require('../RoutPaths/ShowMemberGroups');
const LeaveMeFromHere = require('../RoutPaths/LeaveMeFromHere');
const GetOldGroupConv = require('../RoutPaths/GetOldGroupConv');
const CheckIfMeAdmin = require('../RoutPaths/CheckIfMeAdmin');
const kikEm = require('../RoutPaths/kikEm');



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

// Routes change avatar
Routes.post('/changeAvatar/:usersl', 
AuthenUser, 
ChangeAvatar 
)


//get searched user 
Routes.post('/searchthisuser/:usersl', 
AuthenUser, 
SearchedUser 
)

// send req 
Routes.post('/addFriend/:usersl', 
AuthenUser, 
SendReq 
)

//Seeing all request in screen of user
Routes.post('/allMyRequests/:usersl', 
AuthenUser, 
GettingAllReq
)

// Accept Specific Req 
Routes.post('/acceptThisReq/:usersl', 
AuthenUser, 
AcceptThisReq
)


// Getting All Friends Data 
Routes.get('/allMyFriends/:usersl', 
AuthenUser, 
AllMyFriends 
)

// unfriend this ddue 
Routes.post('/unfriendHim/:usersl', 
AuthenUser, 
UnfriendHim 
)


//get username 
Routes.get('/getmyusername/:usersl', 
AuthenUser, 
GetUserName 
)

// get old conversation 
Routes.post('/getmyoldconv/:usersl', 
AuthenUser, 
GetConv 
)

// get all notis 
Routes.get('/getNoti/:usersl', 
AuthenUser, 
GetNotis 
)


// del specific notif
Routes.post('/delthisNoti/:usersl', 
AuthenUser, 
DelThisNoti 
)

// Get Total amount notif 
Routes.get('/getTotalNotiAmount/:usersl', 
AuthenUser, 
GetTotalNumbers 
)

// Last three guy data
Routes.get('/getLastThree/:usersl', 
AuthenUser, 
ThreeGuys 
)


// set me im in msg box 
Routes.get('/setmeinmsgbox/:usersl', 
AuthenUser, 
setmeinMSGbox 
)


// set me out of msg box 
Routes.get('/setmeoutmsgbox/:usersl', 
AuthenUser, 
setmeoutMSGbox 
)

// i forgot pass :...
Routes.post('/changePass', 
ForgotMyPass 
)


// Create group 
Routes.post('/makeGroupAdmin/:usersl', 
AuthenUser, 
CreateGroup 
)

// Get all own groups 
Routes.get('/getMyCreatedGroups/:usersl', 
AuthenUser, 
GetMyOwnGroups 
)

// Delete this group 
Routes.post('/delThisGroup/:usersl', 
AuthenUser, 
DelThisGroup 
)


// Get Friend Data to add in group 
Routes.post('/getavailFriendsForGroup/:usersl', 
AuthenUser,
GetAvailFriends 
)


// Add this guy perm in my group
Routes.post('/addThisGuyGroup/:usersl', 
AuthenUser, 
AddEmToGroup
)


// Show member their groups
Routes.get('/getMyJoinedGroups/:usersl', 
AuthenUser, 
ShowMemberGroups 
)

// Leave this group if im not admin
Routes.post('/leaveThisGroup/:usersl', 
AuthenUser,
LeaveMeFromHere
)

// Get Old Convs 
Routes.post('/getmyoldGroupconv/:usersl',
AuthenUser, 
GetOldGroupConv 
)


// check if i am an admin
Routes.post('/amIGroupAdmin/:usersl', 
AuthenUser, 
CheckIfMeAdmin
)


// kik em
Routes.post('/kickThisGuy/:usersl', 
AuthenUser, 
kikEm 
)

module.exports = Routes;