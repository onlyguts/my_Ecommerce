
import React, { useState } from 'react';
import './PopupForm.css';

function PopupForm({ closePopup }) {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={closePopup}>X</button>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form>
          {isLogin ? (
            <>
              <label>
                Email:
                <input type="email" required />
              </label>
              <label>
                Password:
                <input type="password" required />
              </label>
            </>
          ) : (
            <>
              <label>
                Name:
                <input type="text" required />
              </label>
              <label>
                Email:
                <input type="email" required />
              </label>
              <label>
                Password:
                <input type="password" required />
              </label>
            </>
          )}
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <button className="switch-btn" onClick={switchForm}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
}

export default PopupForm;