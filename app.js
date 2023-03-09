// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// default value for title local
const capitalize = require('./utils/capitalize');
const projectName = 'm2-project';

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

//create this to show the images
app.use(express.static('public/images'));
app.set('view engine', 'hbs');

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

const registerRoute = require('./routes/register.route');
app.use('/', registerRoute);

const userRoute = require('./routes/user.route');
app.use('/', userRoute);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

/*
- Register view
GET route ==> to display the register form to users
router.get("/register", isLoggedOut, (req, res) => res.render("register"));
- Populate seeds.js 
   -Data that we want:
     

*/
