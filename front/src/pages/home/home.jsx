import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './home.css';
import ModalProfessores from "../../components/modal/modal.jsx";
import Head from '../../components/header/header.jsx'; // Importando o Header
import Footer from '../../components/footer/footer.jsx'; // Importando o Footer

export default function Home() {
    const [dados, setDados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token');
    const [professorSelecionado, setProfessorSelecionado] = useState(null);
    const [texto, setTexto] = useState('');
    const [up, setUp] = useState(false);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/professores", {
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
    }, [up]);

    const apagar = async (id) => {
        
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setDados(dados.filter(professor => professor.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };


    const search = async (texto) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/search/?search=${texto}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setProfessorSelecionado(response.data[0]);
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
                        {dados.map((professor) => (
                            <div key={professor.id} className="lista">
                                <div className="col1">
                                    <FaEdit className="edit" onClick={() => { setModalOpen(true), setProfessorSelecionado(professor) }} />
                                </div>
                                <div className="col2">
                                    <FaTrash className="delete" onClick={() => apagar(professor.id)} />
                                </div>
                                <div className="col3">
                                    <span className="id">{professor.id}</span>
                                </div>
                                <div className="col4">
                                    <span className="ni">{professor.ni}</span>
                                </div>
                                <div className="col5">
                                    <span className="nome">{professor.nome}</span>
                                </div>
                                <div className="col6">
                                    <span className="email">{professor.email}</span>
                                </div>
                                <div className="col7">
                                    <span className="cel">{professor.cel}</span>
                                </div>
                                <div className="col8">
                                    <span className="ocup">{professor.ocup}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="footer">
                        <div className="btn1">
                            <FaPlus className="adicionar" onClick={() => { setModalOpen(true), setProfessorSelecionado(null) }} />
                        </div>
                        <div className="pesquisar">
                            <input
                                placeholder="Nome do professor"
                                value={texto}
                                onChange={(e) => { setTexto(e.target.value) }}
                            />
                        </div>
                        <div className="btn2">
                            <FaSearch className="procurar" onClick={() => { setModalOpen(true), search(texto) }} />
                        </div>
                    </div>

                    <ModalProfessores
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        professorSelecionado={professorSelecionado}
                        up={up}
                        setUp={setUp}
                    />

                </section>
            </div>

            {/* Incluindo o Footer aqui */}
            <Footer />
        </main>
    );
}
