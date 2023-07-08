  export type Habit = {
    id: string | null;
    description: string;
    bestStrike: number;
    strength: "WEEK" | "MEDIUM" | "STRONG";
    month: number;
    year: number;
    dailyRecords: ("DONE" | "NOT_DONE" | "SKIP") [];
  };

  export type NewHabit = Omit<Habit, 'id'>;



