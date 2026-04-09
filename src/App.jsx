import { useState, useEffect } from 'react';
import { LangProvider } from './context/LangContext';
import Home from './pages/Home';
import AvatarPicker from './pages/AvatarPicker';
import Desktop from './pages/Desktop';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light');
  const [screen, setScreen] = useState('home'); // 'home' | 'avatar' | 'loading' | 'desktop'
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleAvatarConfirm = (chosen, name) => {
    setAvatar(chosen);
    setUsername(name);
    setScreen('loading');
  };

  const handleLogout = () => {
    setScreen('home');
    setAvatar(null);
    setUsername('');
  };

  return (
    <LangProvider>
      {screen === 'home' && (
        <Home
          onStart={() => setScreen('avatar')}
          dark={dark}
          onToggleTheme={() => setDark(d => !d)}
        />
      )}

      {screen === 'avatar' && (
        <AvatarPicker onConfirm={handleAvatarConfirm} onBack={() => setScreen('home')} />
      )}

      {screen === 'loading' && (
        <LoadingScreen
          avatar={avatar}
          username={username}
          onDone={() => setScreen('desktop')}
        />
      )}

      {screen === 'desktop' && (
        <Desktop
          onLogout={handleLogout}
          dark={dark}
          onToggleTheme={() => setDark(d => !d)}
          avatar={avatar}
          username={username}
        />
      )}

    </LangProvider>
  );
}

export default App;
