var express = require('express');
var session = require('express-session');
var app = express();
// var mongoose = require('mongoose');
app.listen(8080);
console.log('Listening to port 8080')
app.set('view engine', 'ejs');
app.use('/css', express.static('./css'));
app.use('/Images', express.static('./Images'));
// var mongoose = require('mongoose');
app.use(session({secret: 'personname'}));
var catalogController = require('./controller/catalogController.js');
var profileController = require('./controller/profileController.js');

app.use('/',catalogController);
app.use('/profileController',profileController);
app.use('/categories',catalogController);
app.use('/about',catalogController);
app.use('/contact',catalogController);
app.use('/profileController/signin',profileController);
app.use('/categories/item/:itemCode',catalogController);
app.use('/profileController/myitems',profileController);
app.use('/profileController/save/:itemCode',profileController);
app.use('/profileController/deleteItem/:itemCode',profileController);
app.use('/profileController/feedback/:itemCode',catalogController);
app.use('/profileController/updateRating/:itemCode',profileController);
app.use('/profileController/signout',profileController);
// app.use('/profileController/signin',profileController);
app.use('/profileController/updateMadeit/:itemCode',profileController);



module.exports =app;
