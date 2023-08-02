const Contact = require("./Contact.js")
class User{
  static allUsers=[];
  static ID=0;
  constructor(fullName,isAdmin,gender,age){
    this.ID=User.ID++
    this.fullName=fullName;
    this.isAdmin=isAdmin;
    this.gender=gender;
    this.age=age;
    this.contacts=[];
  }

  static createAdmin(fullName,gender,age){
    if(typeof fullName != "string"){
      return "invalid full name";
    }
    if(typeof gender != "string" && (gender !="M" && gender !="F")){
      return "invalid gender";
    }
    if(typeof age != "number"){
      return "invalid age";
    }
    return new User(fullName,true,gender,age)
  }
  
  createUser(fullName,gender,age){
  if(typeof fullName != "string"){
    return "invalid full name";
  }
  if(typeof gender != "string" && (gender !="M" && gender !="F")){
    return "invalid gender";
  }
  if(typeof age != "number"){
    return "invalid age";
  }
  if(!this.isAdmin){
    return "only admin can create user";
  }
  let userObj=new User(fullName,false,gender,age)
  User.allUsers.push(userObj);
  return userObj;
}

static findUser(ID){
  for(let index=0;index<User.allUsers.length;index++){
    if(User.allUsers[index].ID==ID){
      return [index,true];
    }
  }
  return [-1,false];
}

  updateUser(ID,parameter,updatedValue){
    if(typeof ID !="number"){
      return "invalid ID";
    }
    if(!this.isAdmin){
      return "only admin can update user"
    }
    let[ indexOfUser , isUserExist]=User.findUser(ID);
    if(!isUserExist){
      return "no user exist";
    }
    switch(parameter){
      case "fullName" :  User.allUsers[indexOfUser].fullName=updatedValue;
      return User.allUsers[indexOfUser];
      case "gender" :  User.allUsers[indexOfUser].gender=updatedValue;
      return User.allUsers[indexOfUser];
      case "age" :  User.allUsers[indexOfUser].age=updatedValue;
      return User.allUsers[indexOfUser];
      default : return "invalid parameter";
    }

  }

  deleteUser(ID){
    if(!this.isAdmin){
        return "Only admin can delete user!";
    }
    if(typeof ID!='number'){
        return "Invalid ID passed!"
       }

    let [indexOfUser, isUserExist]=User.findUser(ID);
    if(!isUserExist){
        return "No user found";
    }
    User.allUsers.splice(indexOfUser,1);
    return User.allUsers;
}

getAllUsers(){
  if(!this.isAdmin){
      return "Only admin can create new user!";
  }
  return User.allUsers;
}


getUserByID(ID){
  if(!this.isAdmin){
      return "Only admin can get user by ID!";
  }
  if(typeof ID!='number'){
      return "Invalid ID"
  }
  let [indexOfUser, isUserExist]=User.findUser(ID);
  if(!isUserExist){
      return "No user found";
  }
  return User.allUsers[indexOfUser];
}

createContact(contactName,country){
  if(this.isAdmin){
      return "Only user can create new contact!";
  }
  let contactObj=new Contact(contactName,country);
  this.contacts.push(contactObj);
  return contactObj;

}

findContact(contactID){
  for(let index=0;index<this.contacts.length;index++){
      if(this.contacts[index].ID==contactID){
          return [index,true];
      }
  }
  return [-1,false];
}


updateContact(contactID, parameter, updatedValue){
  if(this.isAdmin){
      return "Only user can update contact!";
  }
  if(typeof contactID!='number'){
      return "Invalid contactID"
  }

  let [indexOfContact, isContactExist]=this.findContact(contactID);
  if(!isContactExist){
      return "Contact does not exist";
  }
  return this.contacts[indexOfContact].updateContact(parameter,updatedValue);
}

deleteContact(contactID){
  if(this.isAdmin){
      return "Only user can update contact!";
  }
  if(typeof contactID!='number'){
      return "Invalid contactID passed!";
  }
  let[indexOfContact, isContact]=this.findContact(contactID);
  if(!isContact){
      return "No contact found. Contact does not exist";
  }
  this.contacts.splice(indexOfContact,1);
  return User.contacts;
}

getAllContacts(){
  if(this.isAdmin){
      return "Only user can get all contacts!";
  }
  return this.contacts;
}

getContactByID(contactID){
  if(this.isAdmin){
      return "Only user can get contact by ID!";
  }
  if(typeof contactID!='number'){
      return "Invalid ID passed!"
  }
  let [indexOfContact, isContact]=this.findContact(contactID);
  if(!isContact){
      return "No contact found";
  }
  return this.contacts[indexOfContact];
}

createContactInfo(contactID,city,areaName){
  if(this.isAdmin){
      return "Only user can update contact!";
  }
  if(typeof city!='string'){
      return "Invalid city info!";
  }
  if(typeof areaName!='string'){
      return "Invalid area name info!";
  }
  let[indexOfContact,isContactExist]=this.findContact(contactID);
  if(!isContactExist){
    return "Contact not found. Contact does not exist";
  }
  //let contactInfoObj=new ContactInfo(typeOfContactInfo,valueOfContactInfo);
  //this.contacts[indexOfUser].contactInfos.push(contactInfoObj);
  //return contactInfoObj;

  return this.contacts[indexOfContact].createContactInfo(city,areaName);  
}

updateContactInfo(contactID,contactInfoID,parameter,value){
  let[indexOfContact,isContact]=this.findContact(contactID)
  if(!isContact){
    return "Contact not found. Contact does not exist";
  }
  return this.contacts[indexOfContact].updateContactInfo(contactInfoID,parameter,value)
}

deleteContactInfo(contactID){
  if(this.isAdmin){
      return "Only user can delete contact!"
  }
  if(typeof contactID!='number'){
      return "Invalid contactID passed!"
  }
  let[indexOfContact, isContact]=this.findContact(contactID)
  if(!isContact){
    return "Contact not found. Contact does not exist";
  }
  return this.contacts[indexOfContact].deleteContactInfo(contactID)
}

getContactInfo(contactID){
  if(this.isAdmin){
      return "Only user can get contact information";
  }
  let[indexOfContact,isContact]=this.findContact(contactID);
  if(!isContact){return "Contact not found. Contact does not exist";}
  return this.contacts[indexOfContact].getContactInfo();
}

getContactInfoByID(contactID){
  if(this.isAdmin){
      return "Only user can get contact by ID!";
  }
  if(typeof contactID!='number'){
      return "Invalid ID passed!"
  }
  let[indexOfContact,isContact]=this.findContact(contactID);
  if(!isContact){return "Contact not found. Contact does not exist";}
  return this.contacts[indexOfContact].getContactInfoByID(contactID);
}


}
//created admin
let admin=User.createAdmin("Aniket","M",22);
//console.log(admin);

// created user,contact and contact information
let user1 =admin.createUser("pavan","M",25);
user1.createContact("shubham","India");
user1.createContactInfo(1,"Navi Mumbai","ghansoli");
console.log(user1);

let user2 =admin.createUser("hritik","M",23)
user2.createContact("ramdas","ind")
user2.createContactInfo(2,"Navi Mumbai","ghansoli");
console.log(user2);


//user1.updateContactInfo(1,1,"city","thane")
//console.log(user1.contacts[0].getContactInfo());
//console.log(getAllUsers());
//user1.deleteContactInfo(1)

//console.log(admin.getUserByID(2));
//console.log(user1.getContactByID(1));
//console.log(user1.getContactInfoByID(1));

//updated value
//console.log(admin.updateUser(1,"gender","F"));
//console.log(user1);
//admin.deleteUser(2);
//console.log(User.allUsers);


//console.log("***********************************************************************************************************");
//admin.deleteUser(2);
//console.log(User.allUsers); 

//let User1=admin.deleteUser(1);
//console.log(user1);
//user1.deleteUser(1)
//console.log(user1);
//console.log(User);


//updated contact 
//user1.updateContact(1,"country","Aus")
//console.log(user1);
//user2.updateContact(2,"country","ban")
//console.log(user2);

//deleted contact
//user1.deleteContact(1)
//console.log(user1);

module.exports =User