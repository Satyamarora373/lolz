import React, { useState } from 'react';
import './Login.css';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'; //useHistory for v5
function generateRandomCaptcha() {
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const captchaLength = 6;
  let captcha = '';
  for (let i = 0; i < captchaLength; i++) {
    const randomIndex = Math.floor(Math.random() * possibleChars.length);
    captcha += possibleChars[randomIndex];
  }
  return captcha;
}

function Login() {
  const [bankID, setBankID] = useState('');
  const [password, setPassword] = useState('');
  const [enteredCaptcha, setEnteredCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState(generateRandomCaptcha());
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!bankID) newErrors.bankID = 'Bank ID is required.';
    if (!password) newErrors.password = 'Password is required.';
    if (!enteredCaptcha) newErrors.captcha = 'Captcha is required.';
    if (enteredCaptcha.toLowerCase() !== generatedCaptcha.toLowerCase()) {
      newErrors.captcha = 'Incorrect captcha.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate('/status');
    }
  };

  const refreshCaptcha = () => {
    setGeneratedCaptcha(generateRandomCaptcha());
    setEnteredCaptcha('');
    setErrors((prevErrors) => ({ ...prevErrors, captcha: '' }));
  };
  const handleForgotPassword = () => {
    // Implement the logic for handling forgot password here
    console.log('Forgot Password clicked');
  };

  return (
    
      <div className="login-form">
        <img src="sclogo.png" style={{width:"270px",marginLeft:"45px"}}></img>
        <br/>
        <form onSubmit={handleSubmit}>
          <br/>
          
          <div className="form-group">
          <span>Bank ID</span>
          <input class="form-field" type="text" style={{width:"1000px"}} />
            {errors.bankID && <p className="error-message">{errors.bankID}</p>}
          </div>
          
          <div className="form-group">
          <span>Password</span>
          <input class="form-field" type="password" />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="form-group">
          <span >{generatedCaptcha}</span>
            {/* <label htmlFor="captcha">Captcha</label> */}
            <input class="form-field" type="text" id="captcha" placeholder='Enter Captcha'
                value={enteredCaptcha} onChange={(e) => setEnteredCaptcha(e.target.value) }/>
            <div className="captcha-container">
              {/* <input
                style={{width:"60%"}}
                type="text"
                id="captcha"
                placeholder='Enter Captcha'
                value={enteredCaptcha}
                onChange={(e) => setEnteredCaptcha(e.target.value)}
              /> */}
              <button type="button" className="refresh-captcha" onClick={refreshCaptcha}>
                Refresh
              </button>
            </div>
            {errors.captcha && <p className="error-message">{errors.captcha}</p>}
            <br/>
          </div>
          <Link to="/status">
            <button type="submit" className="login-button" onClick={handleSubmit}>
              Log In
            </button>
          </Link>
          
          <div className="" style={{textAlign:"center"}}>
          <br/>
            <button
              type="button"
              className="forgot-password-button"
              onClick={handleForgotPassword}
            >Forgot Password?
            </button>
          </div>
        </form>
      </div>
    
  );
}

export default Login;
