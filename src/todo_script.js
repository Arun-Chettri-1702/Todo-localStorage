document.addEventListener("DOMContentLoaded", () => {
  let inputBox = document.getElementById("inputContainer");
  let entryButton = document.getElementById("AddButton");
  let todoTasks = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    renderTasks(task);
  });

  entryButton.addEventListener("click", () => {
    const taskText = inputBox.value.trim();
    if (taskText === "") return;
    let task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    storeTasks();
    renderTasks(task);
    inputBox.value = "";
  });

  function renderTasks(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `<span>${task.text}</span>
        <button>delete</button>`;
    li.classList.add("styler");

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("complete");
      storeTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => {
        if (task.id !== t.id) {
          return t;
        }
      });
      li.remove();
      storeTasks();
    });

    todoTasks.appendChild(li);
  }

  function storeTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
