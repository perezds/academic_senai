import React from 'react';
import './styles.css';
import Head from '../../components/head/index.jsx';
import Footer from '../../components/footer/index.jsx';

const Disciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      const response = await apiService.getDisciplinas();
      setDisciplinas(response.data);
    };
    fetchDisciplinas();
  }, []);

  const handleDelete = async (id) => {
    await apiService.deleteDisciplina(id);
    setDisciplinas(disciplinas.filter((disciplina) => disciplina.id !== id));
  };

  return (
    <div className="disciplinas-container">
      <h2>Disciplinas</h2>
      <ul>
        {disciplinas.map((disciplina) => (
          <li key={disciplina.id}>
            {disciplina.nome}
            <button onClick={() => handleDelete(disciplina.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Disciplinas;