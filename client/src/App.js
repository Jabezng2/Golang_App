import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TaskView from "./components/tasks/TaskView";
import TaskList from "./components/tasks/TaskList";

function App() {
  return (
   <Router>
     <Routes>
       <Route index element={<TaskList />} />
       <Route path="/profile/:id" element={<TaskView />} />
     </Routes>
   </Router>
  );
}

export default App;
