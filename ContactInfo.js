class ContactInfo{
    static ID=1;
    constructor(city,areaName){
       this.ID=ContactInfo.ID++;
       this.city=city;
       this.areaName=areaName;
    }

    updateContactInfo(parameter, value) {
        switch (parameter) {
            case "city":
                this.city = value
                return this;
            case "areaName":
                this.areaName =value
                return this;
            default:
                return "Invalid Parameter!"
        }
    }

}

module.exports = ContactInfo