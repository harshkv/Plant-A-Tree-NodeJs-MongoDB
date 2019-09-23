class ItemDB {

/**
  * @param category
  * @param ItemModelDB
  */


  constructor() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/bonsai', { useNewUrlParser: true });
    this.category = ["Indoor Bonsai", "Outdoor Bonsai"];
    var itemSchema = new mongoose.Schema({
     itemCode:Number,
     itemName:String,
     catalogCategory: String,
     description:String,
     temperature:String,
     watering:String,
     fertilized:String,
     training:String,
     rating:Number,
     imageURL:String,
     UserID:Number
    });
    this.ItemModelDB = mongoose.model('Item', itemSchema, 'items');
  }

    getAllItems(db) {
      return new Promise((resolve, reject) => {
        db.find({}).then(data => {
          resolve(data);
        }).catch(err => { return reject(err); })
      });
    }   // end  getAllItems

    getItem(db, itemCode) {
    return new Promise((resolve, reject) => {
      db.find({
        $and: [{'itemCode':itemCode }]
      }).then(data => {
        resolve(data);
      }).catch(err => {
        return reject(err);
      })
    });
    }//end getItem

  checkItem (db, itemCode) {
      return new Promise((resolve, reject) => {
        db.find({
          $and: [{'itemCode':itemCode }]
        }).then(data => {
          resolve(data);
        }).catch(err => {
          return reject(err);
        })
      });
    }//end checkItem

    getCategories () {
      return this.category;
    }


}
module.exports = ItemDB;
