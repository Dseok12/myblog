import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // 서버 URL
  withCredentials: true, // 쿠키 인증이 필요한 경우 true
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더 추가
  }
  return config;
});

export default instance;
