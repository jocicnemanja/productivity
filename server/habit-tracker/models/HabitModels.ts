export type Habit = {
    id: string;
    description: string;
    bestStrike: number;
    stregth: "WEEK" | "MEDIUM" | "STRONG";
    monthlyRecords: MonthlyRecord[];
  };
  
 export type MonthlyRecord = {
    month: number;
    year: number;
    dailyRecords: ("DONE" | "NOT_DONE" | "SKIP") [];
 } 

 export type HabitDTO = {
    id: string;
    description: string;
    bestStrike: number;
    stregth: "WEEK" | "MEDIUM" | "STRONG";
    month: number;
    year: number;
    dailyRecords: ("DONE" | "NOT_DONE" | "SKIP") [];
  };
  


