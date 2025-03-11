import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import './styles.css';

const EditarDisciplina = ({ match, history }) => {
  const [disciplina, setDisciplina] = useState({ nome: '' });

  useEffect(() => {
    const fetchDisciplina = async () => {
      const response = await apiService.getDisciplinas(match.params.id);
      setDisciplina(response.data);
    };
    fetchDisciplina();
  }, [match.params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisciplina({ ...disciplina, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiService.updateDisciplina(match.params.id, disciplina);
    history.push('/disciplinas');
  };

  return (
    <div className="editar-container">
      <h2>Editar Disciplina</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          value={disciplina.nome}
          onChange={handleChange}
          placeholder="Nome da Disciplina"
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditarDisciplina;