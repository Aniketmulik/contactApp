const ContactInfo=require("./ContactInfo")

class Contact{
    static ID=1;
    constructor(contactName,country){
        this.ID=Contact.ID++;
        this.contactName=contactName;
        this.country=country;
        this.contactInfos=[];
    }

    updateContact(parameter, updatedValue) {
        switch (parameter) {
            case "contactName":
                if (typeof updatedValue !== 'string') {
                    return "Invalid new contact name";
                }
                this.contactName = updatedValue;
                return this;
            case "country":
                if (typeof updatedValue !== 'string') {
                    return "Invalid new country name";
                }
                this.country = updatedValue;
                return this;
            default:
                return "Invalid Parameter!";
        }
    }

    

    createContactInfo(city,areaName){
        let contactInfoObj=new ContactInfo(city,areaName);
        this.contactInfos.push(contactInfoObj)
        return contactInfoObj;
    }

    getContactInfo(){
        return this.contactInfos
    }

    findContactInfo(contactID){
        for(let index=0;index<this.contactInfos.length;index++){
            if(this.contactInfos[index].ID==contactID){
                return [index,true];
            }
        }
        return [-1,false];
    }
    
    getContactInfoByID(contactID){
        let [indexOfContactInfo, isContactInfo]=this.findContactInfo(contactID);
        if(!isContactInfo){
          return "Contact info not found. Contact info does not exist";
        }
        return this.contactInfos[indexOfContactInfo];
    }
    
    updateContactInfo(contactInfoID,parameter,value){
        let[indexOfContact,isContactInfo]=this.findContactInfo(contactInfoID)
        if(!isContactInfo){
          return "Contact info not found. Contact info does not exist";
        }
        return this.contactInfos[indexOfContact].updateContactInfo(parameter,value)
    }

    deleteContactInfo(contactID){ 
        let[indexOfContact, isContactInfo]=this.findContactInfo(contactID)
        if(!isContactInfo){
          return "Contact info not found. Contact info does not exist";
        }
        this.contactInfos.splice(indexOfContact,1)
        return Contact.contactInfos
    }

  
}

module.exports = Contact