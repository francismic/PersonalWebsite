import { useState } from 'react';
import { useLang } from '../context/LangContext';
import Window from '../components/Window';
import About from './About';
import Portfolio from './Portfolio';
import Contact from './Contact';
import resumeIcon from '../assets/resume.png';
import envelopeIcon from '../assets/envelope.png';
import fileIcon from '../assets/file.png';
import cvIcon from '../assets/cv.png';

const FOLDERS = [
  { id: 'about',   icon: resumeIcon,   isImg: true },
  { id: 'work',    icon: fileIcon,     isImg: true },
  { id: 'cv',      icon: cvIcon,       isImg: true, href: { en: '/CV_michaud.pdf', fr: '/CV_michaud.pdf' } },
  { id: 'contact', icon: envelopeIcon, isImg: true },
];

const WINDOWS = {
  about:   { title: 'about.txt'   },
  work:    { title: 'projects/'   },
  contact: { title: 'contact.exe' },
};


function Desktop({ onLogout, dark, onToggleTheme }) {
  const { lang, t, toggle } = useLang();
  const [openWindow, setOpenWindow] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="desktop-screen">
      <div className="desktop-area">
        {FOLDERS.map(f => f.href ? (
          <a
            key={f.id}
            className="desktop-icon"
            href={f.href[lang]}
            target="_blank"
            rel="noreferrer"
          >
            {f.isImg
              ? <img src={f.icon} alt={t.folders[f.id]} className="desktop-icon__img" />
              : <span className="desktop-icon__img">{f.icon}</span>
            }
            <span className="desktop-icon__label">{t.folders[f.id]}</span>
          </a>
        ) : (
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
          <button className="taskbar__start" onClick={() => setShowLogout(true)} aria-label="Logout">⏻</button>
        </div>
      </div>

      {openWindow && (
        <Window title={WINDOWS[openWindow].title} onClose={() => setOpenWindow(null)}>
          {openWindow === 'about'   && <About />}
          {openWindow === 'work'    && <Portfolio />}
          {openWindow === 'contact' && <Contact />}
        </Window>
      )}

      {showLogout && (
        <div className="logout-backdrop">
          <div className="logout-dialog">
            <div className="logout-dialog__titlebar">
              <span>{t.logout.title}</span>
              <button className="logout-dialog__close" onClick={() => setShowLogout(false)}>✕</button>
            </div>
            <div className="logout-dialog__body">
              <span className="logout-dialog__icon">⏻</span>
              <p className="logout-dialog__message">{t.logout.message}</p>
            </div>
            <div className="logout-dialog__actions">
              <button className="btn btn--primary" onClick={onLogout}>{t.logout.confirm}</button>
              <button className="btn btn--secondary" onClick={() => setShowLogout(false)}>{t.logout.cancel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Desktop;
