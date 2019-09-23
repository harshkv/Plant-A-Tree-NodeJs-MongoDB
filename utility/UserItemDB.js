class UserItem {
  /**
   * Constructor
   * @param itemCode
   * @param rating
   * @param madeIt
   * @param catalogCategory
   * @param itemName
   */


  constructor() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/homework', { useNewUrlParser: true });
    var UseritemSchema = new mongoose.Schema({
     itemCode:Number,
     itemName:String,
     catalogCategory: String,
     rating:Number,
     madeIt:String,
    });
    this.UserItemDB = mongoose.model('UserItem',UseritemSchema, 'userItem'); //<- StudentInfo is the collection name in the database
  }

    getAllItems(db) {
      return new Promise((resolve, reject) => {
        db.find({}).then(data => {
          // console.log("ixn find all " + data);
          resolve(data);
        }).catch(err => { return reject(err); })
      });
    }

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
    }//end itemcode

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
    }//end itemcode

    getCategories () {
      return this.category;
    }

}
module.exports = ItemDB;
