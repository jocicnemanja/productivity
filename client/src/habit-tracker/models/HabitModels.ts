  export type Habit = {
    id: string | null;
    description: string;
    habitRecords:  [];
  };

  export type NewHabit = Omit<Habit, 'id'>;



