import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';

function Home({ onStart, dark, onToggleTheme }) {
  const { lang, toggle, t } = useLang();
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    const full = t.home.subtitle;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(full.slice(0, i));
      if (i >= full.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [t.home.subtitle]);

  return (
    <div className="boot-screen">
      <div className="boot-screen__corner">
        <button className="nav__btn" onClick={toggle}>{lang.toUpperCase()}</button>
        <button className="nav__btn" onClick={onToggleTheme}>{dark ? '☀' : '☾'}</button>
      </div>

      <div className="boot-screen__inner">
        <p className="hero__label">{t.home.label}</p>
        <h1 className="hero__name">FRANCIS</h1>
        <p className="hero__title">
          {displayed}<span className="cursor-blink">_</span>
        </p>
        <button className="start-btn" onClick={onStart}>
          ▶ START
        </button>
      </div>
    </div>
  );
}

export default Home;
