var express = require('express');
 var routers = express.Router();
 var ItemDB = require('../utility/itemDb');
 var userDB = require('../utility/userDB');
 var itemDataController = require('../controller/catalogController');
 var itemData = itemDataController.itemData;
 var ItemModelDB = itemDataController.itemData.ItemModelDB;
 var mongoose = require('mongoose');
 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false });
 var app = module.exports = express();
 var itemDb = require('../utility/itemDb');
 var UserItem = require('./../models/UserItem');
 var eachUser = require('./../models/user');
 var categories = itemData.getCategories();
 var userSavedItem;
 var allItems;

 let userData = new userDB();
 var userdbModel = userData.userdbModel;


 routers.get('/myitems',urlencodedParser,async function(request, response, next) {
     if(request.session.theUser){
     let data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
     userdata =request.session.theUser ;
     response.render('myitems',{saveData : data , userdata: request.session.theUser});
     }
   else {
     eachUser = await userData.getUser(userdbModel,1);
     console.log("user created: ",eachUser);
     request.session.theUser = eachUser[0];
      allItems = await itemData.getAllItems(ItemModelDB);
     let data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
     response.render('myitems',{saveData:data, userdata:request.session.theUser} );
     }
 });

 routers.get('/signin',urlencodedParser,async function(request, response , next){
    if(request.session.theUser){
      let data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
      response.render('myitems',{saveData : data , userdata: request.session.theUser});
    }
    else {
      eachUser = await userData.getUser(userdbModel,1);
      console.log("user created: ",eachUser);
      request.session.theUser = eachUser[0];
       allItems = await itemData.getAllItems(ItemModelDB);
      let data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
      response.render('myitems',{saveData:data, userdata:request.session.theUser} );
    }
 });

  routers.get('/save/:itemCode',urlencodedParser,async function(request, response, next) {
     var itemCode = request.params.itemCode;
     var itemFetched = await itemData.getItem(ItemModelDB,itemCode);

     if(request.session.theUser){
       saveItem(itemCode , itemFetched, response, request)
     }
     else
     {
        eachUser = await userData.getUser(userdbModel,1);
        request.session.theUser = eachUser[0];
        data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
        response.render('myitems',{saveData : data , userdata:request.session.theUser});

      }
    });

    async function saveItem(itemCode, itemFetched, response, request){
      console.log("itemFetched" ,itemFetched );
        console.log("itemFetched [0]" ,itemFetched[0] );
      if(itemFetched == [] || itemFetched[0] == undefined) {
        data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
        response.render('myitems',{saveData : data , userdata:request.session.theUser});

      }
      else {
      let allUserItems = await userData.getUserItems(userdbModel,eachUser[0].UserID);
      var flag = userData.checkDuplicate(itemCode ,allUserItems);
         if(flag == false)
         {
           // no duplicate found
            var userItemDict = {'itemCode':itemCode,'rating':0,'madeIt':"false",
                                'catalogCategory':itemFetched[0].catalogCategory,'itemName':itemFetched[0].itemName};
              if(allUserItems.length == []){
                          allUserItems = [userItemDict];
              }else{
                        allUserItems.push(userItemDict);
              }
             userSavedItem = await userData.addUserItem(userdbModel,eachUser[0].UserID,eachUser[0].FirstName,
                              eachUser[0].LastName,eachUser[0].EmailAddress,
                              eachUser[0].Password,eachUser[0].Address,eachUser[0].City,eachUser[0].State,
                              eachUser[0].ZipCode,eachUser[0].Country,allUserItems);
            data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
            response.render('myitems',{saveData : data , userdata:request.session.theUser});
        } // end if flag is false
        else
        {
            // duplicate found
            data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
            response.render('myitems',{saveData : data , userdata:request.session.theUser});

        }
      }
    };


    routers.post('/deleteItem/:itemCode',urlencodedParser,async function(request, response, next) {
      var itemCode = request.params.itemCode;
      let item =await itemData.checkItem(ItemModelDB,itemCode);
      if(item[0] === undefined){
        var  data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
        response.render('myitems',{saveData : data, userdata: request.session.theUser});
      }
      let allUserItems = await userData.getUserItems(userdbModel,eachUser[0].UserID);
      var checkitem = await userData.checkDuplicate(itemCode,allUserItems);
        if(checkitem == false){
          data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
          response.render('myitems',{saveData : data , userdata:request.session.theUser});
        }
        else {
          var deleteIndex = 0
          let userItemsArray = await userData.getUserItems(userdbModel,eachUser[0].UserID);
          for (var i = 0; i < userItemsArray.length; i++){
            if(userItemsArray[i].itemCode == itemCode){
              deleteIndex = i;
            }
          }
          userItemsArray.splice(deleteIndex, 1);
          userProfileObject = await userData.DeleteUserItem(userdbModel,eachUser[0].UserID,eachUser[0].FirstName,
                       eachUser[0].LastName,eachUser[0].EmailAddress,
                       eachUser[0].Password,eachUser[0].Address,eachUser[0].City,eachUser[0].State,
                       eachUser[0].ZipCode,eachUser[0].Country,userItemsArray);
        var data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
        response.render('myitems',{saveData : data, userdata:request.session.theUser});
      }
    });

    routers.post('/updateRating/:itemCode',urlencodedParser,async function(request, response, next) {
        var itemCode = request.params.itemCode;
        if(request.session.theUser){
          var item =await itemData.checkItem(ItemModelDB,itemCode);
          console.log("item[0] :", item[0]);

          if(item[0] === undefined){
            var  data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
          response.render('myitems',{saveData : data, userdata: request.session.theUser});
        }
        else {

          let userItemsArray = await userData.getUserItems(userdbModel,eachUser[0].UserID);
            for (var i = 0; i < userItemsArray.length; i++){
              if(userItemsArray[i].itemCode == itemCode){
                userItemsArray[i].rating = request.body.myList;
              }
            }
            userProfileObject = await userData.addItemRating(userdbModel,eachUser[0].UserID,eachUser[0].FirstName,
                           eachUser[0].LastName,eachUser[0].EmailAddress,
                           eachUser[0].Password,eachUser[0].Address,eachUser[0].City,eachUser[0].State,
                           eachUser[0].ZipCode,eachUser[0].Country,userItemsArray);
            request.session.userProfile = userProfileObject;
            var  data = await userData.getUserItems(userdbModel,eachUser[0].UserID);

            response.render('myitems',{saveData : data, userdata: request.session.theUser});
        }

          }

        else {

          var  data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
         response.render('myitems',{saveData : data, userdata: request.session.theUser});


        }
      });

       routers.post('/updateMadeit/:itemCode',urlencodedParser,async function(request, response, next) {
         var itemCode = request.params.itemCode;
         if(request.session.theUser){
           var item =await itemData.checkItem(ItemModelDB,itemCode);
           console.log("item[0] :", item[0]);

           if(item[0] === undefined){
             var  data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
             response.render('myitems',{saveData : data, userdata: request.session.theUser});
         }
         else {

           let userItemsArray = await userData.getUserItems(userdbModel,eachUser[0].UserID);
             for (var i = 0; i < userItemsArray.length; i++){
               if(userItemsArray[i].itemCode == itemCode){
                 userItemsArray[i].madeIt = request.body.madeitList;
               }
             }
             userProfileObject = await userData.addItemRating(userdbModel,eachUser[0].UserID,eachUser[0].FirstName,
                            eachUser[0].LastName,eachUser[0].EmailAddress,
                            eachUser[0].Password,eachUser[0].Address,eachUser[0].City,eachUser[0].State,
                            eachUser[0].ZipCode,eachUser[0].Country,userItemsArray);
             request.session.userProfile = userProfileObject;
             var  data = await userData.getUserItems(userdbModel,eachUser[0].UserID);

             response.render('myitems',{saveData : data, userdata: request.session.theUser});
         }

           }

         else {

           var  data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
          response.render('myitems',{saveData : data, userdata: request.session.theUser});


         }
       });


       routers.get('/feedback/:itemCode',async function(request, response, next) {
         var itemCode = request.params.itemCode;
         if(request.session.theUser){
           let allUserItems = await userData.getUserItems(userdbModel,eachUser[0].UserID);
           var gotItem = await userData.checkDuplicate(itemCode,allUserItems);
             if(gotItem == true){
               FeedBackItem(itemCode , response ,request);
             }else{
               data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
               response.render('myitems',{saveData : data , userdata:request.session.theUser});
             }

         }else{
           eachUser = await userData.getUser(userdbModel,1);
           console.log("user created from items page: ",eachUser);
           request.session.theUser = eachUser[0];
           // FeedBackItem(itemCode , response ,request);
           data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
           response.render('myitems',{saveData : data , userdata:request.session.theUser});


         }
   });


       routers.post('/feedback/:itemCode',async function(request, response, next) {
         var itemCode = request.params.itemCode;
         if(request.session.theUser){

           FeedBackItem(itemCode , response ,request);

         }else{
           eachUser = await userData.getUser(userdbModel,1);
           console.log("user created from items page: ",eachUser);
           request.session.theUser = eachUser[0];
           // FeedBackItem(itemCode , response ,request);
           data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
           response.render('myitems',{saveData : data , userdata:request.session.theUser});

     }
       });


       async function FeedBackItem(itemCode, response, request){
         var item =await itemData.getItem(ItemModelDB,itemCode);
         let userItemsArray = await userData.getUserItems(userdbModel,eachUser[0].UserID);
         var rating = 0;
         var madeIt = "false";
         for (var i = 0; i < userItemsArray.length; i++){
           if(userItemsArray[i].itemCode == itemCode){
             rating = userItemsArray[i].rating;
             madeIt = userItemsArray[i].madeIt;
           }
         }
         if(item[0] === undefined){
           var  data = await userData.getUserItems(userdbModel,eachUser[0].UserID);
           response.render('myitems',{saveData : data, userdata: request.session.theUser});
       }
       else {
        var data= {
            item: item[0],
            rating:rating,
            madeIt:madeIt
        }
         response.render('feedback',{data:data, userdata:request.session.theUser });
       }

   }

    routers.get('/signout',async function(request,response,next) {
      if(request.session.theUser){
      userData.emptyProfile(request);
      response.render('index',{userdata : ""});
    }
    else {
        response.render('index',{userdata : ""});
    }
    });

    module.exports = routers ;
    module.exports.userData = userData;
