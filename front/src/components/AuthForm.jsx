import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/images/back.png';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.115:5000/api/auth/login', { username, password });
      setMessage('Login successful!');
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      setMessage('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <MDBContainer fluid className="h-100">
      <MDBRow className="h-100">
        <MDBCol sm='6' className='d-flex flex-column justify-content-center align-items-center bg-light'>
          <div className='d-flex flex-row mb-4'>
            <MDBIcon fas icon="user-circle fa-3x me-3" style={{ color: '#709085' }} />
            <span className="h1 fw-bold mb-0">Wassim MOURALI</span>
          </div>

          <h3 className="fw-normal mb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

          <form onSubmit={handleSubmit} className="w-75">
            <MDBInput
              wrapperClass='mb-4'
              label='Username'
              id='formControlLg'
              type='text'
              size='lg'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              id='formControlLg'
              type='password'
              size='lg'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <MDBBtn className="mb-4 px-5 w-100" color='info' size='lg' type="submit">Login</MDBBtn>
          </form>

          {message && <p className="text-center text-danger">{message}</p>}

          <p className="small mb-5">
            <a href="#!" className="text-muted">Forgot password?</a>
          </p>
          <p>
            Don't have an account? <a href="#!" className="link-info">Register here</a>
          </p>
        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block p-0'>
          <img
            src={loginImage}
            alt="Login illustration"
            className="w-100 h-100 img-fluid"
            style={{ objectFit: 'cover', objectPosition: 'left' }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AuthForm;
