"use strict";

const taskIn = document.querySelector(".input-task");
const deleteIn = document.querySelector(".delete");
const addTaskBtn = document.querySelector(".btn-task");
const deleteTaskBtn = document.querySelector(".btn-delete");
const taskContainer = document.querySelector(".task-container");

const taskList = [];

// clearing the dummy data
taskContainer.innerHTML = "";

// creating the delete function
const deltask = function (index) {
  if (index > 0 && index < taskList.length) {
    taskList.splice(index - 1, 1);
  } else {
    alert("Invalid index");
  }
};

// creating a display function
const displayTasks = function (arr) {
  taskContainer.innerHTML = "";
  arr.forEach((element, i) => {
    const html = `<div class="indi-task">
    <p class="task"> Task number ${i + 1}: ${element}</p>
  </div>`;
    taskContainer.insertAdjacentHTML("afterbegin", html);
  });
};

// eventl listner for adding a task
addTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const task = taskIn.value;
  taskList.push(task);
  displayTasks(taskList);
  taskIn.value = "";
});

deleteTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const deletIndex = Number(deleteIn.value);
  deltask(deletIndex);
  displayTasks(taskList);
});
