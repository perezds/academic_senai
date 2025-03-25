import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './curso.css'; // Estilos para a página de cursos
import ModalCursos from "../../components/modal/modal.jsx"; // Modal para adicionar/editar cursos
import Head from '../../components/header/header.jsx'; // Cabeçalho
import Footer from '../../components/footer/footer.jsx'; // Rodapé

export default function Home() {
    const [dados, setDados] = useState([]); // Dados dos cursos
    const [modalOpen, setModalOpen] = useState(false); // Controle de abertura do modal
    const token = localStorage.getItem('token'); // Token de autenticação
    const [cursoSelecionado, setCursoSelecionado] = useState(null); // Curso selecionado para edição
    const [texto, setTexto] = useState(''); // Texto de pesquisa
    const [up, setUp] = useState(false); // Estado para atualizar a lista

    // Carregar os dados dos cursos
    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/cursos", {
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

    // Função para apagar um curso
    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/cursos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setDados(dados.filter(curso => curso.id !== id)); // Atualiza a lista removendo o curso excluído
            } catch (error) {
                console.error("Erro ao apagar o curso:", error);
            }
        }
    };

    // Função para buscar cursos
    const search = async (texto) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/cursos/search/?search=${texto}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setCursoSelecionado(response.data[0]); // Seleciona o primeiro curso encontrado
        } catch (error) {
            console.error("Erro na pesquisa:", error);
        }
    };

    return (
        <main className="main">
            <Head />

            <div className="container_home">
                <section className="section_home">
                    <div className="table">
                        {dados.map((curso) => (
                            <div key={curso.id} className="lista">
                                <div className="col1">
                                    <FaEdit className="edit" onClick={() => { setModalOpen(true), setCursoSelecionado(curso) }} />
                                </div>
                                <div className="col2">
                                    <FaTrash className="delete" onClick={() => apagar(curso.id)} />
                                </div>
                                <div className="col3">
                                    <span className="codigo">{curso.codigo}</span>
                                </div>
                                <div className="col4">
                                    <span className="nome">{curso.nome}</span>
                                </div>
                                <div className="col5">
                                    <span className="tipo">{curso.tipo}</span>
                                </div>
                                <div className="col6">
                                    <span className="ha">{curso.ha}</span>
                                </div>
                                <div className="col7">
                                    <span className="sigla">{curso.sigla}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="footer">
                        <div className="btn1">
                            <FaPlus className="adicionar" onClick={() => { setModalOpen(true), setCursoSelecionado(null) }} />
                        </div>
                        <div className="pesquisar">
                            <input
                                placeholder="Código, nome ou sigla"
                                value={texto}
                                onChange={(e) => { setTexto(e.target.value) }}
                            />
                        </div>
                        <div className="btn2">
                            <FaSearch className="procurar" onClick={() => search(texto)} />
                        </div>
                    </div>

                    <ModalCursos
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        cursoSelecionado={cursoSelecionado}
                        up={up}
                        setUp={setUp}
                    />
                </section>
            </div>

            <Footer />
        </main>
    );
}
