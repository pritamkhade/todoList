let rootContainerEl = document.getElementById("rootContainer");
/* for (let i = 0; i < listTodo.length; i++) {
    onAddTodo(listTodo[i], i);
} */
/* 
listTodo.forEach((event, index)=>{
    onAddTodo(event,index);
}); */

// DAY 2 My Practice
/* let count = 1; // Initialize the count variable

function onAddTodo(Todo){
    let todoListEl = document.createElement('li');
    todoListEl.classList.add('todo-list-cont');
    rootContainerEl.appendChild(todoListEl);

    let checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.id = 'checkbox-' + count;
    todoListEl.appendChild(checkboxEl);

    let labelEl = document.createElement('label');
    labelEl.classList.add('todo-label-cont');
    labelEl.htmlFor = 'checkbox-' + count;
    labelEl.textContent = Todo.title;  // Add the title text
    labelEl.style.color='white';
    todoListEl.appendChild(labelEl);
    count++; // Increment the count after use
}

for (let event of listTodo) {
    onAddTodo(event);
} */

// ------------------------ -- Day 3 -----------------------

// Retrieve stored todos from localStorage
let getStoreTodo = localStorage.getItem("myListTodo");
let listTodo = JSON.parse(getStoreTodo);

// Save todos to localStorage
function onSaveTodo() {
  let stringifyTodo = JSON.stringify(listTodo); // convert into string
  localStorage.setItem("myListTodo", stringifyTodo);
}

// Update the status of a todo
function onStatusChange(checkId, titleId) {
  let chID = document.getElementById(checkId);
  let myTitle = document.getElementById(titleId);
  if (chID.checked === true) {
    myTitle.classList.add("checked");
  } else {
    myTitle.classList.remove("checked");
  }
}

// Delete a todo
function onDeleteTodo(todoID) {
  let TodOID1 = document.getElementById(todoID);
  rootContainerEl.removeChild(TodOID1);

  // Remove from the listTodo array
  listTodo = listTodo.filter((todo) => "Todo" + todo.id !== todoID);
  onSaveTodo();
}

// Add a todo to the DOM
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

  checkboxEl.onclick = function () {
    onStatusChange(checkboxId, titleId);
  };

  todoListEl.appendChild(checkboxEl);

  let labelEl = document.createElement("label");
  labelEl.classList.add("todo-label-cont");
  labelEl.htmlFor = checkboxId;
  todoListEl.appendChild(labelEl);

  let titleEl = document.createElement("h5");
  titleEl.textContent = Todo.title;
  titleEl.id = titleId;
  labelEl.appendChild(titleEl);

  let buttonEl = document.createElement("button");
  buttonEl.classList.add("my-btn");

  buttonEl.onclick = function () {
    onDeleteTodo(todoID);
  };

  labelEl.appendChild(buttonEl);

  let delateICOEl = document.createElement("i");
  delateICOEl.classList.add("fa-solid", "fa-trash");
  buttonEl.appendChild(delateICOEl);

    // --------------------- DELETE (REMOVE) ------------------------------------

  /* buttonEl.addEventListener("click", () => {
    todoListEl.remove();
  }); //delete */

  //--------------------------- LINE THROUGH ----------------------------------
  /*   checkboxEl.addEventListener("change", () => {
    if (checkboxEl.checked) {
      titleEl.style.textDecoration = "line-through";
    } else {
      titleEl.style.textDecoration = "none";
    }
  }); */
  //--------------------------------------------------------------------------
}

// Input and error message elements
let myInputEl = document.getElementById("myInput");
let errorMsgEl = document.getElementById("errorMsg");

// Add a new todo
function addNewTodo() {
  let TodoTitle = myInputEl.value;
  let unique = Math.ceil(Math.random() * new Date().getTime());

  if (TodoTitle === "") {
    errorMsgEl.textContent = "Please Enter Valid Input";
  } else {
    let newTodo = {
      title: TodoTitle,
      id: unique,
    };
    listTodo.push(newTodo);
    onAddTodo(newTodo);
    errorMsgEl.textContent = "";
    onSaveTodo();
  }
  myInputEl.value = "";
}

// Render existing todos
for (let event of listTodo) {
  onAddTodo(event);
}
