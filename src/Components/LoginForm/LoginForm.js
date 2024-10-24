/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [active, setActive] = useState(false);

  const handleRegisterClick = () => {
    setActive(true);
  };

  const handleLoginClick = () => {
    setActive(false);
  };

  return (
    <div className="warpper">
      <div className={`container ${active ? 'active' : ''}`} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Tạo tài khoản</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            </div>
            <span>Sử dụng Email để đăng ký</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="btn">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <h1>Đăng nhập</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            </div>
            <span>Hoặc sử dụng Email và Password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            
            <div className="forgot-section">
              <span><input type="checkbox" id="checked" />Remember Me</span>
              <span><a href="#">Forgot Password ?</a></span>
            </div>
            <button className="btn">Login</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Xin chào!!</h1>
              <p>Hãy đăng nhập để sử dụng các tính năng có trên trang</p>
              <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Xin Chào!!</h1>
              <p>Hãy tạo tài khoản để sử dụng các tính năng ở trên trang</p>
              <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
