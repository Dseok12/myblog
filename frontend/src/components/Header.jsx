import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // 로그인 상태를 체크하는 useAuth 사용

export default function Header() {
  const { user, logout } = useAuth(); // user는 로그인 정보, logout은 로그아웃 함수

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">DevBlog</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-300">홈</Link></li>
          <li><Link to="/posts" className="hover:text-gray-300">게시글 보기</Link></li> {/* 게시글 보기 추가 */}
          {user ? (
            <>
              <li><Link to="/create-post" className="hover:text-gray-300">게시글 작성</Link></li>
              <li><Link to="/mypage" className="hover:text-gray-300">마이페이지</Link></li>
              <li><Link to="/" className="hover:text-gray-300" onClick={logout}>로그아웃</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-gray-300">로그인</Link></li>
              <li><Link to="/signup" className="hover:text-gray-300">회원가입</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
