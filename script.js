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
        let div = document.createElement("div");
        div.className = "task";

        let taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.value = this.text;
        div.appendChild(taskInput);

        let doneBtn = document.createElement("button");
        // TODO replace with constant/symbol
        doneBtn.innerHTML = "Done";
        doneBtn.className = "done-button";
        div.appendChild(doneBtn);

        let deleteBtn = document.createElement("button");
        // TODO replace with constant/symbol
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className = "delete-button";
        div.appendChild(deleteBtn);

        document.getElementById("task-list").appendChild(div);
    }

    setText(t) {
        this.text = t;
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