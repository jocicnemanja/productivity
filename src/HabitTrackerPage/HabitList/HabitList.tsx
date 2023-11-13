import { For, createSignal } from 'solid-js'
import { Habit } from '../../shared/models/Habit/HabitModels'
import { DateTime } from 'luxon'
import { deleteHabit } from '../HabitTrackerService'

export type HabitListProps = {
    habits: Habit[],
    selectedYear: number,
    selectedMonth: number,
    updateHabit: (habit: Habit) => void,
    deleteHabit: (habit: Habit) => void
}

export const HabitList = (props: HabitListProps) => {

    const [currentDate] = createSignal(DateTime.now().toObject())
    const thForSelectedMonth = (month: number) => {
        const days = [];
        for (let i = 1; i <= new Date(props.selectedYear, props.selectedMonth, 0).getDate(); i++) {
            days.push(<th class="text-md font-semibold leading-6 text-gray-900" >{i}</th>);
        }
        return days;
    };

    const createOrUpdateRecord = (habit: Habit) => {

    }

    return (<><table class="w-full whitespace-nowrap">
        <thead>
            <tr>
                <th class="text-md font-semibold leading-6 text-gray-900">Habit</th>
                {thForSelectedMonth(props.selectedMonth)}
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <For each={props.habits}>
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
                                            onChange={(e) => createOrUpdateRecord(habit)}
                                            checked={dailyHabitRecord === "DONE"}
                                        />
                                    )}
                                </td>
                            )}
                        </For>
                        <td>
                            <button onClick={() => props.updateHabit(habit)} class="focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 mt-4 mr-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-slate-900 hover:bg-slate-800 focus:outline-none rounded">
                                <p class="text-sm font-medium leading-none text-white">
                                    Edit
                                </p>
                            </button>
                            <button onClick={() => props.deleteHabit(habit)} class="focus:ring-2 focus:ring-offset-2 focus:bg-slate-800 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-slate-900 hover:bbg-slate-800 focus:outline-none rounded">
                                <p class="text-sm font-medium leading-none text-white">
                                    Delete
                                </p>
                            </button>
                        </td>
                    </tr>
                )}
            </For>
        </tbody>
    </table></>)
}

