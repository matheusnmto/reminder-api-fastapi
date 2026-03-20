"use client";

import { useEffect, useState } from "react";
import { api } from "../services/api";
import { ReminderCreate, ReminderOut, ReminderUpdate } from "../types/reminder";
import ReminderCard from "../components/ReminderCard";
import ReminderForm from "../components/ReminderForm";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Loader2 } from "lucide-react";

export default function Home() {
  const [reminders, setReminders] = useState<ReminderOut[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReminder, setEditingReminder] = useState<ReminderOut | null>(null);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const data = await api.getReminders();
      setReminders(data);
    } catch (error) {
      console.error("Failed to load reminders", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdate = async (data: ReminderCreate | ReminderUpdate) => {
    try {
      if (editingReminder) {
        const updated = await api.updateReminder(editingReminder.id, data);
        setReminders((prev) =>
          prev.map((r) => (r.id === updated.id ? updated : r))
        );
        setEditingReminder(null);
      } else {
        const created = await api.createReminder(data);
        setReminders((prev) => [...prev, created]);
      }
    } catch (error) {
      console.error("Failed to save reminder", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteReminder(id);
      setReminders((prev) => prev.filter((r) => r.id !== id));
      if (editingReminder?.id === id) {
        setEditingReminder(null);
      }
    } catch (error) {
      console.error("Failed to delete reminder", error);
    }
  };

  return (
    <main className="min-h-screen p-6 md:p-12 lg:p-24 max-w-7xl mx-auto flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-4">
          <CalendarDays className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Stay on <span className="text-primary">Track.</span>
        </h1>
        <p className="text-foreground/60 max-w-xl mx-auto text-lg">
          Minimalist, dark-themed reminder app to help you stay productive. Focus on what matters.
        </p>
      </motion.div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-12">
            <ReminderForm 
              onSubmit={handleCreateOrUpdate} 
              editingReminder={editingReminder}
              onCancelEdit={() => setEditingReminder(null)}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="h-40 flex items-center justify-center text-primary">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : reminders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-card-border rounded-2xl bg-card/50"
            >
              <CalendarDays className="w-12 h-12 text-foreground/20 mb-3" />
              <p className="text-foreground/50">No reminders yet. Add one to get started.</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {reminders.map((reminder) => (
                  <ReminderCard
                    key={reminder.id}
                    reminder={reminder}
                    onEdit={setEditingReminder}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
