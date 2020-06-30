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
        let self = this;

        this.div = document.createElement("div");
        this.div.className = "task";

        this.taskInput = document.createElement("p");
        //this.taskInput.type = "text";
        this.taskInput.innerText = this.text;
        this.div.appendChild(this.taskInput);

        this.doneCheckBox = document.createElement("input");
        // TODO replace with constant/symbol
        this.doneCheckBox.type = "checkbox";
        this.doneCheckBox.name = "Done";
        this.doneCheckBox.className = "done-checkbox";
        this.doneCheckBox.addEventListener("click", function() {
            self._setDone();
        });
        this.div.appendChild(this.doneCheckBox);

        this.deleteBtn = document.createElement("button");
        // TODO replace with constant/symbol
        this.deleteBtn.innerText = "Delete";
        this.deleteBtn.className = "delete-button";
        this.div.appendChild(this.deleteBtn);

        document.getElementById("task-list").appendChild(this.div);
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