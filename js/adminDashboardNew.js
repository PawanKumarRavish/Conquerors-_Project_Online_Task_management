console.log("Admin Dashboard");
const TASKS_TABLE = "tasks";
const USERS_TABLE = "users";
const KEY_COMPLETED = "Completed";
const KEY_PENDING = "Pending";

let tableBody = document.getElementById("tableBody");


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
        <td>${checkTaskStatus(element.isCompleted)}</td>
      </tr>`;
    });

    // <td><span class="badge bg-success">Approved</span></td>

    if (tasksArray.length != 0) {
        tableBody.innerHTML = html;
    } else {
        tableBody.innerHTML = `Nothing to show! Use "Create Task" section above to add tasks.`;
    }
}

// checking the status of tasks (Completed or pending)
function checkTaskStatus(status) {
    if (status == false) {
        return '<span class="badge bg-warning">Pending</span>'
    } else {
        return '<span class="badge bg-success">Completed</span>'
    }
}



class AdminDashboard {

    constructor(tasksArray, usersArray) {
        this.tasksArray = tasksArray;
        this.usersArray = usersArray;
    }

    
    calculatePendingTasks() {
        let pendingCount = 0;
        let completedCount = 0;
        this.tasksArray.forEach(function (element, index) {
            if (element.isCompleted == false) {
                console.log(element.isCompleted);
                pendingCount += 1;
            } else {
                completedCount += 1;
            }
        });

        let headingPendingTasks = document.getElementById("headingPendingTasks");
        let headingCompletedTasks = document.getElementById("headingCompletedTasks");
        headingPendingTasks.innerText = pendingCount;
        headingCompletedTasks.innerText = completedCount;
    }


    displayData() {
        let usersCount=0;
        let headingUsers = document.getElementById("headingUsers");
        let headingTasks = document.getElementById("headingTasks");

        headingTasks.innerText = this.tasksArray.length;

        this.usersArray.forEach(function (element, index) {
            if (element.userType == "user") {
                usersCount+=1;
            }
        });
        headingUsers.innerText = usersCount;

    }
}


// Getting Tasks from local storage
let tasks = localStorage.getItem(TASKS_TABLE);
let tasksArray;
if (tasks != null) {
    tasksArray = JSON.parse(tasks);

} else {
    tasksArray = [];
}

// Getting users from local stoarge
let users = localStorage.getItem(USERS_TABLE);
let usersArray;
if (users != null) {
    usersArray = JSON.parse(users);
}



// Creating object and accessing the functions
let dashboardObj = new AdminDashboard(tasksArray, usersArray);
dashboardObj.displayData();
dashboardObj.calculatePendingTasks();