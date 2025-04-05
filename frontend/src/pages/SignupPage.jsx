import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    gender: '',
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreedToTerms) return alert('이용약관에 동의해주세요.');

    try {
      await axios.post('/api/auth/signup', form);
      alert('회원가입 성공!');
      navigate('/login');
    } catch (err) {
      alert('회원가입 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <input name="username" placeholder="아이디" className="w-full border p-2" onChange={handleChange} />
      <input name="password" type="password" placeholder="비밀번호" className="w-full border p-2" onChange={handleChange} />
      <input name="email" placeholder="이메일" className="w-full border p-2" onChange={handleChange} />
      <input name="phoneNumber" placeholder="휴대폰 번호" className="w-full border p-2" onChange={handleChange} />
      <select name="gender" className="w-full border p-2" onChange={handleChange}>
        <option value="">성별 선택</option>
        <option value="MALE">남성</option>
        <option value="FEMALE">여성</option>
        <option value="OTHER">기타</option>
      </select>
      <label className="flex gap-2 items-center">
        <input type="checkbox" name="agreedToTerms" onChange={handleChange} />
        이용약관에 동의합니다
      </label>
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">회원가입</button>
    </form>
  );
}