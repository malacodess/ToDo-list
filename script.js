// 1. Select all needed elements

const inputBox = document.querySelector("#input-box");
const addBtn = document.querySelector("#add-btn");
const listContainer = document.querySelector("#list-container");

const allBtn = document.querySelector("#all-btn");
const activeBtn = document.querySelector("#active-btn");
const completedBtn = document.querySelector("#completed-btn");

const tasksLeft = document.querySelector(".tasks-counter p");
const clearTask = document.querySelector(".clear-completed");

// to set the counter zero as default
updateCounter();

//make a savedata function 
function saveData() {
    // Save tasks as an array of objects instead of HTML
    const tasks = [];
    const taskElements = listContainer.querySelectorAll("li");
    taskElements.forEach(li => {
        tasks.push({
            text: li.textContent,
            completed: li.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//make a showdata function
function showData() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        listContainer.innerHTML = ""; // Clear existing content
        
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
    updateCounter();
}

// Create a reusable function to create task elements
function createTaskElement(taskText, isCompleted = false) {
    //make new li
    let li = document.createElement("li");
    li.textContent = taskText;
    
    // Add completed class if needed
    if (isCompleted) {
        li.classList.add("checked");
    }

    //make delete btn
    let deleteBtn = document.createElement("img");
    deleteBtn.src = "./assets/X.png";
    deleteBtn.alt = "delete-btn"; 

    //delete the task when clicked delete btn
    deleteBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        li.remove();
        updateCounter();
        saveData();
    });
    
    //put delete btn inside li
    li.appendChild(deleteBtn);

    //put li inside the list
    listContainer.appendChild(li);
}

//make a function for adding tasks 
function addTask() {
    let taskText = inputBox.value.trim();
    if (taskText === "") {
        return; //if input box is empty then return nothing
    }
    else {
        createTaskElement(taskText);

        //clear input box
        inputBox.value = "";

        //update the counter
        updateCounter();

        saveData();
    }
}

// make an update counter fuction 
function updateCounter() {
    let totalTasks = listContainer.querySelectorAll("li");
    let activeTasks = listContainer.querySelectorAll("li:not(.checked)");
    tasksLeft.textContent = `${activeTasks.length} tasks left`;
}

// adding the task by clicking add and pressing enter
addBtn.addEventListener("click", addTask);

inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// to check a task by clicking on the task
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    updateCounter();
    saveData();
});

// when all btn is clicked, all tasks are shown
allBtn.addEventListener("click", () => {
  let tasks = listContainer.querySelectorAll("li");
  tasks.forEach(task => task.style.display = "flex");
});

// when active btn is clicked, active tasks are shown
activeBtn.addEventListener("click", () => {
  let tasks = listContainer.querySelectorAll("li");
  tasks.forEach(task => {
    task.style.display = task.classList.contains("checked") ? "none" : "flex";
  });
});

// when completed btn is clicked, completed tasks are shown
completedBtn.addEventListener("click", () => {
  let tasks = listContainer.querySelectorAll("li");
  tasks.forEach(task => {
    task.style.display = task.classList.contains("checked") ? "flex" : "none";
  });
});

// clear completed task
clearTask.addEventListener("click", () => {
    let completedTasks = listContainer.querySelectorAll("li.checked");
    completedTasks.forEach(task => task.remove());
    updateCounter();
    saveData();
});

showData();