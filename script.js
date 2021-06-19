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
  if (index >= 0 && index <= taskList.length) {
    console.log(index);
    taskList.splice(index - 1, 1);
  } else {
    console.log(index);
    alert(`Invalid index : ${index}`);
  }
};

// creating a display function
const displayTasks = function (arr) {
  taskContainer.innerHTML = "";
  arr.forEach((element, i) => {
    const html = `<div class="indi-task">
    <p class="task"> Task number ${
      i + 1
    }: ${element} <button class="del-btn del${i}">Delete task</button></p>
    </div>`;
    taskContainer.insertAdjacentHTML("afterbegin", html);
  });
  createDeleteFunc();
};

// eventl listner for adding a task
addTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const task = taskIn.value;
  taskList.push(task);
  displayTasks(taskList);
  taskIn.value = "";
  createDeleteFunc();
});

// delete task using index

// deleteTaskBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   const deletIndex = Number(deleteIn.value);
//   console.log("click");
//   deltask(deletIndex);
//   displayTasks(taskList);
// });

const createDeleteFunc = function () {
  const delbuttons = document.querySelectorAll(".del-btn");
  delbuttons.forEach(function (element, index, arr) {
    element.addEventListener("click", function () {
      deltask(arr.length - index);
      displayTasks(taskList);
    });
  });
};
