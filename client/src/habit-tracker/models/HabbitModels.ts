  export type Habit = {
    id: string;
    description: string;
    bestStrike: number;
    stregth: "WEEK" | "MEDIUM" | "STRONG";
    month: number;
    year: number;
    dailyHabitRecords: ("DONE" | "NOT_DONE" | "SKIP") [];
  };
  


