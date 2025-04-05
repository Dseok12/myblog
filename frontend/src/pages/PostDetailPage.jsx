import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/posts/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPost(res.data);
      } catch (error) {
        console.error('게시글 상세 정보 가져오기 실패:', error);
      }
    };

    fetchPostDetail();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="text-sm text-gray-600 mb-4">{post.content}</p>
      <div className="space-y-2">
        <p><strong>장소:</strong> {post.location || '정보 없음'}</p>
        <p><strong>시작일:</strong> {new Date(post.startDate).toLocaleDateString()}</p>
        <p><strong>종료일:</strong> {new Date(post.endDate).toLocaleDateString()}</p>
        <p><strong>예상 비용:</strong> {post.expectedCost} 원</p>
        <p><strong>모임 인원:</strong> {post.numOfPeople}</p>
        <p><strong>1인당 예상 비용:</strong> {post.perPersonCost} 원</p>
        <p><strong>작성일:</strong> {new Date(post.createdDate).toLocaleDateString()}</p> {/* 작성일 추가 */}
      </div>
    </div>
  );
}
