let Task = document.querySelector("#Task");
let AddTask = document.querySelector(".AddTask");
let TaskList = document.querySelector(".tasks ul");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task.id, task.value);
    });
});

// Add task event
AddTask.addEventListener("click", function (e) {
    e.preventDefault();
    let TaskValue = Task.value;
    if (TaskValue) {
        let taskId = `task-${Date.now()}`;
        addTaskToDOM(taskId, TaskValue);
        saveTaskToLocalStorage(taskId, TaskValue);
        Task.value = "";
    }
});

// Add task to DOM
function addTaskToDOM(taskId, taskValue) {
    let li = document.createElement("li");
    li.innerHTML = `
        <div class="task-item">
            <input type="checkbox" id="${taskId}" name="task" value="${taskValue}">
            <label for="${taskId}">${taskValue}</label>
        </div>
        <button type="button" class="delete-task">Delete</button>
    `;

    li.querySelector(".delete-task").addEventListener("click", function () {
        li.remove();
        removeTaskFromLocalStorage(taskId);
    });

    TaskList.appendChild(li);
}

// Save task to localStorage
function saveTaskToLocalStorage(taskId, taskValue) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ id: taskId, value: taskValue });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
