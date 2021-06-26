'use strict'

// creating an array for the todo list 
let toDoList = [];

// Creating a method to pass a todo item in to the todo list

const addToDO = function (text){
    const todo = {
        discription: text,
        checked: false,
        id: Date.now(),
    }

    toDoList.push(todo); 
    createTodo(todo)
}

// initializing the form element 
const form =document.querySelector('.js-form');

// adding the event listner
form.addEventListener('submit', event =>{
    // stoping refresh when submited
    event.preventDefault();
    //geting the input
    const input = form.querySelector('.js-todo-input');

    // formating the input
    const text = input.value.trim()
    if (text != ''){
        addToDO(text);
        input.value = '';
        input.focus();
        
    }
})

//creating a new todo item 

const createTodo = function (todo) {

localStorage.setItem('todoItemsRef', JSON.stringify(toDoList));
// selecting the list in the dom 
const list = document.querySelector('.js-todo-list');

const item = document.querySelector(`[data-key='${todo.id}']`)

const isChecked = todo.checked ? 'done' : '' ;

const node = document.createElement('li');

if (todo.deleted) {
    // remove the item from the DOM
    item.remove();
    toggleHide();
    return
  }

toggleHide();

node.setAttribute('class', `todo-item ${isChecked}`)

node.setAttribute('data-key', todo.id)

node.innerHTML = `<input id="${todo.id}" type="checkbox"/>
<label for="${todo.id}" class="tick js-tick"></label>
<span>${todo.discription}</span>
<button class="delete-todo js-delete-todo">
<svg><use href="#delete-icon"></use></svg>
</button>
`
if(item){
    list.replaceChild(node, item);
}else {
    list.append(node);
}

}

const toggleDone = function (key){

    const index = toDoList.findIndex(item => item.id ===Number(key))
    
    toDoList[index].checked =! toDoList[index].checked;
   
    createTodo(toDoList[index]);
}

// Select the entire list
const list = document.querySelector('.js-todo-list');
// Add a click event listener to the list and its children
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  // delete todo key
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

const deleteTodo = function (key){
    
    const index = toDoList.findIndex(element => element.id === Number(key))
    const todo = {
        deleted: true,
        ...toDoList[index]
      };

   toDoList = toDoList.filter(element => element.id !== Number(key));
   createTodo(todo);

}

// hide the empty state message
const toggleHide = function () {
const emptySate = document.querySelector(`.empty-state`)

if(toDoList.length > 0){
    
    emptySate.classList.add('hidden')
}else {
    
    emptySate.classList.remove('hidden')
}
}

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      toDoList = JSON.parse(ref);
      toDoList.forEach(t => {
        createTodo(t);
      });
    }
  });