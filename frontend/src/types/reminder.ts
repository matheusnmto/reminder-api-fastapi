export interface ReminderCreate {
  title: string;
  message: string;
}

export interface ReminderUpdate {
  title: string;
  message: string;
}

export interface ReminderOut {
  id: number;
  title: string;
  message: string;
}
