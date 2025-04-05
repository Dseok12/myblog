import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });

      if (res.data && res.data.token) {
        const token = res.data.token;
        localStorage.setItem('token', token);

        // JWT 토큰에서 사용자 정보 추출
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ username: payload.sub, role: payload.role });

        alert('로그인 성공!');
        return res.data;
      } else {
        alert('로그인 실패: 서버에서 응답을 제대로 받지 못했습니다.');
        return null;
      }
    } catch (err) {
      alert('로그인 실패: ' + (err.response?.data?.message || err.message));
      return null;
    }
};


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ username: payload.sub, role: payload.role });
      } catch (err) {
        console.error('JWT 파싱 실패:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
