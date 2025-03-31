import React, { useEffect, useState } from "react";

const ModalAmbiente = ({
  isOpen,
  onClose,
  ambienteSelecionado,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;

  console.log("Ambiente Selecionado: ", ambienteSelecionado);

  // Definindo os estados iniciais
  const [id, setId] = useState(ambienteSelecionado?.id || "");
  const [sala, setSala] = useState(ambienteSelecionado?.Sala || "");
  const [professor, setProfessor] = useState(ambienteSelecionado?.Professor || "");
  const [capacidade, setCapacidade] = useState(ambienteSelecionado?.Capacidade || "");
  const [linha, setLinha] = useState(ambienteSelecionado?.Linha || "");
  const [curso, setCurso] = useState(ambienteSelecionado?.Curso || "");
  const [materias, setMaterias] = useState(ambienteSelecionado?.Materias || "");
  const [inicio, setInicio] = useState(ambienteSelecionado?.Inicio || "");
  const [periodo, setPeriodo] = useState(ambienteSelecionado?.Periodo || "");

  // Atualizando o estado quando o ambienteSelecionado muda
  useEffect(() => {
    if (ambienteSelecionado) {
      setId(ambienteSelecionado.id || "");
      setSala(ambienteSelecionado.Sala || "");
      setProfessor(ambienteSelecionado.Professor || "");
      setCapacidade(ambienteSelecionado.Capacidade || "");
      setLinha(ambienteSelecionado.Linha || "");
      setCurso(ambienteSelecionado.Curso || "");
      setMaterias(ambienteSelecionado.Materias || "");
      setInicio(ambienteSelecionado.Inicio || "");
      setPeriodo(ambienteSelecionado.Periodo || "");
    } else {
      setId("");
      setSala("");
      setProfessor("");
      setCapacidade("");
      setLinha("");
      setCurso("");
      setMaterias("");
      setInicio("");
      setPeriodo("");
    }
  }, [ambienteSelecionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoAmbiente = {
      Sala: sala,
      Professor: professor,
      Capacidade: capacidade,
      Linha: linha,
      Curso: curso,
      Materias: materias,
      Inicio: inicio,
      Periodo: periodo,
    };
    
    // Se o ambiente foi selecionado, chamamos atualizar, senão chamamos criar
    if (ambienteSelecionado) {
      atualizar({ ...ambienteSelecionado, ...novoAmbiente });
    } else {
      criar(novoAmbiente);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{ambienteSelecionado ? "Editar Ambiente" : "Cadastrar Ambiente"}</h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={handleSubmit}>
              <input
                className="input_modal"
                value={sala}
                onChange={(e) => setSala(e.target.value)}
                placeholder="SALA"
              />
              <input
                className="input_modal"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                placeholder="PROFESSOR"
              />
              <input
                className="input_modal"
                value={capacidade}
                onChange={(e) => setCapacidade(e.target.value)}
                placeholder="CAPACIDADE"
              />
              <input
                className="input_modal"
                value={linha}
                onChange={(e) => setLinha(e.target.value)}
                placeholder="LINHA"
              />
              <input
                className="input_modal"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                placeholder="CURSO"
              />
              <input
                className="input_modal"
                value={materias}
                onChange={(e) => setMaterias(e.target.value)}
                placeholder="MATERIAS"
              />
              <input
                className="input_modal"
                type="date"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
                placeholder="INÍCIO"
              />
              <input
                className="input_modal"
                type="time"
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                placeholder="PERÍODO"
              />
              <button type="submit">
                {ambienteSelecionado ? "Atualizar" : "Salvar"}
              </button>
            </form>
          </div>
          <div className="caixa2">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAmbiente;
