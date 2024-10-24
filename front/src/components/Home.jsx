import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios.get('http://localhost:5000/api/auth/protected', config)
      .then(response => setMessage(response.data.message))
      .catch(error => setMessage('Unauthorized: ' + error.response?.data?.message || 'Unknown error'));
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default Home;
