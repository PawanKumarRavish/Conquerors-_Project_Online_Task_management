console.log("Login Page")
import { USERS_TABLE, KEY_NAME, KEY_EMAIL, KEY_DOB, KEY_GENDER, KEY_USERTYPE, KEY_PASSWORD } from './constants.js';

//localStorage.clear();
//console.log(JSON.parse(localStorage.getItem(USERS_TABLE)));

let emailField = document.getElementById("email");
let passwordField = document.getElementById("password");
let loginform = document.getElementById("loginform");
let radioUserField = document.getElementById("radioUser");
let radioAdminField = document.getElementById("radioAdmin");
let submitBtn = document.getElementById("submitBtn");




submitBtn.addEventListener("click",function(e){

    for(var i=0;i<loginform.elements.length;i++){
        if(loginform.elements[i].value === '' && loginform.elements[i].hasAttribute('required')){
            return false;
          }
    }

    let selectedUserTypeValue = "user";
    if (radioUserField.checked) {
        selectedUserTypeValue = radioUserField.value;
    } else {
        selectedUserTypeValue = radioAdminField.value;
    }

    if(validateLogin(emailField.value,passwordField.value,selectedUserTypeValue)){
        console.log("Success");
        localStorage.setItem("loggedUserEmail",emailField.value);
        resetForm();

        if(selectedUserTypeValue=="user"){
            window.location.href = "../html_pages/userDashboard.html";
        }else{
            window.location.href = "../html_pages/adminDashboardNew.html";
        }
        
    }else{
       alert("Invalid login credentials");
    }

});

//form reset
function resetForm(){
    loginform.reset();
}

// Validate login
function validateLogin(email,password,selectedUserType){
    let users = localStorage.getItem(USERS_TABLE);
    let usersObj;
    let found=false;
    if (users != null) {
        usersObj = JSON.parse(users)
        found=usersObj.some(el => el.email === email && el.password===password && el.userType===selectedUserType);
    } 
    return found;
}
