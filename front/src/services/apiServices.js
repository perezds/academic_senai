import axios from 'axios';

const API_URL = 'http://your-api-url.com/api'; 

const getDisciplinas = () => {
  return axios.get(`${API_URL}/disciplinas`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};

const createDisciplina = (disciplina) => {
  return axios.post(`${API_URL}/disciplinas`, disciplina, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};

const updateDisciplina = (id, disciplina) => {
  return axios.put(`${API_URL}/disciplinas/${id}`, disciplina, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};

const deleteDisciplina = (id) => {
  return axios.delete(`${API_URL}/disciplinas/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};

const apiService = {
  getDisciplinas,
  createDisciplina,
  updateDisciplina,
  deleteDisciplina,
};

export default apiService;