import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      alert('로그인 성공');
    } catch {
      alert('로그인 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <input name="username" placeholder="아이디" className="w-full border p-2" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input name="password" type="password" placeholder="비밀번호" className="w-full border p-2" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">로그인</button>
    </form>
  );
}