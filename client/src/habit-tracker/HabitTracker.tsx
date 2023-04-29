import { Component, createSignal, For } from "solid-js";
import { Dropdown, Table } from "solid-bootstrap";
import { createStore } from "solid-js/store";
import { DateTime } from "luxon";
import { Habit} from "./models/HabbitModels";
import { fakeHabitsData } from "./models/FakeHabitsData";

export type Month = {
  id: number;
  monthName: string;
};

const HabitTracker: Component = () => {
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

  const onYearChange = (year: Month) => {};

  const onMonthChange = (month: Month) => {
    setSelcetedMonth(month);
  };

  const thForSelectedMonth = (month: Month) => {
    const days = [];
    for (let i = 1; i <= daysInMonth(); i++) {
      days.push(<th>{i}</th>);
    }
    return days;
  };



  return (
    <div>
      TTEST123
      <h1>Month: {selectedMonth()?.monthName}</h1>
      <h2>daysInSelectedMonth: {daysInMonth()}</h2>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select month
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <For each={months}>
            {(month, i) => (
              <Dropdown.Item onClick={() => onMonthChange(month)}>
                {month.monthName}
              </Dropdown.Item>
            )}
          </For>
        </Dropdown.Menu>
      </Dropdown>
      <Table responsive="sm" bordered hover>
        <thead>
          <tr>
            <th>Habit name</th>
            {thForSelectedMonth(selectedMonth())}
          </tr>
        </thead>
        <tbody>
          <For each={fakeHabitsData}>
            {(habit: Habit) => (
              <tr>
                <td>{habit.description}</td>
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
      </Table>
    </div>
  );
};

export default HabitTracker;
