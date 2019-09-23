class UserItem {
    /**
     * Constructor
     * @param itemCode
     * @param rating
     * @param madeIt

     */

     //Make it item - itemCode
    constructor(itemCode, rating , madeIt) {
        this._itemCode = itemCode;
        this._rating = rating;
        this._madeIt = madeIt;
    }


        /** Getters and Setters */

        get itemCode() {
            return this._itemCode;
        }

        set itemCode(value) {
            this._itemCode= value;
        }

        get rating() {
            return this._rating;
        }

        set rating(value) {
            this._rating = value;
        }

        get madeIt() {
            return this._madeIt;
        }

        set madeIt(value) {
            this._madeIt = value;
        }
    }

module.exports = UserItem;
