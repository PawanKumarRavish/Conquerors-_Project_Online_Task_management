console.log("Add Task Page");
const USERS_TABLE = "users";
const TASKS_TABLE = "tasks";
const KEY_NAME = "name";
const KEY_EMAIL = "email";
const KEY_PASSWORD = "password";
const KEY_USERTYPE = "userType";
const KEY_USER = "user";
const KEY_ADMIN = "admin";
const KEY_COMPLETED = "Completed";
const KEY_PENDING = "Pending";

//let found=isEmailExists("gaganUser@gmail.com");
//console.log(found);
//console.log(JSON.parse(localStorage.getItem(TASKS_TABLE)));

//localStorage.removeItem(TASKS_TABLE);

// Getting all the elements from html page
let titleField = document.getElementById("title");
let descriptionField = document.getElementById("description");
let startDateField = document.getElementById("startDate");
let endDateField = document.getElementById("endDate");
let userEmailField = document.getElementById("email");
let hourlyRateField = document.getElementById("hourlyRate");
let createTaskBtn = document.getElementById("createTaskBtn");
let createTaskForm = document.getElementById("createTaskform");
let userEmailDropdownField = document.getElementById("userEmails");


populateDropdownWithUserEmails();

// Polulate User Emails
function populateDropdownWithUserEmails() {
    let users = localStorage.getItem(USERS_TABLE);
    let usersArray;
    if (users != null) {
        usersArray = JSON.parse(users);
    }

    usersArray.forEach(function (element, index) {
        var userType = element.userType;
        if (userType == KEY_USER) {
            var email = element.email;
            var el = document.createElement("option");
            el.textContent = email;
            el.value = email;
            userEmailDropdownField.appendChild(el);
        }

    });

}

createTaskForm.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    createTask(titleField.value, descriptionField.value, startDateField.value,
        endDateField.value, userEmailDropdownField.value, hourlyRateField.value);
}

function createTask(title, description, startDate, endDate, email, hourlyRate) {
    let tasks = localStorage.getItem(TASKS_TABLE);
    let tasksArray;
    if (tasks == null) {
        tasksArray = [];
    } else {
        tasksArray = JSON.parse(tasks)
    }

    //create object
    let taskObj = {
        "id": generateUniqueId(),
        "title": title,
        "description": description,
        "startDate": startDate,
        "endDate": endDate,
        "userEmail": email,
        "hourlyRate": hourlyRate,
        "isCompleted": false,
    };

    tasksArray.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));

    console.log(tasksArray);
    showAlert("Task Created successfully")
    resetForm();

}


function showAlert(message) {
    console.log(message);
        let html = "";
        html += `<div class="alert alert-success" role="alert">
                ${message}
                </div>`;
    let divMessage = document.getElementById("message");
    divMessage.innerHTML = html;

    setTimeout(function(){
        divMessage.innerHTML = "";

    },2000);

}

// Generating unique id of 5 digits
function generateUniqueId() {
    const min = 10000;
    const max = 99999;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// Reset the form after task created
function resetForm() {
    createTaskForm.reset();
}



