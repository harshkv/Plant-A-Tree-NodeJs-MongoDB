class UserProfile {
    /**
     * Constructor
     * @param userID
     * @param userItem
     * @param userItems
     */


    constructor(userID) {
      // var ItemDB = require('../utility/itemDb');
      // var UserItem = require('./../models/UserItem');
        // var item = itemDb.getItem(1);
        // var userItemInstance = new UserItem(item,0,false);
        // this._userID = userID;
        // var item1 = itemDb.getItem(1);
        this._userItems = [];
        // this._userItems.push(userItemInstance);


    }

    /** Getters and Setters */

    get userID() {
        return this._userID;
    }

    set userID(value) {
        this._userID = value;
    }

    get userItem() {
        return this._userItem;
    }

    set userItem(value) {
        this._userItem = value;
    }



    /** Funtions */
     addItem(item){
      var duplicate = false;
      for(let i=0; i<this._userItems.length; i++){
        if (item._item._itemCode == this._userItems[i]._item._itemCode) {
          console.log("item already present in myitems page")
          duplicate = true;
          break;
        }
      }
      if(!duplicate){
        this._userItems.push(item);
      }
    }

     removeItem(itemCode){
       let deleteIndex;
       for (var i = 0; i < this._userItems.length; i++) {
         if (this._userItems[i]._item._itemCode == itemCode ) {
           deleteIndex = i;
         }
       }
        this._userItems.splice(deleteIndex, 1);
        }

     updateRating(newRating,itemCode){
      for (var i = 0; i < this._userItems.length; i++) {
        if (this._userItems[i]._item._itemCode == itemCode ) {
          this._userItems[i]._rating = newRating;

        }
      }
    }

    updateMadeit(newmadeit,itemCode){
     for (var i = 0; i < this._userItems.length; i++) {
       if (this._userItems[i]._item._itemCode == itemCode ) {
         this._userItems[i]._madeIt = newmadeit;
       }
     }
   }
     getItems(){
      return this._userItems;
    }

     emptyProfile(request){
       request.session.destroy();
    }
  }

module.exports = UserProfile;
