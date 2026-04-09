import { useLang } from '../context/LangContext';

function Home({ onStart, dark, onToggleTheme }) {
  const { lang, toggle, t } = useLang();

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
          {t.home.subtitle}<span className="cursor-blink">_</span>
        </p>
        <button className="start-btn" onClick={onStart}>
          ▶ START
        </button>
      </div>
    </div>
  );
}

export default Home;
