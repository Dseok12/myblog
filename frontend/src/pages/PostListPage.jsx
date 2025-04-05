import { useState, useEffect } from 'react';
import axios from '../api/axios';  // axios 경로 확인

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // localStorage에서 토큰을 가져옵니다.
    const token = localStorage.getItem('token');

    const fetchPosts = async () => {
      try {
        // axios에 Authorization 헤더 추가
        const res = await axios.get('http://localhost:8080/api/posts/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        setPosts(res.data);  // 게시글 목록 상태 업데이트
      } catch (error) {
        setError('게시글 목록 가져오기 실패: ' + (error.response?.data?.message || error.message));
        console.error('게시글 목록 가져오기 실패:', error);
      }
    };

    fetchPosts();
  }, []); // 빈 배열로, 컴포넌트 마운트 시에 한 번만 실행

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <h2 className="text-3xl font-bold mb-6">게시글 목록</h2>
      
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">제목</th>
            <th className="px-4 py-2">작성자</th>
            <th className="px-4 py-2">작성일</th>
            <th className="px-4 py-2">예상 비용</th>
            <th className="px-4 py-2">모임 인원</th>
            <th className="px-4 py-2">1인당 예상 비용</th>
            <th className="px-4 py-2">자세히 보기</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map(post => (
              <tr key={post.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{post.title}</td>
                <td className="border px-4 py-2">{post.author}</td> {/* 작성자 추가 */}
                <td className="border px-4 py-2">{new Date(post.createdDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{post.expectedCost} 원</td>
                <td className="border px-4 py-2">{post.numOfPeople}</td>
                <td className="border px-4 py-2">{post.perPersonCost} 원</td>
                <td className="border px-4 py-2">
                  <a href={`/posts/${post.id}`} className="text-blue-500 hover:underline">자세히 보기</a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
