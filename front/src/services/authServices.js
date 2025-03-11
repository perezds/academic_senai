import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = 'http://your-api-url.com/api'; 

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;