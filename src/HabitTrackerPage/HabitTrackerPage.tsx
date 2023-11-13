import { batch, Component, createMemo, createResource, createSignal, For, onMount, Show } from "solid-js";
import { DateTime } from "luxon";
import { Habit } from "../shared/models/Habit/HabitModels";
import { Params, Route, useLocation, useMatch, useNavigate, useParams } from '@solidjs/router';
import { CreateHabitDialog } from './CreateHabitDialog/CreateHabitDialog';
import { ConformationalDialog } from '../shared/ConformationalDialog/ConformationalDialog';
import { fetchHabits, deleteHabit } from './HabitTrackerService';
import { HabitList } from './HabitList/HabitList';

export type Month = {
  id: number;
  monthName: string;
};

const HabitTrackerPage: Component = () => {

  const location = useLocation();
  const pathname = createMemo(() => location.pathname);
  const navigate = useNavigate();
  const matchCreateHabitPath = useMatch(() => '/habit-tracker/create-habit');
  const matchUpdateHabitPath = useMatch(() => '/habit-tracker/update-habit/:id');
  const matchDeleteHabitPath = useMatch(() => '/habit-tracker/delete-habit/:id');


  const [tmpHabit, setTmpHabit] = createSignal<Habit>({
    id: null,
    description: '',
    habitRecords: []
  });

  const [selectedMonth, setSelectedMonth] = createSignal(DateTime.now().month);
  const [selectedYear, setSelectedYear] = createSignal(DateTime.now().year);
  const [habits, { mutate, refetch }] = createResource(() => fetchHabits(selectedMonth(), selectedYear()));

  const handleCreateHabit = () => {
    navigate(pathname() + "/create-habit")
  }

  const handleUpdateHabit = (habit: Habit) => {
    setTmpHabit(habit);
    navigate(pathname() + "/update-habit/" + habit.id);
  }

  const handleConfirmDelete = async () => {
    await deleteHabit(tmpHabit());
    navigate('/habit-tracker/');
    refetch();
  }



  const onSearch = () => refetch();


  return (
    <>
      <Show
        when={Boolean(matchCreateHabitPath())}>
        <CreateHabitDialog close={() => navigate(pathname())} confirm={() => refetch()} habit={{
          id: null,
          description: '',
          habitRecords: []
        }} />
      </Show>

      <Show
        when={Boolean(matchUpdateHabitPath())}>
        <CreateHabitDialog close={() => navigate('/habit-tracker/')} confirm={() => refetch()} habit={tmpHabit()} />
      </Show>

      <Show
        when={matchDeleteHabitPath()}>
        <ConformationalDialog cancel={() => navigate('/habit-tracker/')} confirm={handleConfirmDelete} description='Are you sure you want to delete habit'></ConformationalDialog>
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
                      <input onInput={(e) => {
                        setSelectedMonth(parseInt(e.target.value));
                      }} type="text" name="month" id="month" autocomplete="month" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"></input>
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="year" class="block text-sm font-medium leading-6 text-gray-900">Year</label>
                    <div class="mt-2">
                      <input onInput={(e) => {
                        setSelectedYear(parseInt(e.target.value));
                      }} type="text" name="year" id="year" autocomplete="year" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"></input>
                    </div>
                  </div>

                  <button onClick={onSearch} class="focus:ring-2 focus:ring-offset-2 focus:bg-slate-800 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-slate-900 hover:bg-slate-800 focus:outline-none rounded">
                    <p class="text-sm font-medium leading-none text-white">
                      Search
                    </p>
                  </button>
                  <button onClick={handleCreateHabit} class="focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-slate-950 hover:bg-slate-800 focus:outline-none rounded">
                    <p class="text-sm font-medium leading-none text-white">
                      Start new habit
                    </p>
                  </button>
                </div>
              </div>
            </div>

          </div>
          <div class="mt-7 overflow-x-auto">
            <span>{habits.loading && "Loading..."}</span>
            <span>{habits.error && "Something went wrong..."}</span>

            {!habits.loading && <HabitList
              selectedMonth={selectedMonth()}
              selectedYear={selectedYear()}
              updateHabit={handleUpdateHabit}
              deleteHabit={deleteHabit}
              habits={habits()}></HabitList>}

          </div>
        </div>
      </div>
    </>
  );
};

export default HabitTrackerPage;
