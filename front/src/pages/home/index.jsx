import React, { useState, useEffect } from "react"
import axios from "axios"
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './styles.css'
import ModalProfessores from "../../components/modal";
import Head from "../../components/head";

export default function Home() {
    const [dados, setDados] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token')
    const [professorSelecionado, setProfessorSelecionado] = useState(null)

    // console.log("TokenHome:", token)

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
    }, []);

    const editar = (id) => {

    }

    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setDados(dados.filter(professor => professor.id !== id))
            }

            catch (error) {
                console.error(error)
            }
        }


    }

    const ModalProfessores = ({ isOpen, onClose }) => {
        if (!isOpen) return null;

        return (
            <div className="modal-overlay">
                <div className="modal-container">
                    <button className="close-button" onClick={onClose}>×</button>
                    <h2>Cadastro de Professor</h2>
                    <form>
                        <input type="text" placeholder="NI" />
                        <input type="text" placeholder="Nome" />
                        <input type="email" placeholder="Email" />
                        <input type="tel" placeholder="Celular" />
                        <input type="text" placeholder="Ocupação" />
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        );
    };

    const criar = async(novoProfessor)=>{
        console.log("novoProfessor: ", novoProfessor)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/professores',
                {
                    ni: novoProfessor.ni,
                    nome: novoProfessor.nome,
                    email: novoProfessor.email,
                    cel: novoProfessor.cel,
                    ocup: novoProfessor.ocup
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setDados([...dados, novoProfessor])
            setModalOpen(false)
        } catch (error) {
            
        }
    }

    return (
        <main className="main">
            <div className="container_home">
                <section className="section_home">
                    <div className="table">
                        {dados.map((professor) => (
                            <div key={professor.id} className="lista">
                                <div className="col1">
                                    <FaEdit className="edit" onClick={() => editar(professor.id)} />
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
                            <FaPlus className="adicionar" onClick={() => {setModalOpen(true), setProfessorSelecionado(null)}} />
                        </div>
                        <div className="pesquisar">
                            <input
                            
                            />
                        </div>
                        <div className="btn2">
                            <FaSearch className="procurar" />
                        </div>
                    </div>
                    <ModalProfessores 
                        isOpen={modalOpen} 
                        onClose={() => setModalOpen(false)} 
                        professorSelecionado = {professorSelecionado}
                        setProfessorSelecionado = {setProfessorSelecionado}
                        criar ={criar}
                    />

                </section>
            </div>
        </main>
    );
}