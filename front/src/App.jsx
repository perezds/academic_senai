import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./pages/login/login.jsx";
import Home from "./pages/home/home.jsx";
import Env from "./pages/environments";
import Disciplinas from "./pages/disciplina/index.jsx";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/environments" element={<Env />}/>
        <Route path="/disciplinas" element={<Disciplinas />}/>
      </Routes>
    </Router>
  )
}

export default App