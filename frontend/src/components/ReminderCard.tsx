"use client";

import { motion } from "framer-motion";
import { Edit2, Trash2, CheckCircle2 } from "lucide-react";
import { ReminderOut } from "../types/reminder";

interface ReminderCardProps {
  reminder: ReminderOut;
  onEdit: (reminder: ReminderOut) => void;
  onDelete: (id: number) => void;
}

export default function ReminderCard({ reminder, onEdit, onDelete }: ReminderCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.2 }}
      className="bg-card border border-card-border p-5 rounded-2xl shadow-lg hover:shadow-primary/10 hover:border-primary/50 transition-all group flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-foreground truncate mr-2">{reminder.title}</h3>
          <CheckCircle2 className="text-primary/70 w-5 h-5 flex-shrink-0" />
        </div>
        <p className="text-foreground/70 text-sm whitespace-pre-wrap flex-grow">{reminder.message}</p>
      </div>

      <div className="flex justify-end gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(reminder)}
          className="p-2 rounded-lg bg-foreground/5 hover:bg-primary/20 hover:text-primary transition-colors text-foreground/50"
          aria-label="Edit reminder"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(reminder.id)}
          className="p-2 rounded-lg bg-foreground/5 hover:bg-red-500/20 hover:text-red-400 transition-colors text-foreground/50"
          aria-label="Delete reminder"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
