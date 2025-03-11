import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/login";
import Home from "./pages/home";
import Env from "./pages/environments";
import Disciplinas from "./pages/disciplina/disciplina";
import CadastroDisciplina from './pages/CadastroDisciplina';
import EditarDisciplina from './pages/EditarDisciplina';
import './index.css'; 


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/environments" element={<Env />}/>
        <Route path="/disciplinas" element={<Disciplinas />}/>
        <Route path="/disciplinas/cadastrar" component={CadastroDisciplina} />
        <Route path="/disciplinas/editar/:id" component={EditarDisciplina} />
        
      </Routes>
    </Router>
  );
}

export default App;