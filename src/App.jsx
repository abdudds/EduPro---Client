import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import UserRouter from './Router/UserRouter';
import TutorRouter from "./Router/TutorRouter";

function App() {

  
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/*" element={<UserRouter />} />
          <Route exact path="/tutor/*" element={<TutorRouter />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
