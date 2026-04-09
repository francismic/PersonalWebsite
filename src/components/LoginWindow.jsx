import { useState } from 'react';
import Window from './Window';
import boyImg from '../assets/boy.png';

function LoginWindow({ onLogin, onClose }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 900);
  };

  return (
    <Window title="FRANCIS.EXE — sign in" onClose={onClose}>
      <div className="login">
        <img src={boyImg} alt="avatar" className="login__avatar" />
        <p className="login__name">Francis</p>
        <p className="login__hint">Enter any password to continue</p>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className={`login__input ${error ? 'login__input--error' : ''}`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            autoFocus
          />
          {error && <p className="login__error">Please enter a password</p>}
          <button className="login__submit" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </Window>
  );
}

export default LoginWindow;
