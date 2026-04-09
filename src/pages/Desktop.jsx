import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import Window from '../components/Window';
import About from './About';
import Portfolio from './Portfolio';
import Contact from './Contact';

const FOLDERS = [
  { id: 'about',   icon: '📁', label: 'about'    },
  { id: 'work',    icon: '📁', label: 'projects' },
  { id: 'contact', icon: '📁', label: 'contact'  },
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

function Desktop({ onLogout, dark, onToggleTheme }) {
  const { lang, toggle } = useLang();
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
            <span className="desktop-icon__img">{f.icon}</span>
            <span className="desktop-icon__label">{f.label}</span>
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
