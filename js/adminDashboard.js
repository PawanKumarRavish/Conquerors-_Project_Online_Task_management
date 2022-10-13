console.log("Admin Dashboard");
 const USERS_TABLE="users";
 const TASKS_TABLE="tasks";
 const KEY_NAME="name";
 const KEY_EMAIL="email";
 const KEY_PASSWORD="password";
 const KEY_USERTYPE="userType";
 const KEY_USER="user";
 const KEY_ADMIN="admin";
 const KEY_COMPLETED="Completed";
 const KEY_PENDING="Pending";

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


showAllTasks();


createTaskBtn.addEventListener("click", function (e) {
    console.log(userEmailDropdownField.value);

    for (var i = 0; i < createTaskForm.elements.length; i++) {
        if (createTaskForm.elements[i].value === '' && createTaskForm.elements[i].hasAttribute('required')) {
            return false;
        }
    }
    createNewTask(titleField.value, descriptionField.value, startDateField.value,
        endDateField.value, userEmailDropdownField.value, hourlyRateField.value);


});


function createNewTask(title, description, startDate, endDate, email,hourlyRate) {
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
    alert("Task Created successfully");
    resetForm();
    showAllTasks();
    //window.location.href = "login.html";

}


// Checking if email exists or not 
function isEmailExists(emailToCheck) {
    let users = localStorage.getItem(USERS_TABLE);
    let usersObj;
    let found = false;
    if (users != null) {
        usersObj = JSON.parse(users)
        found = usersObj.some(el => el.email === emailToCheck && el.userType === KEY_USER);
    }
    return found;
}

// Generating unique id of 5 digits
function generateUniqueId() {
    const min = 10000;
    const max = 99999;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}



// Showing all tasks from local storage
function showAllTasks() {
    let tasks = localStorage.getItem(TASKS_TABLE);
    let tasksArray;
    if (tasks != null) {
        tasksArray = JSON.parse(tasks);

    } else {
        tasksArray = [];
        console.log("No Tasks found");

    }
    let html = "";
    tasksArray.forEach(function (element, index) {

        console.log(element);

        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h3 class="card-title">Title: ${element.title}</h3>
                    <p class="card-text"> User: ${element.userEmail}</p>
                    <p class="card-text"> Description: ${element.description}</p>
                    <p class="card-text"> Start Date: ${element.startDate}</p>
                    <p class="card-text"> End Date: ${element.endDate}</p>
                    <p class="card-text"> Hourly Rate $${element.hourlyRate}</p>
                    <p class="card-text"> Status: ${checkTaskStatus(element.isCompleted)}</p>
                    <br>
                    <button id="${index}"onclick="deleteTask(this.id)" class="btn btn-primary">Delete Task</button>
                </div>
            </div> `;
    });


    let tasksElm = document.getElementById("tasks");
  if (tasksArray.length != 0) {
    tasksElm.innerHTML = html;
  } else {
    tasksElm.innerHTML = `Nothing to show! Use "Create Task" section above to add tasks.`;
  }
}

// checking the status of tasks (Completed or pending)
function checkTaskStatus(status){
    if(status==false){
        return KEY_PENDING;
    }else{
        return KEY_COMPLETED;
    }
}

// Deleting The task
function deleteTask(index){
  console.log(index);
  let tasks = localStorage.getItem(TASKS_TABLE);
    let tasksArray;
    if (tasks != null) {
        tasksArray = JSON.parse(tasks);

    } else {
        tasksArray = [];
    }
    tasksArray.splice(index,1);
    localStorage.setItem(TASKS_TABLE,JSON.stringify(tasksArray));
    showAllTasks();


}

// Reset the form after task created
function resetForm() {
    createTaskForm.reset();
} 