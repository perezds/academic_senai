import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import debounce from 'lodash.debounce';  // IMPORTANDO O DEBOUNCE CORRETAMENTE
import '../turma/turma.css';  
import ModalTurmas from "../../components/modal/modal.jsx";
import Head from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx'; 

export default function Turmas() {
    const [dados, setDados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token');
    const [turmaSelecionada, setTurmaSelecionada] = useState(null);
    const [texto, setTexto] = useState('');
    const [up, setUp] = useState(false);

    // Verifica se o token existe
    if (!token) {
        alert("Você precisa estar logado para acessar essa página.");
        // Aqui você pode redirecionar o usuário para a página de login
        return null;
    }

    // Função para buscar os dados da API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/turmas", {
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
    }, [up, token]);

    // Função para apagar uma turma
    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/turmas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setDados(dados.filter(turma => turma.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Função de pesquisa com debounce
    const search = debounce(async (texto) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/turmas/search/?search=${texto}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setTurmaSelecionada(response.data[0]);
        } catch (error) {
            console.error("Erro na pesquisa:", error);
        }
    }, 500); // 500ms de delay para debouncing

    // Atualiza a pesquisa conforme o texto
    useEffect(() => {
        if (texto) {
            search(texto);
        } else {
            setTurmaSelecionada(null); // Limpa a seleção se o campo estiver vazio
        }

        return () => search.cancel(); // Cancela o debounce ao desmontar o componente
    }, [texto, token]);

    return (
        <main className="main">
            <Head /> 

            <div className="container_turma">
                <section className="section_turma">
                    <div className="table">
                        {dados.map((turma) => (
                            <div key={turma.id} className="lista">
                                <div className="col1">
                                    <FaEdit className="edit" onClick={() => { setModalOpen(true), setTurmaSelecionada(turma) }} />
                                </div>
                                <div className="col2">
                                    <FaTrash className="delete" onClick={() => apagar(turma.id)} />
                                </div>
                                <div className="col3">
                                    <span className="id">{turma.id}</span>
                                </div>
                                <div className="col4">
                                    <span className="codigo">{turma.codigo}</span>
                                </div>
                                <div className="col5">
                                    <span className="turma">{turma.turma}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="footer">
                        <div className="btn1">
                            <FaPlus className="adicionar" onClick={() => { setModalOpen(true), setTurmaSelecionada(null) }} />
                        </div>
                        <div className="pesquisar">
                            <input
                                placeholder="Código ou Turma"
                                value={texto}
                                onChange={(e) => { setTexto(e.target.value) }}
                            />
                        </div>
                        <div className="btn2">
                            <FaSearch className="procurar" onClick={() => { search(texto) }} />
                        </div>
                    </div>

                    <ModalTurmas
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        turmaSelecionada={turmaSelecionada}
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
