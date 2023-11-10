const express = require('express');
const app = express();
const path = require('path');
// const bcrypt = require('bcrypt');

               // router \\
const login = require('./Routes/login');
//=== user===\\
const forgotUser = require('./Routes/user/forgot');
const repassUser = require('./Routes/user/repass');
const registerUser = require('./Routes/user/register');
const mainUser = require('./Routes/user/main');
const listUser = require('./Routes/user/list');
const messageUser = require('./Routes/user/message');
const profileUser = require('./Routes/user/profile');
const historyUser = require('./Routes/user/history');
const borrowUser = require('./Routes/user/borrow');

//=== aj ===\\
const mainAj = require('./Routes/aj/main');

//*add by palmmy*//

const borrowAj = require('./Routes/aj/borrow');
const historyAj = require('./Routes/aj/history');
const listAj = require('./Routes/aj/list');
const messageAj = require('./Routes/aj/message');
const profileAj = require('./Routes/aj/profile');

// //=== admin ===\\
const loginAdmin = require('./Routes/admin/login')
const mainAdmin = require('./Routes/admin/main')

// set public path
app.use("/public", express.static(path.join(__dirname, "public")));

// json exchange
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// loginUser
app.use(login) //user login

//===========user============\\
app.use('/user',forgotUser); //user forgot password
app.use('/user',repassUser); // user repassword
app.use('/user',registerUser); //user register
app.use('/user',mainUser) // main page
app.use('/user',listUser) // list page
app.use('/user',messageUser) // message page
app.use('/user',profileUser) // profile page
app.use('/user',historyUser) // history page
app.use('/user',borrowUser) // borrow page

//=============aj==========\\
app.use('/aj',mainAj);

//*****add by palmmy*//
app.use('/aj',historyAj);// 
app.use('/aj',messageAj);
app.use('/aj',profileAj);
app.use('/aj',borrowAj);
app.use('/aj',listAj);

// ============ admin ===========\\
app.use('/admin',loginAdmin);
app.use('/admin',mainAdmin)

// root file user
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "views/landing.html"));
});

// run server
const port = 7777;
app.listen(port, function () {
    console.log("Server is ready at ", port);
});