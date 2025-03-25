import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./pages/login/login.jsx";
import Home from "./pages/home/home.jsx";
import Env from "./pages/environments";
import Disciplinas from "./pages/disciplina/index.jsx";
import Turmas from "./pages/turma/turma.jsx"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/environments" element={<Env />}/>
        <Route path="/disciplinas" element={<Disciplinas />}/>
        <Route path="/turmas" element={<Turmas />}/>
      </Routes>
    </Router>
  )
}

export default App