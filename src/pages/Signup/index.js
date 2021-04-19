import React, { useState } from 'react';
import './styles.css';
import api from '../../services/api';


export default function Signup({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password confirmation does not match. Please, try again.');
    } else {
      const response = await api.post('/signup', {
        username,
        password
      });
      if (response.data.code === 200) {
        alert(response.data.message);
        history.push('/');
      } else {
        alert(response.data.message);
      }
    }
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
          placeholder="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm password *</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
          required
        />
        <button className="btnLogin" type="submit">Register</button>
      </form>
    </>
  );
}