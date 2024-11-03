document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const addTaskButton = document.getElementById("add");
  const storage = document.getElementById("storage");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTask(task) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.setAttribute("data-id", task.id);

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    storage.appendChild(taskItem);
  }

  
  tasks.forEach((task) => renderTask(task));

  
  addTaskButton.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask); 
    input.value = "";
  });


  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }


  function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    document.querySelector(`[data-id="${id}"]`).remove();
  }
});
