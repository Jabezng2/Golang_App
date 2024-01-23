import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ViewTask from "./components/tasks/ViewTask";
import List from "./components/tasks/List";

function App() {
  return (
   <Router>
     <Routes>
       <Route index element={<List />} />
       <Route path="/profile/:id" element={<ViewTask />} />
     </Routes>
   </Router>
  );
}

export default App;
