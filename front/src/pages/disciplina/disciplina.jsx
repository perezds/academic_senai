import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'; 
import './disciplina.css';
import ModalDisciplina from "../../components/modal/index.jsx"; 
import Head from '../../components/head/index.jsx';
import Footer from '../../components/footer/index.jsx';

export default function Home() {
    const [dados, setDados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token');
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
    const [texto, setTexto] = useState('');

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/disciplina", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDados(response.data);
                console.log("Response Data:", response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);

    const atualizar = async (disciplinaSelecionada) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/disciplina/${disciplinaSelecionada.id}`,
                {
                    nome: disciplinaSelecionada.nome,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDados(dados.map((disciplina) => disciplina.id === disciplinaSelecionada.id ? disciplinaSelecionada : disciplina));
            setModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/disciplina/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDados(dados.filter(disciplina => disciplina.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const criar = async (novaDisciplina) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/disciplina',
                {
                    nome: novaDisciplina.nome,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setDados([...dados, response.data]);
            setModalOpen(false);
        } catch (error) {
            console.error("Erro ao criar disciplina:", error);
        }
    };

    const search = async (texto) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/disciplina/search/?search=${texto}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setDisciplinaSelecionada(response.data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="main">
            <Head />
            <div className="container_home">
                <section className="section_home">
                    <div className="table">
                        {dados.map((disciplina) => (
                            <div key={disciplina.id} className="lista">
                                <div className="col1">
                                    <FaEdit className="edit" onClick={() => { setModalOpen(true), setDisciplinaSelecionada(disciplina) }} />
                                </div>
                                <div className="col2">
                                    <FaTrash className="delete" onClick={() => apagar(disciplina.id)} />
                                </div>
                                <div className="col3">
                                    <span className="id">{disciplina.id}</span>
                                </div>
                                <div className="col4">
                                    <span className="nome">{disciplina.nome}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="footer">
                        <div className="btn1">
                            <FaPlus className="adicionar" onClick={() => { setModalOpen(true), setDisciplinaSelecionada(null) }} />
                        </div>
                        <div className="pesquisar">
                            <input
                                placeholder="Nome da disciplina"
                                value={texto}
                                onChange={(e) => { setTexto(e.target.value) }}
                            />
                        </div>
                        <div className="btn2">
                            <FaSearch className="procurar" onClick={() => search(texto)} />
                        </div>
                    </div>
                    <ModalDisciplina
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        disciplinaSelecionada={disciplinaSelecionada}
                        setDisciplinaSelecionada={setDisciplinaSelecionada}
                        criar={criar}
                        atualizar={atualizar}
                    />
                </section>
            </div>
            <Footer />
        </main>
    );
}
