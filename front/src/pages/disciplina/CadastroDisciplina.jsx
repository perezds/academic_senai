import React, { useState } from 'react';
import apiService from '../services/apiService';
import './styles.css';

const CadastroDisciplina = ({ history }) => {
  const [disciplina, setDisciplina] = useState({ nome: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisciplina({ ...disciplina, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiService.createDisciplina(disciplina);
    history.push('/disciplinas');
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastrar Disciplina</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          value={disciplina.nome}
          onChange={handleChange}
          placeholder="Nome da Disciplina"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroDisciplina;