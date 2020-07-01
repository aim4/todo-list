class TaskManager {
    constructor() {
        this.tasks = []
    }

    addTask(t) {
        if (!(t instanceof Task)) {
            return;
        }

        this.tasks.push(t);
        let self = this;
        t.bindDeleteBtn(function () {
            self.removeTask(t);
        });
    }

    // Remove task at index if exists
    removeTask(t) {
        let i = this.tasks.indexOf(t)
        if (i < 0 | i >= this.tasks.length) {
            return;
        }
        this.tasks.splice(i, 1);
        t.delete();
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
        this.div.draggable = true;
        this.div.ondragstart = function (e) {
            e.stopPropagation();
            e.dataTransfer.setData('text/plain', e.target.id);
            self.div.style.backgroundColor = "hsla(54, 93%, 88%, 1)";
        };

        this.div.ondragover = function (e) {
            e.preventDefault();
            console.log("dragged OVER : ", self);
            console.log("dragged OVER target: ", e.target);
            console.log("dragged OVER target: ID ", e.dataTransfer.getData('text'));
            // TODO: need to check what was dragged over
        }

        this.div.ondragend = function (e) {
            e.preventDefault();
            console.log("dragged END : ", self);
            console.log("dragged END target: ", e.target);
            console.log("dragged END target: ID ", e.dataTransfer.getData('text'));
            self.div.style.backgroundColor = "hsla(156, 39%, 90%, 1)";
        }

        // TODO: on clicking task text, change type to input
        this.taskDesc = this._createTaskDescription();
        this.doneBox = this._createDoneBox();
        this.label = this._createDoneLabel();
        this.deleteBtn = this._createDeleteBtn();

        this.div.appendChild(this.taskDesc);
        this.div.appendChild(this.doneBox);
        this.div.appendChild(this.label);
        this.div.appendChild(this.deleteBtn);
        document.getElementById("task-list").appendChild(this.div);
    }

    _createTaskDescription() {
        // https://stackoverflow.com/questions/35817220/how-can-i-make-a-nested-element-not-draggable-in-a-draggable-container
        let taskDesc = document.createElement("input");
        taskDesc.type = "text";
        taskDesc.value = this.text;
        taskDesc.addEventListener("mousedown", function (e) {
            e.stopPropagation;
            e.target.parentNode.draggable = false;
        });
        taskDesc.addEventListener("mouseup", function (e) {
            e.target.parentNode.draggable = true;
        });

        return taskDesc;
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
        // TODO replace with constant/symbol
        let deleteBtn = document.createElement("button");

        deleteBtn.innerText = "Delete";
        deleteBtn.className = "delete-button";
        return deleteBtn;
    }

    // TODO: add done function class or data thing
    _setDone() {
        this.completed = !this.completed;
        if (this.completed) {
            this.taskDesc.className = "strike";
        } else {
            this.taskDesc.className = "";
        }
    }

    setText(t) {
        this.text = t;
    }

    bindDeleteBtn(func) {
        this.deleteBtn.addEventListener("click", func);
    }

    delete() {
        this.div.parentNode.removeChild(this.div);
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

// TODO clear insert task input on load
let taskManager = new TaskManager();
//let allTasks = document.getElementById("all-tasks");
//allTasks.ondragend = function (e) {
//    e.preventDefault();
//    console.log("draged on all tasks");
//}

// Bind button functions
let addBtn = document.getElementById("add-button");
addBtn.addEventListener("click", addTask);

let clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener("click", clearInput);