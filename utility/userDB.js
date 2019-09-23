class UserDB {

  /**
    * @param userdbModel
    */

  constructor() {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/bonsai', { useNewUrlParser: true });
    var userSchema = new mongoose.Schema({
      UserID: Number,
      FirstName:String,
      LastName:String,
      EmailAddress:String,
      Password:String,
      Address:String,
      City:String,
      State:String,
      ZipCode:Number,
      Country:String,
      user_item: [{
        itemCode:Number,
        rating:Number,
        madeIt:String,
        catalogCategory:String,
        itemName:String
      }]
      });
      this.userdbModel = mongoose.model('User', userSchema, 'users');

    }

    getAllUsers(db){
      return new Promise((resolve, reject) => {
        db.find({}).then(data => {
          resolve(data);
        }).catch(err => { return reject(err); })
      });
    }   //end getAllUsers

    getUser(db, userID) {
    return new Promise((resolve, reject) => {
      db.find({
        $and: [{'UserID':userID }]
      }).then(data => {
        resolve(data);
      }).catch(err => {
        return reject(err);
      })
    });
    }//end getUser

    addUserItem(db, userId,firstName,lastName,email,pwd,address,city,state,zip,country,userItem) {
    return new Promise((resolve, reject) => {
      db.findOneAndUpdate({ $and: [{'UserID': userId }] },
      { $set: {'UserID':userId,'FirstName':firstName,'LastName':lastName,
              'EmailAddress':email,'Password':pwd,'Address':address,'City':city,
              'State':state,'ZipCode':zip,'Country':country,'user_item':userItem }
      },
      { new: true, upsert: true }, function (err, data) {
          resolve(data);
        }).catch(erro => { return reject(err); });
    }
    )
  }  // end addUserItem

  addItemRating(db, userId,firstName,lastName,email,pwd,address,city,state,zip,country,userItem) {
  return new Promise((resolve, reject) => {
    db.findOneAndUpdate({ $and: [{'UserID': userId }] },
    { $set: {'UserID':userId,'FirstName':firstName,'LastName':lastName,
            'EmailAddress':email,'Password':pwd,'Address':address,'City':city,
            'State':state,'ZipCode':zip,'Country':country,'user_item':userItem }
    },
    { new: true, upsert: true }, function (err, data) {
        resolve(data);
      }).catch(erro => { return reject(err); });
  }
  )
} //end addItemRating

  addMadeIt(db, userId,firstName,lastName,email,pwd,address,city,state,zip,country,userItem) {
  return new Promise((resolve, reject) => {
    db.findOneAndUpdate({ $and: [{'UserID': userId }] },
    { $set: {'UserID':userId,'FirstName':firstName,'LastName':lastName,
            'EmailAddress':email,'Password':pwd,'Address':address,'City':city,
            'State':state,'ZipCode':zip,'Country':country,'user_item':userItem }
    },
    { new: true, upsert: true }, function (err, data) {
        resolve(data);
      }).catch(erro => { return reject(err); });
  }
  )
}//end addMadeIt


 DeleteUserItem(db, userId,firstName,lastName,email,pwd,address,city,state,zip,country,userItem) {
return new Promise((resolve, reject) => {
  db.findOneAndUpdate({ $and: [{'UserID': userId }] },
  { $set: {'UserID':userId,'FirstName':firstName,'LastName':lastName,
          'EmailAddress':email,'Password':pwd,'Address':address,'City':city,
          'State':state,'ZipCode':zip,'Country':country,'user_item':userItem }
  },
  { new: true, upsert: true }, function (err, data) {
      resolve(data);
    }).catch(erro => { return reject(err); });
}
)
}  // end DeleteUserItem


  getUserItems(db, userID) {
  return new Promise((resolve, reject) => {
    db.find({
      $and: [{'UserID':userID }]
    }).lean().then(data => {
     console.log("get user items: ",data[0].user_item);
      resolve(data[0].user_item);
    }).catch(err => {
      return reject(err);
    })
  });
}

  checkDuplicate(itemcode, allItems){
    var flag = false;
    if(allItems.length === undefined || allItems.length == 0 ){
      return flag;
    }
    else{
      for(let c=0; c < allItems.length ; c++ ){
        if(allItems[c].itemCode == itemcode){
          flag = true;
        }
      }
    }
  return flag
  }


  emptyProfile(request){
    request.session.destroy();
 }






}
module.exports = UserDB;
