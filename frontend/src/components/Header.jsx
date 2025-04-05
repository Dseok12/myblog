import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-xl font-bold"
      >
        DevBlog
      </Link>
      <nav className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm">
              {user.username} ({user.role})
            </span>

            <Link
              to="/mypage"
              className="text-sm hover:underline"
            >
              마이페이지
            </Link>

            {user.role === 'ADMIN' && (
              <Link
                to="/admin"
                className="text-sm hover:underline text-red-400"
              >
                관리자
              </Link>
            )}

            <button
              onClick={logout}
              className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:underline"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="hover:underline"
            >
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
