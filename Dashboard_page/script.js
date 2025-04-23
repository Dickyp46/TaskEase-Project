const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");
const statusSummary = document.getElementById("statusSummary");

let tasks = [];

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("taskTitle").value;
  const desc = document.getElementById("taskDesc").value;
  const priority = document.getElementById("taskPriority").value;
  const status = document.getElementById("taskStatus").value;
  const date = document.getElementById("taskDate").value || new Date().toISOString().split("T")[0];
  const image = document.getElementById("taskImage").value;

  const task = { title, desc, priority, status, date, image };
  tasks.push(task);
  renderTasks();
  taskForm.reset();
  setTodayDate(); // reset date
});

function renderTasks() {
  taskList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.classList.add("task-card");

    const imgElement = task.image && task.image.trim() !== ""
      ? `<img src="${task.image}" alt="task image" />`
      : `<div class="placeholder-box"></div>`;

    card.innerHTML = `
      ${imgElement}
      <div class="task-info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
        <div class="task-meta">
          <span class="priority-${task.priority}">Priority: ${task.priority}</span>
          <span class="status-${task.status.replace(" ", "\\ ")}">Status: ${task.status}</span>
          <span>Created on: ${task.date}</span>
        </div>
      </div>
    `;

    if (task.status === "Completed") {
      completedList.appendChild(card);
    } else {
      taskList.appendChild(card);
    }
  });

  updateStatusStats();
}

function updateStatusStats() {
  const total = tasks.length || 1;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const notStarted = tasks.filter(t => t.status === "Not Started").length;

  const pct = (x) => Math.round((x / total) * 100);

  statusSummary.innerHTML = `
    <div>✅ Completed: <strong>${pct(completed)}%</strong></div>
    <div>🔵 In Progress: <strong>${pct(inProgress)}%</strong></div>
    <div>🔴 Not Started: <strong>${pct(notStarted)}%</strong></div>
  `;
}

function setTodayDate() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("taskDate").value = today;
  document.getElementById("currentDate").textContent = today;
}

// Set default date on page load
window.addEventListener("DOMContentLoaded", () => {
  setTodayDate();
});
