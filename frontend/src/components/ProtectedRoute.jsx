import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // 로그인 상태와 사용자 정보를 관리하는 컨텍스트

// ProtectedRoute는 자식 컴포넌트를 조건에 맞춰 렌더링하거나 리다이렉트합니다.
export default function ProtectedRoute({ children, requireRole }) {
  const { user } = useAuth(); // 현재 로그인된 사용자 정보 가져오기

  // 로그인하지 않은 경우, 로그인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 필요한 역할이 주어졌고, 사용자의 역할이 맞지 않으면 홈 화면으로 리다이렉트
  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/" replace />;
  }

  // 조건을 만족하면 자식 컴포넌트를 렌더링
  return children;
}
// 이 컴포넌트는 로그인 상태와 역할에 따라 접근을 제어합니다.
// 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트되고, 특정 역할이 필요한 페이지에 접근할 경우 홈 화면으로 리다이렉트됩니다.
// 로그인 상태와 역할을 관리하는 AuthContext를 사용하여 현재 사용자의 정보를 가져옵니다.