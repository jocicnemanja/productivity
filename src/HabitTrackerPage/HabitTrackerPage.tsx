import { batch, Component, createMemo, createResource, createSignal, For, onMount, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { DateTime } from "luxon";
import { Habit } from "../shared/models/Habit/HabitModels";
import { fakeHabitsData } from "../shared/models/Habit/FakeHabitsData";
import { Params, Route, useLocation, useMatch, useNavigate, useParams } from '@solidjs/router';
import { NewHabitDialog } from './NewHabitDialog/NewHabitDialog';
import { ConformationalDialog } from '../shared/ConformationalDialog/ConformationalDialog';

export type Month = {
  id: number;
  monthName: string;
};

const HabitTrackerPage: Component = () => {

  const fetchHabits = async (month: number, year: number) =>
    (await fetch(`http://localhost:8080/api/v1/habits?month=${month}&year=${year}`)).json();
  const deleteHabit = async (habit: Habit) => (await fetch('http://localhost:8080/api/v1/habits', {
    method: "DELETE",
    body: JSON.stringify(habit),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }));

  const location = useLocation();
  const pathname = createMemo(() => location.pathname);
  const navigate = useNavigate();
  const matchAddNewHabitPath = useMatch(() => '/habit-tracker/add-new-habit');

  const [isDeleteHabitDialogOpen, setIsDeleteHabitDialogOpen] = createSignal(false);
  const [tmpHabit, setTmpHabit] = createSignal<Habit>({
    id: null,
    description: '',
    habitRecords: []
  });

  const [selectedMonth, setSelectedMonth] = createSignal(DateTime.now().month );
  const [selectedYear, setSelectedYear] = createSignal(DateTime.now().year);

  const [habits, { mutate, refetch }] = createResource(() => fetchHabits(selectedMonth(),selectedYear()));

  const onSearch = () => refetch();

  const [currentDate] = createSignal(DateTime.now().toObject())


  const thForSelectedMonth = (month: number) => {
    const days = [];
    for (let i = 1; i <=  new Date(selectedYear(), selectedMonth() , 0).getDate() ; i++) {
      days.push(<th class="text-md font-semibold leading-6 text-gray-900" >{i}</th>);
    }
    return days;
  };


  const handleAddHabit = () => {
    navigate(pathname() + "/add-new-habit")
  }

  const handleEditHabit = (habit: Habit) => {
    setTmpHabit(habit);
  }

  const handleAddEditHabitConfirm = (habit: Habit) => {
    refetch();
  }

  const handleDelete = (habit: Habit) => {
    setTmpHabit(habit);
    setIsDeleteHabitDialogOpen(true);
  }

  const handleConfirmDelete = async () => {
    await deleteHabit(tmpHabit());
    setIsDeleteHabitDialogOpen(false);
    refetch();
  }

  const saveRecord = (habit: Habit) => {

  }

  return (
    <>
      <Show
        when={Boolean(matchAddNewHabitPath())}>
        <NewHabitDialog habit={tmpHabit()} />
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
            <div class="flex">
              <div class="border-b border-gray-900/10 pb-12">

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <label for="month" class="block text-sm font-medium leading-6 text-gray-900">Month</label>
                    <div class="mt-2">
                      <input         onInput={(e) => {
          setSelectedMonth(parseInt(e.target.value));
        }} type="text" name="month" id="month" autocomplete="month" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="year" class="block text-sm font-medium leading-6 text-gray-900">Year</label>
                    <div class="mt-2">
                      <input         onInput={(e) => {
          setSelectedYear(parseInt( e.target.value));
        }} type="text" name="year" id="year" autocomplete="year" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                    </div>
                  </div>

                        <button onClick={onSearch} class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
              <p class="text-sm font-medium leading-none text-white">
              Search
              </p>
            </button>
                </div>
              </div>
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
                                onChange={(e) => saveRecord(habit)}
                                checked={dailyHabitRecord === "DONE"}
                              />
                            )}
                          </td>
                        )}
                      </For>
                      <td>
                        <button onClick={() => handleEditHabit(habit)} class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mt-4 mr-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
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
      <Route path="/" component={HabitTrackerPage} />
      <Route path="/add-new-habit" component={HabitTrackerPage} />
    </>
  );
};

export default HabitTrackerPage;
