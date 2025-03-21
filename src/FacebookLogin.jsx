import React, { useState } from 'react';
import './FacebookLogin.css'; // Importing CSS for styling

const FacebookLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the login logic, e.g., API call
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <h1>facebook</h1>
      <h2>Log in to Facebook</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email address or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
      </form>
      <p>
        <a href="#">Forgotten account?</a>
        <span> · </span>
        <a href="#">Sign up for Facebook</a>
      </p>
    </div>
  );
};

export default FacebookLogin;