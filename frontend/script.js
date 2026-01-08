const API_URL = "http://127.0.0.1:8000/reminders";

const form = document.getElementById("reminder-form");
const list = document.getElementById("reminder-list");
const submitBtn = document.getElementById("submit-btn");

let editingReminderId = null;

async function loadReminders() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error();

        const reminders = await response.json();
        list.innerHTML = "";

        if (reminders.length === 0) {
            list.innerHTML = "<li>Nenhum lembrete ainda.</li>";
            return;
        }

        reminders.forEach(reminder => {
            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${reminder.title}</strong> - ${reminder.message}
                <div>
                    <button onclick="editReminder(${reminder.id}, '${reminder.title}', '${reminder.message}')">✏️</button>
                    <button onclick="deleteReminder(${reminder.id})">🗑️</button>
                </div>
            `;

            list.appendChild(li);
        });
    } catch {
        alert("Erro ao carregar lembretes");
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const message = document.getElementById("message").value;

    try {
        if (editingReminderId) {
            await fetch(`${API_URL}/${editingReminderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, message })
            });

            editingReminderId = null;
            submitBtn.textContent = "Adicionar";
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, message })
            });
        }

        form.reset();
        loadReminders();
    } catch {
        alert("Erro ao salvar lembrete");
    }
});

async function deleteReminder(id) {
    if (!confirm("Deseja excluir este lembrete?")) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadReminders();
    } catch {
        alert("Erro ao deletar lembrete");
    }
}

function editReminder(id, title, message) {
    document.getElementById("title").value = title;
    document.getElementById("message").value = message;

    editingReminderId = id;
    submitBtn.textContent = "Salvar";
}

loadReminders();
