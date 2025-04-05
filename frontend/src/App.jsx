import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import SignupPage from './pages/SignupPage';
import CreatePostPage from './pages/CreatePostPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* 로그인한 사용자만 접근 가능 */}
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        
        {/* 관리자인 경우만 접근 가능 */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireRole="ADMIN">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        
        {/* 게시글 목록 페이지 */}
        <Route
          path="/posts"
          element={<PostListPage />}
        />

        {/* 게시글 상세 페이지 */}
        <Route
          path="/posts/:postId"
          element={<PostDetailPage />}
        />

        {/* 게시글 작성 페이지 */}
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
