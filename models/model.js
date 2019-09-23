class Item {
    /**
     * Constructor
     * @param itemCode
     * @param itemName
     * @param catalogCategory
     * @param author
     * @param description
     * @param temperature
     * @param watering
     * @param fertilized
     * @param training
     * @param rating
     * @param imageURL
     * @param UserID
     */
    constructor(itemCode, itemName, catalogCategory,description, temperature, watering, fertilized , training, rating, imageURL,UserID ) {
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._catalogCategory = catalogCategory;
        this._description = description;
        this._temperature = temperature;
        this._watering = watering;
        this._fertilized = fertilized;
        this._training =training;
        this._rating = rating;
        this._imageURL = imageURL;
        this._UserID = UserID;
    }


    /** Getters and Setters */

    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get catalogCategory() {
        return this._catalogCategory;
    }

    set catalogCategory(value) {
        this._catalogCategory = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get watering(){
      return this._watering;
    }

    set watering(water){
      this._watering = water
    }
    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value;
    }

    get imageURL() {
        return this._imageURL;
    }

    set imageURL(value) {
        this._imageURL = value;
    }
    get temperature(){
      return this._temperature
    }

    set temperature(temp){
      this._temperature = temp;
    }

    get fertilized(){
      return this._fertilized
    }
    set fertilized(fertilize){
      this._fertilized = fertilize;
    }
    get training(){
      return this._training
    }
    set training(train){
      this._training = train;
    }


    get UserID() {
        return this._UserID;
    }

    set UserID(value) {
        this._UserID = value;
    }

}

module.exports = Item;
