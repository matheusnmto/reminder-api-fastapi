"use client";

import { useState, useEffect } from "react";
import { ReminderCreate, ReminderOut } from "../types/reminder";
import { Plus, X, Save } from "lucide-react";

interface ReminderFormProps {
  onSubmit: (data: ReminderCreate) => Promise<void>;
  editingReminder?: ReminderOut | null;
  onCancelEdit?: () => void;
}

export default function ReminderForm({
  onSubmit,
  editingReminder,
  onCancelEdit,
}: ReminderFormProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingReminder) {
      setTitle(editingReminder.title);
      setMessage(editingReminder.message);
    } else {
      setTitle("");
      setMessage("");
    }
  }, [editingReminder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit({ title, message });
      if (!editingReminder) {
        setTitle("");
        setMessage("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-card-border p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-hover" />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          {editingReminder ? "Edit Reminder" : "New Reminder"}
        </h2>
        {editingReminder && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="p-1 rounded-full hover:bg-white/10 text-foreground/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground/80 mb-1.5">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-background border border-card-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="What do you need to do?"
            required
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-background border border-card-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none min-h-[100px]"
            placeholder="Add some details..."
            required
            maxLength={500}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !title.trim() || !message.trim()}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : editingReminder ? (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Add Reminder
            </>
          )}
        </button>
      </div>
    </form>
  );
}
