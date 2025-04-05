import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth(); // useAuth에서 login을 받아옵니다.
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' }); // 초기 폼 값 설정

  // 폼 값 변경 시 처리하는 함수
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // input 값 갱신
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // form = { email, password }
      const response = await login(form);

      if (response?.token) {
        const token = response.token; // 응답에서 JWT 토큰 추출
        localStorage.setItem('token', token); // 토큰을 localStorage에 저장

        alert('로그인 성공!'); // 여기서만 알림을 표시
        navigate('/'); // 로그인 후 홈 화면으로 이동
      } else {
        alert('로그인 실패: 서버에서 응답을 제대로 받지 못했습니다.');
      }
    } catch (err) {
      alert('로그인 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">로그인</h2>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="이메일"
        className="block w-full mb-2 p-2 border"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="비밀번호"
        className="block w-full mb-4 p-2 border"
        required
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">로그인</button>
    </form>
  );
}
