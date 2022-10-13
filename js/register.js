console.log("Register Page");
import { USERS_TABLE, KEY_NAME, KEY_EMAIL, KEY_DOB, KEY_GENDER, KEY_USERTYPE, KEY_PASSWORD } from './constants.js';

//localStorage.clear();
//console.log(JSON.parse(localStorage.getItem(USERS_TABLE)));
//console.log(isEmailAlreadyExists("gagan@gmail.com"));


//var arrayFromStroage = JSON.parse(localStorage.getItem(localStorage.getItem(USERS_TABLE)));
//var arrayLength = arrayFromStroage.length();
//console.log(arrayFromStroage);



// Getting all the elements from html page
let nameField = document.getElementById("fName");
let emailField = document.getElementById("email");
let passwordField = document.getElementById("password");
let confirmPasswordField = document.getElementById("cPassword");
let dobField = document.getElementById("dob");
let radioMaleField = document.getElementById("radioMale");
let radioFemaleField = document.getElementById("radioFemale");
let radioUserField = document.getElementById("radioUser");
let radioAdminField = document.getElementById("radioAdmin");
let submitBtn = document.getElementById("submitBtn");
let registerform = document.getElementById("registerform");


// Event on submit btn
submitBtn.addEventListener("click", function (e) {
    for(var i=0;i<registerform.elements.length;i++){
        if(registerform.elements[i].value === '' && registerform.elements[i].hasAttribute('required')){
            return false;
          }
    }
     if(isEmailAlreadyExists(emailField.value)){
        alert("Email already exists. Please use any other email");
    }
    else {
        registerUser();
        
    }
});


// register the new user
function registerUser() {
    
    let selectedGenderValue = "male";
    let selectedUserTypeValue = "user";

    if (radioMaleField.checked) {
        selectedGenderValue = radioMaleField.value;
    } else {
        selectedGenderValue = radioFemaleField.value;
    }

    if (radioUserField.checked) {
        selectedUserTypeValue = radioUserField.value;
    } else {
        selectedUserTypeValue = radioAdminField.value;
    }

    let users = localStorage.getItem(USERS_TABLE);
    let usersObj;
    if (users == null) {
        usersObj = [];

    } else {
        usersObj = JSON.parse(users)
    }


    //create object
    let registerObj = {
        "name": nameField.value, 
        "email": emailField.value,
        "password": passwordField.value,
        "dob": dobField.value,
        "gender": selectedGenderValue,
        "userType": selectedUserTypeValue,
    };

    usersObj.push(registerObj);
    localStorage.setItem(USERS_TABLE, JSON.stringify(usersObj));

    console.log(usersObj);
    alert("User Registered successfully");
    resetForm();
    window.location.href = "../html_pages/login.html";

}

//form reset
function resetForm(){
    registerform.reset();
}

// To Check email already exists
function isEmailAlreadyExists(emailToValidate){
    let users = localStorage.getItem(USERS_TABLE);
    let usersObj;
    let found=false;
    if (users != null) {
        usersObj = JSON.parse(users)
        found=usersObj.some(el => el.email === emailToValidate);
    }
    return found;
    
}
