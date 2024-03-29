/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Router, Routes, Route } from '@solidjs/router';
import HabitTrackerPage from './HabitTrackerPage/HabitTrackerPage';


const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() =>
  <Router>
    <Routes>

      <Route path="/" component={App}>
        <Route path="/" component={() => <div>HOME</div>} />
        <Route path="/habit-tracker"  component={HabitTrackerPage}>
          <Route path="/"  component={HabitTrackerPage}/>
          <Route path="/create-habit" />
          <Route path="/update-habit/:id" />
          <Route path="/delete-habit/:id" />
        </Route>
      </Route>
    </Routes>
  </Router>, root!);

