import { batch, Component, createResource, createSignal, For, onMount, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { DateTime } from "luxon";
import { Habit } from "./models/HabitModels";
import { fakeHabitsData } from "./models/FakeHabitsData";
import { useNavigate } from '@solidjs/router';
import { AddOrEditHabitDialog } from './AddOrEditHabitDialog';
import { ConformationalDialog } from '../shared/ConformationalDialog/ConformationalDialog';

export type Month = {
  id: number;
  monthName: string;
};

const HabitTrackerPage: Component = () => {

  const fetchHabits = async () =>
    (await fetch(`http://localhost:8080/api/v1/habits`)).json();

  const deleteHabit = async (habit: Habit) =>
  (await fetch('http://localhost:8080/api/v1/habits', {
    method: "DELETE",
    body: JSON.stringify(habit),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }));

  const [isAddEditHabitDialogOpen, setIsAddEditHabitDialogOpen] = createSignal(false);
  const [isDeleteHabitDialogOpen, setIsDeleteHabitDialogOpen] = createSignal(false);
  const [tmpHabit, setTmpHabit] = createSignal<Habit | null>(null);

  // const [habits, setHabits]  = createSignal<Habit[]>([]);
  // const [selectedMonth, setSelectedMonth] = createSignal(DateTime.now().month);
  const [selectedYear, setSelectedYear] = createSignal(DateTime.now().year);

  const [habits, { mutate, refetch }] = createResource(fetchHabits);


  // onMount(async () => {
  //   const res = await fetch(`http://localhost:8080/api/v1/habits`);
  //   setHabits(await res.json());
  // });

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };


  const [months] = createStore<Month[]>([
    { id: 1, monthName: "January" },
    { id: 2, monthName: "February" },
    { id: 3, monthName: "March" },
    { id: 4, monthName: "April" },
    { id: 5, monthName: "May" },
    { id: 6, monthName: "June" },
    { id: 7, monthName: "July" },
    { id: 8, monthName: "August" },
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

  const [currentDate] = createSignal(DateTime.now().toObject())


  const thForSelectedMonth = (month: Month) => {
    const days = [];
    for (let i = 1; i <= daysInMonth(); i++) {
      days.push(<th class="text-md font-semibold leading-6 text-gray-900" >{i}</th>);
    }
    return days;
  };


  const handleAddHabit = () => {
    setTmpHabit({
      id: null,
      description: '',
      habitRecords: []
    });
    setIsAddEditHabitDialogOpen(true);
  }

  const handleEditHabit =(habit: Habit) => {
    setTmpHabit(habit);
    setIsAddEditHabitDialogOpen(true);
  }

  const handleAddEditHabitConfirm = (habit: Habit) => {
    refetch();
    setTmpHabit(null);
    setIsAddEditHabitDialogOpen(false);
  }

  const handleOnCloseAddEditHabitDialog = () => {
    setTmpHabit(null);
    setIsAddEditHabitDialogOpen(false);
  }

  const handleDelete = (habit: Habit) => {
    setTmpHabit(habit);
    setIsDeleteHabitDialogOpen(true);
  }

  const handleConfirmDelete = async () => {
    await deleteHabit(tmpHabit() as Habit);
    setIsDeleteHabitDialogOpen(false);
    setTmpHabit(null);
    refetch();
  }

  return (
    <>
      <Show
        when={isAddEditHabitDialogOpen()}>
        <AddOrEditHabitDialog closeDialog={handleOnCloseAddEditHabitDialog} onAddEditHabitResponse={handleAddEditHabitConfirm} habit={tmpHabit()}></AddOrEditHabitDialog>
      </Show>

      <Show
        when={isDeleteHabitDialogOpen()}>
        <ConformationalDialog description='Are you sure you want to delete habit' cancel={() => setIsDeleteHabitDialogOpen(false)} confirm={handleConfirmDelete}></ConformationalDialog>
      </Show>

      <div class="sm:px-6 w-full">
        <div class="px-4 md:px-10 py-4 md:py-7">
        </div>
        <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div class="sm:flex items-center justify-between">
            <div class="flex items-center">

            </div>
            <button onClick={handleAddHabit} class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
              <p class="text-sm font-medium leading-none text-white">
                Add new habit
              </p>
            </button>
          </div>
          <div class="mt-7 overflow-x-auto">
            <span>{habits.loading && "Loading..."}</span>
            <span>{habits.error && "Something went wrong..."}</span>

            {!habits.loading && <table class="w-full whitespace-nowrap">
              <thead>
                <tr>
                  <th class="text-md font-semibold leading-6 text-gray-900">Habit</th>
                  {thForSelectedMonth(selectedMonth())}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>


                <For each={habits()}>
                  {(habit: Habit) => (
                    <tr
                      tabindex="0"
                      class="focus:outline-none h-16 border border-gray-100 rounded"
                    >
                      <td class="text-sm font-semibold leading-6 text-gray-800 text-left pl-3" >{habit.description}</td>
                      <For each={habit.habitRecords}>
                        {(dailyHabitRecord, index) => (

                          <td class={index < currentDate() ? 'disabled' : ''} >
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
                      <td>
                        <button onClick={()=> handleEditHabit(habit)} class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mt-4 mr-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                          <p class="text-sm font-medium leading-none text-white">
                            Edit
                          </p>
                        </button>
                        <button onClick={() => handleDelete(habit)} class="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                          <p class="text-sm font-medium leading-none text-white">
                            Delete
                          </p>
                        </button>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>}

          </div>
        </div>
      </div>
    </>
  );
};

export default HabitTrackerPage;
