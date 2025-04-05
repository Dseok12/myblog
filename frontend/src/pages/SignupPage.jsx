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
    gender: '', // 남자 or 여자
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', form);
      alert('회원가입 완료!');
      navigate('/login');
    } catch (err) {
      alert('회원가입 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>

      {['username', 'password', 'email', 'phoneNumber'].map((field) => (
        <input
          key={field}
          name={field}
          type={field === 'password' ? 'password' : 'text'}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          required
          className="block w-full mb-2 p-2 border"
        />
      ))}

      {/* ✅ 성별 선택: select 박스 */}
      <label className="block mb-2">
        <span className="block mb-1">성별</span>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="block w-full p-2 border"
        >
          <option value="" disabled>성별 선택</option>
          <option value="남자">남자</option>
          <option value="여자">여자</option>
        </select>
      </label>

      {/* ✅ 약관 동의 */}
      <label className="block mb-4 mt-2">
        <input
          type="checkbox"
          name="agreedToTerms"
          checked={form.agreedToTerms}
          onChange={handleChange}
        />{' '}
        약관 동의
      </label>

      <button className="bg-blue-500 text-white px-4 py-2 rounded">가입</button>
    </form>
  );
}
