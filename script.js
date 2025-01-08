// Selectors
const taskInput = document.querySelector("#newtask input");
const taskSection = document.querySelector(".tasks");
const trashSection = document.querySelector(".trash");
const addButton = document.querySelector("#push");

// Event Listeners
taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") createTask();
});

addButton.addEventListener("click", createTask);

// Function to create a task
function createTask() {
    if (taskInput.value.trim() === "") {
        alert("The task field is blank. Enter a task name and try again.");
        return;
    }

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    // Create the task HTML
    const task = document.createElement("div");
    task.classList.add("task");
    const taskId = `task-${Date.now()}`;
    task.setAttribute("data-id", taskId);

    task.innerHTML = `
        <label>
            <input type="checkbox" onclick="updateTask(this)">
            <p>${taskInput.value}</p>
            <span class="date">${formattedDate}</span>
        </label>
        <div class="delete" onclick="deleteTask(this)">Delete</div>
    `;

    // Add the task to the task list
    taskSection.appendChild(task);

    // Clear the input field
    taskInput.value = "";

    // Adjust scroll behavior
    taskSection.scrollHeight > taskSection.clientHeight
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

function deleteTask(deleteButton) {
    const task = deleteButton.parentElement;
    const trashItem = task.cloneNode(true);

    // Remove delete button from trash and add restore button
    trashItem.querySelector(".delete").remove();
    const restoreButton = document.createElement("div");
    restoreButton.classList.add("restore");
    restoreButton.innerText = "Restore";
    restoreButton.onclick = function () {
        restoreTask(restoreButton);
    };
    trashItem.appendChild(restoreButton);

    // Move the task to the trash section
    trashSection.appendChild(trashItem);

    // Remove the task from the main task list
    task.remove();
}

// New restoreTask function
function restoreTask(restoreButton) {
    const trashItem = restoreButton.parentElement;
    const restoredTask = trashItem.cloneNode(true);

    // Remove restore button from the restored task
    restoredTask.querySelector(".restore").remove();

    // Add delete button back to the restored task
    const deleteButton = document.createElement("div");
    deleteButton.classList.add("delete");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
        deleteTask(deleteButton);
    };
    restoredTask.appendChild(deleteButton);

    // Move the task back to the main task list
    taskSection.appendChild(restoredTask);

    // Remove the task from the trash section
    trashItem.remove();
}
