import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate import 추가
import axios from '../api/axios';  // axios 경로 확인

export default function CreatePostPage() {
  const [postType, setPostType] = useState('study'); // 게시글 종류 상태
  const [formData, setFormData] = useState({
    postType: 'study',
    title: '',
    content: '',
    location: '',
    date: '',
    time: '',
    numberOfPeople: '',
    startDate: '',
    endDate: '',
    estimatedCost: '',
    costPerPerson: '',
  });

  const navigate = useNavigate();  // 페이지 이동

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const dataToSubmit = { ...formData, postType };

    try {
      const res = await axios.post('http://localhost:8080/api/posts/create', dataToSubmit, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log('게시글 생성 성공:', res.data);
      alert('게시글이 성공적으로 작성되었습니다!');
      navigate('/posts');  // 게시글 목록 페이지로 리다이렉트
    } catch (error) {
      console.error('게시글 생성 실패:', error);
      alert('게시글 생성 실패: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">게시글 종류</label>
          <select
            name="postType"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            className="w-full p-2 border"
          >
            <option value="study">스터디게시글</option>
            <option value="meeting">모임게시글</option>
            <option value="chat">잡담게시글</option>
            <option value="info">정보공유게시글</option>
            <option value="study-summary">공부한내용정리</option>
          </select>
        </div>

        {/* 일반 게시글 제목과 내용 */}
        <div className="mb-4">
          <label className="block mb-2">제목</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">내용</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full p-2 border"
            rows="5"
            required
          />
        </div>

        {/* 모임게시글과 스터디게시글의 경우 추가 입력 항목 */}
        {(postType === 'study' || postType === 'meeting') && (
          <>
            <div className="mb-4">
              <label className="block mb-2">장소</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 border"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">날짜</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">시간</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full p-2 border"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">모임인원</label>
              <input
                type="number"
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleInputChange}
                className="w-full p-2 border"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">시작일</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full p-2 border"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">종료일</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full p-2 border"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">예상비용</label>
              <input
                type="number"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleInputChange}
                className="w-full p-2 border"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">1인당 예상 비용</label>
              <input
                type="number"
                name="costPerPerson"
                value={formData.costPerPerson}
                onChange={handleInputChange}
                className="w-full p-2 border"
              />
            </div>
          </>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          게시글 작성
        </button>
      </form>
    </div>
  );
}
