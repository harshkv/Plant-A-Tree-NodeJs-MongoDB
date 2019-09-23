class User {
    /**
     * Constructor
     * @param UserID
     * @param FirstName
     * @param LastName
     * @param EmailAddress
     * @param Password
     * @param Address
     * @param City
     * @param State
     * @param ZipCode
     * @param Country
     */
    constructor(UserID, FirstName , LastName, EmailAddress , Password ,Address, City, State, ZipCode , Country) {
        this._UserID = UserID;
        this._FirstName = FirstName;
        this._LastName = LastName;
        this._EmailAddress = EmailAddress;
        this._Password = Password;
        this._Address = Address;
        this._City = City;
        this._State = State;
        this._ZipCode = ZipCode;
        this._Country = Country;

    }


        /** Getters and Setters */

        get UserID() {
            return this._UserID;
        }

        set UserID(value) {
            this._UserID = value;
        }

        get FirstName() {
            return this._FirstName;
        }

        set FirstName(value) {
            this._FirstName = value;
        }

        get LastName() {
            return this._LastName;
        }

        set LastName(value) {
            this._LastName = value;
        }

        get EmailAddress() {
            return this._EmailAddress;
        }

        set EmailAddress(value) {
            this._EmailAddress = value;
        }

        get Password() {
            return this._Password;
        }

        set Password(value) {
            this._Password = value;
        }

        get Address(){
          return this._Address;
        }

        set Address(add){
          this._Address = add;
        }
        get City() {
            return this._City;
        }

        set City(value) {
            this._City = value;
        }

        get State() {
            return this._State;
        }

        set State(value) {
            this._State = value;
        }
        get ZipCode(){
          return this._ZipCode;
        }

        set ZipCode(zip){
          this._ZipCode = zip;
        }

        get Country(){
          return this._Country;
        }
        set Country(Ctry){
          this._Country = Ctry;
        }

    };

module.exports = User;
