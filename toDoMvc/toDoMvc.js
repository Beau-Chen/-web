window.onload = load;
window.addEventListener("storage", load, false);
document.querySelector("#newInput").addEventListener("keypress", keyDown);
const ENTER=13;
function setFunction(a) {
    a.addTodoList = addTodoList;
    a.saveData = saveData;
    a.remove = remove;
    a.clearComplete = clearComplete;
    a.update = update;
    a.edit = edit;
}

class OneTodoList {
    constructor(content) {
        this.content = content;
        this.done = false;
    }
}

function addTodoList() {
    let todoContent = document.querySelector(".newInput").value.trim();
    document.querySelector(".newInput").value = "";
    if (todoContent.length === 0) {
        alert("Todo can't not be blank ");
        return;
    }
    this.push(new OneTodoList(todoContent));
    this.saveData();
    load();
}

function saveData() {
    localStorage.setItem("myTodoList", JSON.stringify(this));
}

function load() {
    let htmlTodo = document.querySelector(".todoList"),
        todoCount = document.querySelector(".todoCount"),
        todoString = "",
        todoCountNum = 0;
    todoList = loadData();
    setFunction(todoList);
    if (todoList != null) {
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].done === false) {
                todoString +=
                    `<li id="list" ${i} class="todo">
                     <div class="view">
                     <img class="toggle"  src="./click.png" onclick=todoList.update(${i},"done",true)>
                     <label ondblclick="todoList.edit(${i})" id="label${i}">${todoList[i].content}</label>
                     <button onclick="todoList.remove(${i})"  class="destroy"><img src="ban.png"></button>
                     </div>
                     </li>`;
                todoCountNum++;
            }
            else {
                todoString +=
                    `<li id="list${i}" class="done">
                     <div class="view">
                     <img class="toggle"  src="./clicked.png" onclick=todoList.update(${i},"done",false)>
                     <label class="doneList" ondblclick="todoList.edit(${i})" id="label${i}">${todoList[i].content}</label>
                     <button onclick="todoList.remove(${i})" class="destroy"><img src="ban.png"></button>
                     </div>
                     </li>`;
            }
        }
        htmlTodo.innerHTML = todoString;
        todoCount.innerHTML = todoCountNum;
    }
    else {
        htmlTodo.innerHTML = "";
        todoCount.innerHTML = "0";
    }
}

function edit(i) {
    let label = document.querySelector("#label" + i),
        labelContent = label.innerHTML;
    label.innerHTML = `<input id="input${i}">`;
    let input = document.querySelector("#input" + i);
    input.focus();
    input.value = labelContent;
    input.addEventListener("keyup", function (event) {//我终于找到合适的键盘按键了hhh
        todoList[i].content = input.value;
        todoList.saveData();
        if (event.keyCode === ENTER) {
            load();
        }
    });
    input.addEventListener("mouseleave", function () {
        load();
    })
}

function remove(i) {
    this.splice(i, 1);
    this.saveData();
    load();
}

function clearComplete() {
    for (let i = 0; i < this.length; i++) {
        if (this[i]["done"] === true) {
            this.splice(i, 1);
            i--;
        }
    }
    this.saveData();
    load();
}

function update(i, field, value) {
    this[i][field] = value;
    this.saveData();
    load();
}

function loadData() {
    let hisTory = localStorage.getItem("myTodoList");
    if (hisTory != null) {
        return JSON.parse(hisTory);
    }
    else {
        return [];
    }
}

function keyDown(event) {
    if (event.keyCode === ENTER) {
        todoList.addTodoList();
    }
}