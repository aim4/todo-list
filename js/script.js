// Refactor time
const COMPLETED_CLASS = "completed";
const DRAGGABLE_CLASS = "draggable";
const DRAGGING_CLASS = "dragging";
const HOVERING_CLASS = "hovering";
const STRIKE_CLASS = "strike";
const TASK_CLASS = "task";

class Task {
    constructor(t) {
        this.text = t;
        this.completed = false;
        this._createElement();
    }

    _createElement() {
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
        div.className = TASK_CLASS;
        div.draggable = true;
        div.classList.add(DRAGGABLE_CLASS);

        const self = this;
        div.addEventListener("dragstart", function (e) {
            e.stopPropagation();
            self.div.classList.add(DRAGGING_CLASS);
        });

        div.addEventListener("dragend", function (e) {
            e.preventDefault();
            self.div.classList.remove(DRAGGING_CLASS);
        });

        div.addEventListener("mouseover", function () {
            self.div.classList.add(HOVERING_CLASS);
        })

        div.addEventListener("mouseleave", function () {
            self.div.classList.remove(HOVERING_CLASS);
        })
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
        deleteBtn.addEventListener("click", function () {
            deleteBtn.parentNode.parentNode.removeChild(deleteBtn.parentNode);
        })
        return deleteBtn;
    }

    _setDone() {
        this.completed = !this.completed;
        if (this.completed) {
            this.taskDesc.className = STRIKE_CLASS;
            this.div.classList.add(COMPLETED_CLASS);
        } else {
            this.taskDesc.className = "";
            this.div.classList.remove(COMPLETED_CLASS);
        }
    }
}

function clearInput(e) {
    let input = document.getElementById("task-input");
    input.value = "";
}

function addTask(e) {
    let input = document.getElementById("task-input");
    if (input.value === "") {
        // TODO add a warning
        console.log("No input");
        return;
    }

    let t = new Task(input.value);
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

function hideCompleteTasks(container) {
    for (let i = 0; i < container.children.length; i++) {
        if (container.children[i].classList.contains(COMPLETED_CLASS)) {
            container.children[i].style.display = "none";
        } else {
            container.children[i].style.display = "";
        }
    }
}

function showCompleteTasks(container) {
    for (let i = 0; i < container.children.length; i++) {
        if (!container.children[i].classList.contains(COMPLETED_CLASS)) {
            container.children[i].style.display = "none";
        } else {
            container.children[i].style.display = "";
        }
    }
}

function showAllTasks(container) {
    for (let i = 0; i < container.children.length; i++) {
        container.children[i].style.display = "";
    }
}

// Main

// Set drag and drop functionality
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

// Bind buttons for new task input
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", addTask);

let clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", clearInput);

// Bind buttons for viewing task categories
let allTasksBtn = document.getElementById("all-tasks-btn");
allTasksBtn.addEventListener("click", function () {
    showAllTasks(taskContainer);
})

let inProgressTasksBtn = document.getElementById("in-progress-tasks-btn");
inProgressTasksBtn.addEventListener("click", function () {
    hideCompleteTasks(taskContainer);
});

let completedTasksBtn = document.getElementById("completed-tasks-btn");
completedTasksBtn.addEventListener("click", function () {
    showCompleteTasks(taskContainer);
});

// Clear task input on load
document.addEventListener("DOMContentLoaded", function () {
    clearInput();
});