import { useState, useEffect } from 'react';
import { LangProvider } from './context/LangContext';
import Home from './pages/Home';
import Desktop from './pages/Desktop';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light');
  const [screen, setScreen] = useState('home'); // 'home' | 'loading' | 'desktop'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <LangProvider>
      {screen === 'home' && (
        <Home
          onStart={() => setScreen('loading')}
          dark={dark}
          onToggleTheme={() => setDark(d => !d)}
        />
      )}

      {screen === 'loading' && (
        <LoadingScreen onDone={() => setScreen('desktop')} />
      )}

      {screen === 'desktop' && (
        <Desktop
          onLogout={() => setScreen('home')}
          dark={dark}
          onToggleTheme={() => setDark(d => !d)}
        />
      )}
    </LangProvider>
  );
}

export default App;
