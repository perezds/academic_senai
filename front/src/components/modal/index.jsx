import React, {useEffect, useState} from "react";
import './styles.css'

const ModalProfessores = ({
  isOpen,
  onClose,
  professorSelecionado,
  criar,
  editar
})=>{
  if(!isOpen) return null

  console.log("Prof. Selecionado: ", professorSelecionado)

  const [id, setId] = useState(professorSelecionado?.id || '')
  const [ni, setNi] = useState(professorSelecionado?.ni || '')
  const [nome, setNome] = useState(professorSelecionado?.nome || '')
  const [email, setEmail] = useState(professorSelecionado?.email || '')
  const [cel, setCel] = useState(professorSelecionado?.cel || '')
  const [ocup, setOcup] = useState(professorSelecionado?.ocup || '')

  useEffect(()=>{
    if(professorSelecionado){
      setId(professorSelecionado.id || '')
      setNi(professorSelecionado.ni || '')
      setNome(professorSelecionado.nome || '')
      setEmail(professorSelecionado.email || '')
      setCel(professorSelecionado.cel || '')
      setOcup(professorSelecionado.ocup || '')
    }
  }, [])


}
