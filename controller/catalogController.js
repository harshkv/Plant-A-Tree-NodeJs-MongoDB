var express = require('express');
var router = express.Router();
var ItemDB = require('../utility/itemDb');
var mongoose = require('mongoose');
var theUser = require('./../models/user');
var userDB = require('../utility/userDB');
var items;
let itemData = new ItemDB();
var ItemModelDB = itemData.ItemModelDB;
var categories = itemData.getCategories();
var UserID = 1;

router.get('/',async function(request, response, next) {
  items = await itemData.getAllItems(ItemModelDB);
  if(request.session.theUser){
    response.render('index',{userdata:request.session.theUser});
  }else{
    response.render('index',{userdata:""});
  }
});

router.get('/categories',async function(request, response, next) {
  items = await itemData.getAllItems(ItemModelDB);
  var data= {
    categories: categories,
    items: items}
    if(request.session.theUser){
      response.render('categories',{data:data , userdata:request.session.theUser});    }
      else{
        console.log("items :",items);
        response.render('categories',{data:data , userdata:""});    }
      });


router.get('/categories/item/:itemCode', async function(request, response, next) {
        var itemCode = request.params.itemCode;
        var item = await itemData.checkItem(ItemModelDB,itemCode)
        if(item[0] === undefined){
          var data= {
            categories: categories,
            items: items  }
          if(request.session.theUser){
            response.render('categories',{data:data, userdata:request.session.theUser});
          }
          else{
            response.render('categories',{data:data, userdata:""});
          }

        }
        else{
          var data= {
            item: item[0] }
          if(request.session.theUser){
            response.render('item',{data:data,userdata:request.session.theUser});
          }
          else{
            response.render('item',{data:data, userdata:""});
          }
        }
});

router.get('/about',function(req, res, next) {
        if(req.session.theUser){
          res.render('about',{userdata:req.session.theUser});
        }else{
          res.render('about',{userdata:""});
        }
});


router.get('/contact',function(req, res, next) {
        if(req.session.theUser){
          res.render('contact',{userdata:req.session.theUser});
        }else{
          res.render('contact',{userdata:""});
        }
});

module.exports = router ;
module.exports.itemData = itemData ;
