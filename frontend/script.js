const API_URL = "http://127.0.0.1:8000/reminders/";

const list = document.getElementById("reminder-list");
const form = document.getElementById("reminder-form");
const modal = document.getElementById("modal");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const addBtn = document.getElementById("add-btn");
const toggleThemeBtn = document.getElementById("toggle-theme");
const modalTitle = document.getElementById("modal-title");


let editingReminderId = null;

/* abrir modal */
addBtn.onclick = () => {
  modalTitle.textContent = "Novo lembrete";
  submitBtn.textContent = "Criar";
  editingReminderId = null;
  form.reset();
  modal.classList.remove("hidden");
};


/* fechar modal */
cancelBtn.onclick = () => {
  closeModal();
};

function closeModal() {
  modal.classList.add("hidden");
  form.reset();
  editingReminderId = null;
  submitBtn.textContent = "Criar";
  modalTitle.textContent = "Novo lembrete";
}

/* carregar lembretes */
async function loadReminders() {
  try {
    const response = await fetch(API_URL);
    const reminders = await response.json();

    list.innerHTML = "";

    reminders.forEach(reminder => {
      list.appendChild(createPostIt(reminder));
    });
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar lembretes");
  }
}

/* criar post-it */
function createPostIt(reminder) {
  const li = document.createElement("li");
  li.className = "post-it";

  const magnet = document.createElement("div");
  magnet.className = "magnet";

  const color = getRandomColor();
  magnet.innerHTML = `
    <span style="background:${color.dark}"></span>
    <span style="background:${color.light}"></span>
  `;

  li.appendChild(magnet);

  li.innerHTML += `
    <strong>${reminder.title}</strong>
    <p>${reminder.message}</p>
    <div class="actions">
      <button onclick="editReminder(${reminder.id}, '${reminder.title}', '${reminder.message}')">✏️</button>
      <button onclick="deleteReminder(${reminder.id})">🗑️</button>
    </div>
  `;

  return li;
}

/* submit */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const message = document.getElementById("message").value;

  try {
    if (editingReminderId) {
      await fetch(`${API_URL}${editingReminderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message })
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message })
      });
    }

    closeModal();
    loadReminders();

  } catch (err) {
    console.error(err);
    alert("Erro ao salvar lembrete");
  }
});

/* deletar */
async function deleteReminder(id) {
  if (!confirm("Excluir este lembrete?")) return;

  await fetch(`${API_URL}${id}`, { method: "DELETE" });
  loadReminders();
}

/* editar */
function editReminder(id, title, message) {
  modalTitle.textContent = "Editar lembrete";
  submitBtn.textContent = "Salvar alterações";

  document.getElementById("title").value = title;
  document.getElementById("message").value = message;

  editingReminderId = id;
  modal.classList.remove("hidden");
}

/* cores do ímã */
function getRandomColor() {
  const colors = [
    { dark: "#e74c3c", light: "#f1948a" },
    { dark: "#3498db", light: "#85c1e9" },
    { dark: "#2ecc71", light: "#82e0aa" },
    { dark: "#f1c40f", light: "#f9e79f" },
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

if (window.innerWidth > 1200) {
  document.body.classList.add("tv-mode");
  document.documentElement.requestFullscreen();
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleThemeBtn = document.getElementById("toggle-theme");

  function updateThemeIcon() {
    toggleThemeBtn.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  }

  // carregar tema salvo
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  if (toggleThemeBtn) {
    updateThemeIcon();

    toggleThemeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      updateThemeIcon();
    });
  }
});


loadReminders();
