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
        this.div = document.createElement("div");
        this.div.className = "task";

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
        let taskDesc = document.createElement("input");
        taskDesc.type = "text";
        taskDesc.value = this.text;

        //let self = this;
        //taskDesc.addEventListener("click", function () {
        //    if (!self.taskDesc) {
        //        return''
        //    }

        //    if (self.taskDesc instanceof HTMLParagraphElement) {
        //        let input = document.createElement("input");
        //        input.type = "text";
        //        input.value = taskDesc.innerText;
        //        self.taskDesc.parentNode.replaceChild(input, self.taskDesc);
        //        self.taskDesc = input;
        //    } else {
        //        let p = document.createElement("p");
        //        p.innerText = self.taskDesc.value;
        //        self.taskDesc.parentNode.replaceChild(p, self.taskDesc);
        //    }
        //});
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

let taskManager = new TaskManager();

// Bind button functions
let addBtn = document.getElementById("add-button");
addBtn.addEventListener("click", addTask);

let clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener("click", clearInput);