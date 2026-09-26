import { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [needsPassword, setNeedsPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.firstLogin) {
        setNeedsPassword(true);
        return;
      }
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }
      onLoginSuccess(data);
    } catch (err) {
      setError('Could not reach the backend');
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not set password');
        return;
      }
      setNeedsPassword(false);
      setPassword('');
      alert('Password set! Please log in with your new password.');
    } catch (err) {
      setError('Could not reach the backend');
    }
  };

  if (needsPassword) {
    return (
      <form onSubmit={handleSetPassword}>
        <h2>Create a password</h2>
        <p>This is your first time logging in.</p>
        <input type="password" placeholder="New password" value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} />
        <button type="submit">Set password</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to CampuServe</h2>
      <input type="email" placeholder="Institutional email" value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default Login;