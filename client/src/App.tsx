import type { Component } from 'solid-js';

import styles from './App.module.css';
import HabitTracker from "./habit-tracker/HabitTracker";
import {JSX} from "solid-js";

const App: () => JSX.Element = () => {
  return (
    <div class={styles.App}>
        <HabitTracker></HabitTracker>
    </div>
  );
};

export default App;
