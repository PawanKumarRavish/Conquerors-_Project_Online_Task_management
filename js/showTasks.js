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
                    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="${index}" onclick="deleteTask(this.id)" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                  </svg></td>
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
