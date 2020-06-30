class TaskManager {
    constructor() {
        this.tasks = []
    }

    addTask(t) {
        this.tasks.push(t);
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
    console.log("created new task: ", t);
}

// Bind button functions
let addButton = document.getElementById("add-button");
addButton.addEventListener("click", addTask);

let clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearInput);