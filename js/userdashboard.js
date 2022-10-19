console.log("User Dashboard");
const TASKS_TABLE = "tasks";
const USERS_TABLE = "users";
const KEY_COMPLETED = "Completed";
const KEY_PENDING = "Pending";
let tasksArray;

let ginti=0;

let newArray=[];

let workedHours=0;

let totalEarning=0;

let headngTotalEarning=document.getElementById('headingUsers');
let headingTotalAssignedTasks=document.getElementById('headingTasks');

let loggedUserEmail = localStorage.getItem("loggedUserEmail");
let tableBody = document.getElementById("tableBody");

// Use Class Definition and constructor
class UserTasks {
    constructor(tasksArray) {
        this.tasksArray = tasksArray;
    }

    calculatePendingTasks() {
        let pendingCount = 0;
        let completedCount = 0;
        this.tasksArray.forEach(function (element, index) {
            if (element.userEmail == loggedUserEmail) {
                if (element.isCompleted == false) {
                    pendingCount += 1;
                } else {
                    completedCount += 1;
                }
            }

        });

        let headingPendingTasks = document.getElementById("headingPendingTasks");
        let headingCompletedTasks = document.getElementById("headingCompletedTasks");
        headingPendingTasks.innerText = pendingCount;
        headingCompletedTasks.innerText = completedCount;
    }

    showUserTasks() {
        let html = "";
        this.tasksArray.forEach(function (element, index) {


            localStorage.setItem("assignedTasks",ginti+1);
            if (element.userEmail == loggedUserEmail) {
                html += `<tr>
                        <td>${ginti + 1}</td>
                        <td>${element.title}</td>
                        <td>${element.description}</td>
                        <td>$ ${element.hourlyRate}</td>
                        <td id= "${element.id}" onclick="completeTask(this.id)">${checkTaskStatus(element.isCompleted)} </td>
                        </tr>`;

                        ginti+=1;
            }

        });

        tableBody.innerHTML = html;

    }

    getLoggedUserTasks() {
        if (this.tasksArray.length != 0) {
            this.showUserTasks();

        } else {
            tableBody.innerHTML = `Nothing to show! Use "Create Task" section above to add tasks.`;
        }


    }

}

// End of Class Definition and constructor


// Getting Tasks from local storage
let tasks = localStorage.getItem(TASKS_TABLE);
console.log(JSON.parse(tasks));
if (tasks != null) {
    tasksArray = JSON.parse(tasks);

} else {
    tasksArray = [];
}

// Making the task as complete
function completeTask(taskId) {

    workedHours=prompt("enter how many hours you have worked ");
    let i = tasksArray.findIndex(el => el.id == taskId);
    let obj = tasksArray[i];
    obj["isCompleted"] = true;
    localStorage.setItem(TASKS_TABLE, JSON.stringify(tasksArray));

    let hours = obj["hourlyRate"];
    toCalculateTotalEarning(workedHours,hours);
    window.location.reload();
   
    


}

function toCalculateTotalEarning(workedHours,hourlyRate){
    let earning=workedHours*hourlyRate;
   totalEarning+=earning;
   totalEarning+= parseFloat (localStorage.getItem('paise'));

    console.log(totalEarning);
    localStorage.setItem("paise",totalEarning)
    
    

}



// checking the status of tasks (Completed or pending)
function checkTaskStatus(status) {
    if (status == false) {
        return '<span class="badge bg-warning">Pending</span>'
    } else {
        return '<span class="badge bg-success">Completed</span>'
    }
}

let userTaskObj = new UserTasks(tasksArray);
userTaskObj.getLoggedUserTasks();
userTaskObj.calculatePendingTasks();

headngTotalEarning.innerText=localStorage.getItem("paise");

headingTotalAssignedTasks.innerText=localStorage.getItem('assignedTasks');