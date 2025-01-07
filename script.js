// Selectors
const taskInput = document.querySelector("#task-input");
const taskSection = document.querySelector(".tasks");
const addButton = document.querySelector("#push");

// Event Listeners
taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        createTask();
    }
});

addButton.addEventListener("click", createTask);

// Function to create a task
function createTask() {
    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("The task field is blank. Enter a task name and try again.");
        return;
    }

    // Create task HTML dynamically
    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
        <label>
            <input type="checkbox" onclick="updateTask(this)">
            <p>${taskValue}</p>
        </label>
        <div class="delete">&times;</div>
    `;

    // Append the task to the task section
    taskSection.appendChild(task);

    // Clear input field
    taskInput.value = "";

    // Handle delete functionality
    const deleteButton = task.querySelector(".delete");
    deleteButton.addEventListener("click", () => {
        task.remove();
    });

    // Handle overflow
    taskSection.scrollHeight >= 300
        ? taskSection.classList.add("overflow")
        : taskSection.classList.remove("overflow");
}

// Function to update task style when checked
function updateTask(checkbox) {
    const taskItem = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskItem.classList.add("checked");
    } else {
        taskItem.classList.remove("checked");
    }
}
