// Query selectors:
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event listeners:
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
document.addEventListener("DOMContentLoaded", getTodos);

// Functions:
function addTodo(event) {
  // this is to prevent the page from reloding and the form from submitting when the addbutton is clicked
  event.preventDefault();

  // creating a tododiv:
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // adding the check btn to enable users click the todo when task is completed:
  const completedButton = document.createElement("input");
  completedButton.type = "checkbox";
  // completedButton.innerHTML = '<i class = "fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // creating an li when the addbutton is being clicked;
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // adding todos to my local storage
  saveLocalTodos(todoInput.value);

  // adding the delete btn to enable users delete a task:
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // append the todo list:
  todoList.appendChild(todoDiv);
  // clearing the todo input when a task has being inputed in the input area:
  todoInput.value = "";
}

// the delete function:
function deleteCheck(e) {
  const item = e.target;
  // delete the todos if one click on the delete btn
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // animation to remove the todo:
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      removeLocalTodos(todo);
      todo.remove();
    });
  }

  // check mark:
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo div:
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // the check btn
    const completedButton = document.createElement("input");
    completedButton.type = "checkbox";
    // completedButton.innerHTML = '<i class="fas fa-check"></>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // save local todo
    // saveLocalTodos(todoInput.value);
    // creating li:
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // the trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append todo list:
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex, 1));
  localStorage.setItem("todos", JSON.stringify(todos));
}
