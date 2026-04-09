import { useState, useEffect } from 'react';
import { LangProvider } from './context/LangContext';
import Home from './pages/Home';
import Desktop from './pages/Desktop';
import LoginWindow from './components/LoginWindow';
import './App.css';

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light');
  const [screen, setScreen] = useState('home'); // 'home' | 'desktop'
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleLogin = () => {
    setLoginOpen(false);
    setScreen('desktop');
  };

  const handleLogout = () => {
    setScreen('home');
  };

  return (
    <LangProvider>
      {screen === 'home' && (
        <Home
          onStart={() => setLoginOpen(true)}
          dark={dark}
          onToggleTheme={() => setDark(d => !d)}
        />
      )}

      {screen === 'desktop' && (
        <Desktop
          onLogout={handleLogout}
          dark={dark}
          onToggleTheme={() => setDark(d => !d)}
        />
      )}

      {loginOpen && (
        <LoginWindow
          onLogin={handleLogin}
          onClose={() => setLoginOpen(false)}
        />
      )}
    </LangProvider>
  );
}

export default App;
