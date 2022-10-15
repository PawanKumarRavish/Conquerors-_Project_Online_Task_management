console.log("Show Tasks");

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

let tableBody = document.getElementById("tableBody");

//let found=isEmailExists("gaganUser@gmail.com");
//console.log(found);
//console.log(JSON.parse(localStorage.getItem(TASKS_TABLE)));

//localStorage.removeItem(TASKS_TABLE);

showAllTasks();

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

        html += `<tr>
                    <td>${index+1}</td>
                    <td>${element.title}</td>
                    <td>${element.description}</td>
                    <td>${element.userEmail}</td>
                    <td>${element.startDate}</td>
                    <td>${element.endDate}</td>
                    <td>$${element.hourlyRate}</td>
                    <td>${checkTaskStatus(element.isCompleted)}</td>
                    <td><img src="H.gif" height=30 width=30 id="${index}" onclick="deleteTask(this.id)" ></img></td>
                </tr>`;
    });

    if (tasksArray.length != 0) {
        tableBody.innerHTML = html;
    } else {
        tableBody.innerHTML = `Nothing to show! Use "Create Task" section above to add tasks.`;
    }
}

// checking the status of tasks (Completed or pending)
function checkTaskStatus(status) {
    if (status == false) {
        return KEY_PENDING;
    } else {
        return KEY_COMPLETED;
    }
}

// Deleting The task
function deleteTask(index) {
    console.log(index);
    let tasks = localStorage.getItem(TASKS_TABLE);
    let tasksArray;
    if (tasks != null) {
        tasksArray = JSON.parse(tasks);

    } else {
        tasksArray = [];
    }
    tasksArray.splice(index, 1);
    localStorage.setItem(TASKS_TABLE, JSON.stringify(tasksArray));
    showAllTasks();


}
