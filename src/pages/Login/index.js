import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';

export default function Login({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('x-token');
    if (token) {
      history.push({
        pathname: '/chat',
        state: { status: 'new' }
      });
    }
  }, []);
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post('/login', { username, password });

      console.log('Response: ', response.data);
      if (response.data.token) {
        localStorage.setItem('x-token', response.data.token);
        localStorage.setItem('x-user', response.data.username);
        history.push({
          pathname: '/chat',
          state: { status: 'new' }
        });
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function openSignup() {
    history.push('/signup');
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form-login">
        <label htmlFor="username">Username *</label>
        <input
          id="username"
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
          required
        />
        <label htmlFor="password">Password *</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />

        <button className="btnLogin" type="submit">Login</button>
        <button className="btnLogin" type="button" onClick={openSignup}>Signup</button>
      </form>
    </>
  );
}