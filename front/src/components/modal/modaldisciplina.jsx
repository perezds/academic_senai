import React, { useState, useEffect } from "react";
import './styles.css'; 

const ModalDisciplina = ({
  isOpen,
  onClose,
  disciplinaSelecionada,
  criar,
  atualizar
}) => {
  if (!isOpen) return null;


  const [id, setId] = useState(disciplinaSelecionada?.id || '');
  const [disciplina, setDisciplina] = useState(disciplinaSelecionada?.disciplina || '');
  const [sigla, setSigla] = useState(disciplinaSelecionada?.sigla || '');
  const [curso, setCurso] = useState(disciplinaSelecionada?.curso || '');
  const [semestre, setSemestre] = useState(disciplinaSelecionada?.semestre || '');
  const [cargaHoraria, setCargaHoraria] = useState(disciplinaSelecionada?.carga_horaria || '');

  useEffect(() => {
    if (disciplinaSelecionada) {
      setId(disciplinaSelecionada.id || '');
      setDisciplina(disciplinaSelecionada.disciplina || '');
      setSigla(disciplinaSelecionada.sigla || '');
      setCurso(disciplinaSelecionada.curso || '');
      setSemestre(disciplinaSelecionada.semestre || '');
      setCargaHoraria(disciplinaSelecionada.carga_horaria || '');
    } else {
      setId('');
      setDisciplina('');
      setSigla('');
      setCurso('');
      setSemestre('');
      setCargaHoraria('');
    }
  }, [disciplinaSelecionada]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaDisciplina = { disciplina, sigla, curso, semestre, carga_horaria: cargaHoraria };
    if (disciplinaSelecionada) {
      atualizar({ ...disciplinaSelecionada, ...novaDisciplina });
    } else {
      criar(novaDisciplina);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{disciplinaSelecionada ? "Editar Disciplina" : "Cadastrar Disciplina"}</h2>
        <div className="body_modal">
          <form onSubmit={handleSubmit}>
            <div className="caixa1">
              <input
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                placeholder="Disciplina"
                required
              />
              <input
                value={sigla}
                onChange={(e) => setSigla(e.target.value)}
                placeholder="Sigla"
                required
              />
              <input
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                placeholder="Curso"
                required
              />
              <input
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                placeholder="Semestre"
                required
              />
              <input
                type="number"
                value={cargaHoraria}
                onChange={(e) => setCargaHoraria(e.target.value)}
                placeholder="Carga Horária"
                required
              />
            </div>
            <button type="submit">
              {disciplinaSelecionada ? "Atualizar" : "Salvar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalDisciplina;
