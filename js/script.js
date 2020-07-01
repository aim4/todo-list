// Might not need task manager

class TaskManager {
    constructor() {
        this.tasks = []
        this.selectedTask = null;
        this.draggedOver = null;
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

        //t.bindOnDragStart(function (e) {
        //    e.stopPropagation();
        //    self.selectedTask = t;
        //    console.log("dragged START task: ", t);
        //    t.div.classList.add("dragging");
        //});

        //t.bindOnDragOver(function (e) {
        //    e.preventDefault(); 
        //    let target = null;
        //    if (e.target instanceof HTMLDivElement && e.target.className === "task") {
        //        target = e.target;
        //    } else {
        //        target = e.target.parentNode;
        //    }
        //    if (!self.draggedOver) {
        //        self.draggedOver = target;
        //    } else if (self.draggedOver === target) {
        //        return;
        //    } else {
        //        self.draggedOver = target;
        //    }
        //    console.log("dragged OVER target: ", target);
        //    console.log("t is over: ", this);
        //    //console.log("dragged OVER selected: ", self.selectedTask);
        //    // TODO: drop the select task under the current task
        //    // Easiest thing to do is swap text
        //    let i = self.selectedTask.getText();
        //    let j = target.children[0].value;
        //    self.selectedTask.setText(j);
        //    target.children[0].value = i;
        //    //self.tasks[i] = target;
        //    //self.tasks[j] = self.selectedTask;

        //    //self.tasks.splice(i, 0, self.selectedTask);
        //});

        //t.bindOnDragEnd(function (e) {
        //    e.preventDefault();
        //    let target = null;
        //    if (e.target instanceof HTMLDivElement && e.target.className === "task") {
        //        target = e.target;
        //    } else {
        //        target = e.target.parentNode;
        //    }
        //    console.log("dragged END target: ", target);
        //    //console.log("dragged END target: ID ", self.selectedTask);
        //    //t.setBackgroundColor("hsla(156, 39%, 90%, 1)");
        //    t.div.classList.remove("dragging");
        //});
    }

    // Remove task at index if exists
    removeTask(t) {
        let removed = this._removeTaskFromTasksSuccess(t);
        if (removed) {
            t.delete();
        }
    }

    _removeTaskFromTasksSuccess(t) {
        let i = this.tasks.indexOf(t);
        let children = t.div.parentNode.children;
        console.log("i: ", i, children);
        if (i < 0 | i >= this.tasks.length) {
            return false;
        }
        this.tasks.splice(i, 1);
        return true;
    }

    // Get task at index
    getTasks() {
        return this.tasks;
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
        this.div = this._createDiv();
        this.taskDesc = this._createTaskDescription();
        this.doneBox = this._createDoneBox();
        this.label = this._createDoneLabel();
        this.deleteBtn = this._createDeleteBtn();

        this.div.appendChild(this.taskDesc);
        this.div.appendChild(this.doneBox);
        this.div.appendChild(this.label);
        this.div.appendChild(this.deleteBtn);
        document.getElementById("task-container").appendChild(this.div);
    }

    _createDiv() {
        let div = document.createElement("div");
        div.className = "task";
        div.draggable = true;
        div.classList.add("draggable");

        div.addEventListener("dragstart", function (e) {
            e.stopPropagation();
            self.div.classList.add("dragging");
        });

        div.addEventListener("dragend", function (e) {
            e.preventDefault();
            self.div.classList.remove("dragging");
        });
        return div;
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

    _setDone() {
        this.completed = !this.completed;
        if (this.completed) {
            this.taskDesc.className = "strike";
        } else {
            this.taskDesc.className = "";
        }
    }

    bindDeleteBtn(func) {
        this.deleteBtn.addEventListener("click", func);
    }

    setText(t) {
        this.taskDesc.value = t;
    }

    delete() {
        this.div.parentNode.removeChild(this.div);
    }

    getText() {
        return this.taskDesc.value;
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

// Return which element the currently dragged element is after/below
// Source: https://github.com/WebDevSimplified/Drag-And-Drop/blob/master/script.js
function getDragAfterElement(container, y) {
    // Get all draggables we are not currently dragging and convert to array
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")]
    // Find after element
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;

}

// Main
let taskManager = new TaskManager();

// Drop zone
let taskContainer = document.getElementById("task-container");
taskContainer.addEventListener("dragover", function (e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(taskContainer, e.clientY);
    const draggingTask = document.querySelector(".dragging");
    if (afterElement == null) {
        taskContainer.appendChild(draggingTask);
    } else {
        taskContainer.insertBefore(draggingTask, afterElement);
    }
});

// Bind button functions
let addBtn = document.getElementById("add-button");
addBtn.addEventListener("click", addTask);

let clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener("click", clearInput);

// Clear task input on load
document.addEventListener("DOMContentLoaded", function () {
    let input = document.getElementById("task-input");
    input.value = "";
});