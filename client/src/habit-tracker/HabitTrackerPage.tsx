import { batch, Component, createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { DateTime } from "luxon";
import { Habit } from "./models/HabitModels";
import { fakeHabitsData } from "./models/FakeHabitsData";
import { useNavigate } from '@solidjs/router';
import { AddOrEditHabitDialog } from './AddOrEditHabitDialog';

export type Month = {
  id: number;
  monthName: string;
};

const HabitTrackerPage: Component = () => {
  const [isAddEditHabitDialogOpen, setIsAddEditHabitDialogOpen] = createSignal(false);
  const [habits, setHabits]  = createSignal<Habit[]>(fakeHabitsData);

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };

  const [selectedYear, setSlecetedYear] = createSignal(DateTime.now().year);
  const [months] = createStore<Month[]>([
    { id: 1, monthName: "January" },
    { id: 2, monthName: "February" },
    { id: 3, monthName: "March" },
    { id: 4, monthName: "April" },
    { id: 5, monthName: "May" },
    { id: 6, monthName: "June" },
    { id: 7, monthName: "July" },
    { id: 8, monthName: "Agust" },
    { id: 9, monthName: "September" },
    { id: 10, monthName: "October" },
    { id: 11, monthName: "November" },
    { id: 12, monthName: "December" },
  ]);
  const [selectedMonth, setSelcetedMonth] = createSignal<Month>(
    months[DateTime.now().month]
  );
  const daysInMonth = () => getDaysInMonth(selectedYear(), selectedMonth().id);

  const onYearChange = (year: Month) => { };

  const onMonthChange = (month: Month) => {
    setSelcetedMonth(month);
  };


  const thForSelectedMonth = (month: Month) => {
    const days = [];
    for (let i = 1; i <= daysInMonth(); i++) {
      days.push(<th class="text-md font-semibold leading-6 text-gray-900" >{i}</th>);
    }
    return days;
  };

  const openNewHabit = () => {
    setIsAddEditHabitDialogOpen(true);
  }

  const onCloseAddEditHabitDialog = () => {
    setIsAddEditHabitDialogOpen(false);
  }

  const onAddEditHabitDialog = (habit: Habit) => {
    console.log('habit', habit);
    batch(()=> {
      setHabits([...habits(), habit]);
      console.log('habits()', habits());
      setIsAddEditHabitDialogOpen(false);
    })

  }

  return (
    <>
      <Show
        when={isAddEditHabitDialogOpen()}>
        <AddOrEditHabitDialog closeDialog={onCloseAddEditHabitDialog} addEditNewHabit={onAddEditHabitDialog} habit={null}></AddOrEditHabitDialog>
      </Show>
      <div class="sm:px-6 w-full">
        <div class="px-4 md:px-10 py-4 md:py-7">
        </div>
        <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div class="sm:flex items-center justify-between">
            <div class="flex items-center">

            </div>
            <button onClick={openNewHabit} class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
              <p class="text-sm font-medium leading-none text-white">
                Add new habit
              </p>
            </button>
          </div>
          <div class="mt-7 overflow-x-auto">
            <table class="w-full whitespace-nowrap">
              <thead>
                <tr>
                  <th class="text-md font-semibold leading-6 text-gray-900">Habit</th>
                  {thForSelectedMonth(selectedMonth())}
                </tr>
              </thead>
              <tbody>
                <For each={habits()}>
                  {(habit: Habit) => (
                    <tr
                      tabindex="0"
                      class="focus:outline-none h-16 border border-gray-100 rounded"
                    >
                                            <td class="text-sm font-semibold leading-6 text-gray-800">ID{habit.id}</td>
                      <td class="text-sm font-semibold leading-6 text-gray-800">{habit.description}</td>
                      <For each={habit.dailyRecords}>
                        {(dailyHabitRecord) => (
                          <td>
                            {dailyHabitRecord === "SKIP" ? (
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexCheckDefault"
                                disabled
                                style="background: grey"
                              />
                            ) : (
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexCheckDefault"
                                checked={dailyHabitRecord === "DONE" ? true : false}
                              />
                            )}
                          </td>
                        )}
                      </For>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HabitTrackerPage;
