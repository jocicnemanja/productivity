/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Router, Routes, Route } from '@solidjs/router';
import HabitTrackerPage from './habit-tracker/HabitTrackerPage';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() => 
<Router>
  <Routes>
    <Route path="/" component={App} >
    <Route path="/" component={()=> <div>HOME</div>} />
    <Route path="/habit-tracker" >
    <Route path="/" component={HabitTrackerPage} >
      
      </Route>
      <Route path="/add-new-habit" component={()=> <div>And new Habit page</div>} >
      
      </Route>
    </Route>
    </Route>

  </Routes>
</Router>, root!);

