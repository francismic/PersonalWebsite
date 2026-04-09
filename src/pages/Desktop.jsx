import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import Window from '../components/Window';
import About from './About';
import Portfolio from './Portfolio';
import Contact from './Contact';
import resumeIcon from '../assets/resume.png';
import envelopeIcon from '../assets/envelope.png';
import fileIcon from '../assets/file.png';

const FOLDERS = [
  { id: 'about',   icon: resumeIcon, isImg: true },
  { id: 'work',    icon: fileIcon,    isImg: true },
  { id: 'contact', icon: envelopeIcon, isImg: true },
];

const WINDOWS = {
  about:   { title: 'about.txt'   },
  work:    { title: 'projects/'   },
  contact: { title: 'contact.exe' },
};

function Clock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="taskbar__clock">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
}

function Desktop({ onLogout, dark, onToggleTheme, avatar, username }) {
  const { lang, t, toggle } = useLang();
  const [openWindow, setOpenWindow] = useState(null);

  return (
    <div className="desktop-screen">
      <div className="desktop-area">
        {FOLDERS.map(f => (
          <button
            key={f.id}
            className="desktop-icon"
            onClick={() => setOpenWindow(f.id)}
          >
            {f.isImg
              ? <img src={f.icon} alt={t.folders[f.id]} className="desktop-icon__img" />
              : <span className="desktop-icon__img">{f.icon}</span>
            }
            <span className="desktop-icon__label">{t.folders[f.id]}</span>
          </button>
        ))}
      </div>

      <div className="taskbar">
        <button className="taskbar__start" onClick={onLogout} aria-label="Logout">⏻</button>

        <div className="taskbar__center">
          {openWindow && (
            <button className="taskbar__task" onClick={() => setOpenWindow(null)}>
              {WINDOWS[openWindow]?.title}
            </button>
          )}
        </div>

        <div className="taskbar__right">
          {avatar && (
            <span className="taskbar__avatar">
              <img src={avatar} alt="avatar" className="taskbar__avatar-img" />
              <span className="taskbar__avatar-name">{username}</span>
            </span>
          )}
          <button className="taskbar__btn" onClick={toggle}>{lang.toUpperCase()}</button>
          <button className="taskbar__btn" onClick={onToggleTheme}>{dark ? '☀' : '☾'}</button>
          <Clock />
        </div>
      </div>

      {openWindow && (
        <Window title={WINDOWS[openWindow].title} onClose={() => setOpenWindow(null)}>
          {openWindow === 'about'   && <About />}
          {openWindow === 'work'    && <Portfolio />}
          {openWindow === 'contact' && <Contact />}
        </Window>
      )}
    </div>
  );
}

export default Desktop;
