class TaskManager {
    constructor() {
        this.tasks = []
    }

    addTask(t) {
        if (t instanceof Task) {
            this.tasks.push(t);
        }
    }

    // Remove task at index if exists
    removeTask(i) {

    }

    // Get task at index
    getTask(i) {

    }
}

class Task {
    constructor(t) {
        this.text = t;
        this.completed = false;
        this._createElement();
    }

    _createElement() {
        this.div = document.createElement("div");
        this.div.className = "task";

        this.taskInput = document.createElement("input");
        this.taskInput.type = "text";
        this.taskInput.value = this.text;
        this.div.appendChild(this.taskInput);

        this.doneBtn = document.createElement("button");
        // TODO replace with constant/symbol
        this.doneBtn.innerHTML = "Done";
        this.doneBtn.className = "done-button";
        this.div.appendChild(this.doneBtn);

        this.deleteBtn = document.createElement("button");
        // TODO replace with constant/symbol
        this.deleteBtn.innerHTML = "Delete";
        this.deleteBtn.className = "delete-button";
        this.div.appendChild(this.deleteBtn);

        document.getElementById("task-list").appendChild(this.div);
    }

    // TODO: add done function class or data thing
    _setDone() {
        this.completed = true;
    }

    setText(t) {
        this.text = t;
    }

    getDeleteBtn() {
        return this.deleteBtn;
    }
}

function clearInput(e) {
    //e.stopPropagation();
    let input = document.getElementById("task-input");
    input.value = "";
}

function addTask(e) {
    //e.stopPropagation();
    let input = document.getElementById("task-input");
    if (input.value === "") {
        // TODO add a warning
        console.log("No input");
        return;
    }

    let t = new Task(input.value);
    taskManager.addTask(t);
}

let taskManager = new TaskManager();

// Bind button functions
let addBtn = document.getElementById("add-button");
addBtn.addEventListener("click", addTask);

let clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener("click", clearInput);