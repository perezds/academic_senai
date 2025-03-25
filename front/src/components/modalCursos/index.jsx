import React, { useState, useEffect } from 'react';

export default function ModalCursos({ isOpen, onClose, cursoSelecionado, up, setUp }) {
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [ha, setHa] = useState('');
    const [sigla, setSigla] = useState('');

    useEffect(() => {
        if (cursoSelecionado) {
            setCodigo(cursoSelecionado.codigo);
            setNome(cursoSelecionado.nome);
            setTipo(cursoSelecionado.tipo);
            setHa(cursoSelecionado.ha);
            setSigla(cursoSelecionado.sigla);
        }
    }, [cursoSelecionado]);

    const handleSave = async () => {
        const cursoData = { codigo, nome, tipo, ha, sigla };
        if (cursoSelecionado) {
           
            await axios.put(`http://127.0.0.1:8000/api/cursos/${cursoSelecionado.id}`, cursoData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
        } else {
          
            await axios.post('http://127.0.0.1:8000/api/cursos', cursoData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
        }

        setUp(!up); 
        onClose(); 
    };

    return isOpen ? (
        <div className="modal">
            <div className="modal-content">
                <h3>{cursoSelecionado ? 'Editar Curso' : 'Adicionar Curso'}</h3>
                <input
                    type="text"
                    placeholder="Código"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Horas Aula"
                    value={ha}
                    onChange={(e) => setHa(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Sigla"
                    value={sigla}
                    onChange={(e) => setSigla(e.target.value)}
                />
                <button onClick={handleSave}>Salvar</button>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    ) : null;
}
