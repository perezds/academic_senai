import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ambiente.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalAmbiente from "../../components/modalambiente";  // Create a new Modal component
import Head from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';

export default function Ambientes() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ambienteSelecionado, setAmbienteSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/ambientes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const atualizar = async (ambienteAtualizado) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/ambientes/${ambienteAtualizado.id}`,
        {
          Sala: ambienteAtualizado.Sala,
          Professor: ambienteAtualizado.Professor,
          Capacidade: ambienteAtualizado.Capacidade,
          Linha: ambienteAtualizado.Linha,
          Curso: ambienteAtualizado.Curso,
          Materias: ambienteAtualizado.Materias,
          Inicio: ambienteAtualizado.Inicio,
          Periodo: ambienteAtualizado.Periodo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDados(
        dados.map((ambiente) =>
          ambiente.id === ambienteAtualizado.id
            ? ambienteAtualizado
            : ambiente
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar ambiente:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/ambientes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((ambiente) => ambiente.id !== id));
      } catch (error) {
        console.error("Erro ao apagar ambiente:", error);
      }
    }
  };

  const criar = async (novoAmbiente) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ambientes",
        {
          Sala: novoAmbiente.Sala,
          Professor: novoAmbiente.Professor,
          Capacidade: novoAmbiente.Capacidade,
          Linha: novoAmbiente.Linha,
          Curso: novoAmbiente.Curso,
          Materias: novoAmbiente.Materias,
          Inicio: novoAmbiente.Inicio,
          Periodo: novoAmbiente.Periodo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar ambiente:", error);
    }
  };

  const ambientesFiltrados = dados.filter((ambiente) =>
    ambiente.Sala.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="ambientes-container">
      <Head /> {/* Incluindo o Header aqui */}

      <div className="header">
        <button
          className="btn adicionar"
          onClick={() => {
            setModalOpen(true);
            setAmbienteSelecionado(null);
          }}
        >
          <FaPlus />
        </button>
        <input
          type="text"
          placeholder="Buscar ambiente"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <FaSearch />
      </div>

      <div className="ambientes-list">
        {ambientesFiltrados.length ? (
          ambientesFiltrados.map((ambiente) => (
            <div className="ambiente-item" key={ambiente.id}>
              <span>{ambiente.Sala}</span>
              <span>{ambiente.Professor}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  setAmbienteSelecionado(ambiente);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(ambiente.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum ambiente encontrado.</p>
        )}
      </div>

      {modalOpen && (
        <ModalAmbiente
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          ambienteSelecionado={ambienteSelecionado}
          criar={criar}
          atualizar={atualizar}
        />
      )}

      <Footer />
    </div>
  );
}
