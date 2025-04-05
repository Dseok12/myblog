// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/pages/home.css'; // 스타일시트 가져오기

export default function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>DevBlog</h1>
        <p>웹 개발에 관한 다양한 정보와 팁을 제공하는 블로그</p>
      </header>

      <section className="content">
        <div className="content-container">
          <h2>최신 개발 뉴스</h2>
          <p>React, Java, Spring Boot, MySQL에 관한 최신 글을 확인하세요.</p>
          <button className="button" onClick={handleLoginClick}>로그인</button>
          <button className="button" onClick={handleSignupClick}>회원가입</button>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 DevBlog. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
