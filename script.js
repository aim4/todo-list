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

        // TODO: on clicking task text, change type to input
        this.taskInput = document.createElement("p");
        //this.taskInput.type = "text";
        this.taskInput.innerText = this.text;
        this.div.appendChild(this.taskInput);

        // TODO replace with constant/symbol
        this.doneBox = this._createDoneBox();
        this.label = this._createDoneLabel();
        this.deleteBtn = this._createDeleteBtn();

        this.div.appendChild(this.doneBox);
        this.div.appendChild(this.label);
        this.div.appendChild(this.deleteBtn);
        document.getElementById("task-list").appendChild(this.div);
    }

    // TODO refactor
    _createDoneBox() {
        let doneBox = document.createElement("input");
        // TODO replace with constant/symbol
        doneBox.type = "checkbox";
        doneBox.className = "done-checkbox"

        let self = this;
        doneBox.addEventListener("click", function () {
            self._setDone();
        });
        return doneBox;
    }

    _createDoneLabel() {
        let label = document.createElement("label");
        label.innerText = "done";
        return label;
    }

    _createDeleteBtn() {
        let deleteBtn = document.createElement("button");
        // TODO replace with constant/symbol
        deleteBtn.innerText = "Delete";
        deleteBtn.className = "delete-button";
        return deleteBtn;
    }

    // TODO: add done function class or data thing
    _setDone() {
        this.completed = !this.completed;
        if (this.completed) {
            this.taskInput.className = "strike";
        } else {
            this.taskInput.className = "";
        }
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