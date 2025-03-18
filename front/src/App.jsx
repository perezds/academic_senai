import React, { useState } from 'react';
import ModalDisciplina from "./components/modal/modaldisciplina";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/login"
import Home from "./pages/home";
import Env from "./pages/environments";
import ModalDisciplina from './components/modal/modaldisciplina'
import './index.css'; 

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);


  const abrirModalParaCriar = () => {
    setModalOpen(true);
    setDisciplinaSelecionada(null); 
  };


  const abrirModalParaEditar = (disciplina) => {
    setModalOpen(true);
    setDisciplinaSelecionada(disciplina); 
  };


  const fecharModal = () => {
    setModalOpen(false);
  };

  const criarDisciplina = (novaDisciplina) => {
    console.log('Criando Disciplina:', novaDisciplina);
    fecharModal(); 
  };

  const atualizarDisciplina = (disciplinaAtualizada) => {
    console.log('Atualizando Disciplina:', disciplinaAtualizada);
    fecharModal(); 

  return (
    <div>
      <button onClick={abrirModalParaCriar}>Criar Disciplina</button>
      <button onClick={() => abrirModalParaEditar({ id: 1, disciplina: 'Matemática', sigla: 'MAT', curso: 'Engenharia', semestre: '1', carga_horaria: 60 })}>
        Editar Disciplina
      </button>

      <ModalDisciplina
        isOpen={modalOpen}
        onClose={fecharModal}
        disciplinaSelecionada={disciplinaSelecionada}
        criar={criarDisciplina}
        atualizar={atualizarDisciplina}
      />
    </div>
  );
};
}
export default Home;


