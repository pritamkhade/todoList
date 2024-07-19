let rootContainerEl = document.getElementById("rootContainer");
let myInputEl = document.getElementById("myInput");
let errorMsgEl = document.getElementById("errorMsg");
function getTodoFromLocalStorage() {
  let getStoreTodo = localStorage.getItem("myListTodo");

  if (getStoreTodo === null) {
    return [];
  } else {
    let parseTodo = JSON.parse(getStoreTodo);
    return parseTodo;
  }
}
let listTodo = getTodoFromLocalStorage();
function onSaveTodo() {
  let stringifyTodo = JSON.stringify(listTodo);
  localStorage.setItem("myListTodo", stringifyTodo);
}
function onStatusChange(checkId, titleId, todoId) {
  let chID = document.getElementById(checkId);
  let myTitle = document.getElementById(titleId);
  if (chID.checked === true) {
    myTitle.classList.add("checked");
  } else {
    myTitle.classList.remove("checked");
  }

  let index = listTodo.findIndex((each) => each.id === todoId);

  if (listTodo[index].isChecked === true) {
    listTodo[index].isChecked = false;
  } else {
    listTodo[index].isChecked = true;
  }
}
function onDeleteTodo(todoID, todoId) {
  let todoEl = document.getElementById(todoID);

  // Find the index of the todo item in the listTodo array
  let index = listTodo.findIndex((each) => each.id === todoId);

  if (listTodo[index].isChecked === true) {
    // Check if the todo item is marked as checked
    rootContainerEl.removeChild(todoEl);
    listTodo.splice(index, 1); // =>=>=>=>=> Remove the todo item from the listTodo array
  } else {
    listTodo[index].isChecked = false; // If not checked, set the isChecked property to false
  }
  // onSaveTodo(); // Save the updated listTodo array to localStorage
}
function onAddTodo(Todo) {
  let checkboxId = "checkbox" + Todo.id; // create checkboxID
  let titleId = "myTitle" + Todo.id;
  let todoID = "Todo" + Todo.id;

  let todoListEl = document.createElement("li");
  todoListEl.classList.add("todo-list-cont");
  todoListEl.id = todoID;
  rootContainerEl.appendChild(todoListEl);

  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.id = checkboxId;
  if (Todo.isChecked === true) {
    checkboxEl.checked = true;
  } 
  checkboxEl.onclick = function () {
    onStatusChange(checkboxId, titleId, Todo.id);
  };

  todoListEl.appendChild(checkboxEl);

  let labelEl = document.createElement("label");
  labelEl.classList.add("todo-label-cont");
  labelEl.htmlFor = checkboxId;
  todoListEl.appendChild(labelEl);

  let titleEl = document.createElement("h5");
  titleEl.textContent = Todo.title;
  titleEl.id = titleId;
  if (Todo.isChecked === true) {
    titleEl.classList.add("checked");
  }
  labelEl.appendChild(titleEl);

  let buttonEl = document.createElement("button");
  buttonEl.classList.add("my-btn");

  buttonEl.onclick = function () {
    onDeleteTodo(todoID, Todo.id); //delete
  };

  labelEl.appendChild(buttonEl);

  let delateICOEl = document.createElement("i");
  delateICOEl.classList.add("fa-solid", "fa-trash");
  buttonEl.appendChild(delateICOEl);
}
function addNewTodo() {
  // let unique = listTodo.length + 1;
  let TodoTitle = myInputEl.value;
  let unique = Math.ceil(Math.random() * new Date().getTime());

  if (TodoTitle === "") {
    errorMsgEl.textContent = "Please Enter Valid Input";
  } else {
    let newTodo = {
      title: TodoTitle,
      id: unique,
      isChecked: false,
    };
    listTodo.push(newTodo); //push
    onAddTodo(newTodo);
    errorMsgEl.textContent = "";
  }
  myInputEl.value = "";
}
for (let event of listTodo) {
  onAddTodo(event);
}
