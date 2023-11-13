import { Habit } from '../shared/models/Habit/HabitModels';


export const fetchHabits = async (month: number, year: number) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/habits?month=${month}&year=${year}`)
        return response.json();
    } catch (e) {
        handleErrorGlobally(e);
        return [];
    }
}


export const createHabit = async (habit: Habit) => {
    const response = await fetch('http://localhost:8080/api/v1/habits', {
      method: "POST",
      body: JSON.stringify(habit),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  })
    const results = await response.json();
    // props.confirm(results as Habit);
  }


export const deleteHabit = async (habit: Habit) => {
    try {
        return await fetch('http://localhost:8080/api/v1/habits', {
            method: "DELETE",
            body: JSON.stringify(habit),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    } catch (e) {
        handleErrorGlobally(e);
        return [];
    }
};


function handleErrorGlobally(e: any) {
    console.error('Error->', e);
}