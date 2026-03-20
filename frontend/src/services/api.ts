import { ReminderCreate, ReminderOut, ReminderUpdate } from "../types/reminder";

const API_BASE = "http://127.0.0.1:8000/reminders";

export const api = {
  async getReminders(): Promise<ReminderOut[]> {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to fetch reminders");
    return res.json();
  },

  async createReminder(data: ReminderCreate): Promise<ReminderOut> {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create reminder");
    return res.json();
  },

  async updateReminder(id: number, data: ReminderUpdate): Promise<ReminderOut> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update reminder");
    return res.json();
  },

  async deleteReminder(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete reminder");
  },
};
