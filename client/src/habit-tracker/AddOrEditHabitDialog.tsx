import { Component, createSignal } from 'solid-js'
import { Habit, NewHabit } from './models/HabitModels'
import { createStore } from 'solid-js/store'
import { DateTime } from 'luxon'

interface AddOrEditHabitDialogProps {
  addEditNewHabit: (habit: Habit)=> void;
  closeDialog: () => void
}

export const AddOrEditHabitDialog = (props: AddOrEditHabitDialogProps) => {


  const [habit, setHabit] = createSignal<Habit>({
    id: null,
    description: '',
    bestStrike: 0,
    strength: 'WEEK',
    month: 0,
    year: 0,
    dailyRecords: []
  })
  return (
    <>
      <div class="relative z-100" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:max-w-5xl md:w-full m-3 md:mx-auto">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Start new habit</h3>
                    <div class="mt-2">
                      <form>
                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div class="sm:col-span-3">
                            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Habit name</label>
                            <div class="mt-2">
                              <input oninput={(e) => {
                                setHabit({ ...habit(), id: Math.random().toString(16).slice(2), description: e.target.value });
                              }}
                                type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                            </div>
                          </div>
                        </div>

                        <div class="col-span-full">
                          <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Habit Description</label>
                          <div class="mt-2">
                            <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                          </div>
                          <p class="mt-3 text-sm leading-6 text-gray-600">Example of good habit: <b>I will become a reader and I will read one page every day on my working desk after I finish my lunch at 02:00 pm </b></p>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={() => props.addEditNewHabit(habit())}
                >
                  Create new habit</button>
                <button
                  onClick={props.closeDialog}
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
