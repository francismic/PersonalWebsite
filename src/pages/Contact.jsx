import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const LINES = {
  en: [
    '> Initializing contact module...',
    '> Want to work together or just say hi?',
    '> My inbox is always open.',
  ],
  fr: [
    '> Initialisation du module contact...',
    '> Envie de collaborer ou juste dire bonjour ?',
    '> Ma boîte mail est toujours ouverte.',
  ],
};

function TerminalLines({ lang }) {
  const lines = LINES[lang] ?? LINES.en;
  const [displayed, setDisplayed] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    setDisplayed([]);
    setCurrentLine(0);
    setCurrentChar(0);
  }, [lang]);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    const line = lines[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), 30);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed(prev => [...prev, line]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, lines]);

  const typing = currentLine < lines.length ? lines[currentLine].slice(0, currentChar) : null;

  return (
    <div className="contact__terminal">
      {displayed.map((line, i) => (
        <p key={i} className="contact__terminal-line contact__terminal-line--done">{line}</p>
      ))}
      {typing !== null && (
        <p className="contact__terminal-line">
          {typing}<span className="cursor-blink">_</span>
        </p>
      )}
    </div>
  );
}

function Contact() {
  const { lang, t } = useLang();

  return (
    <div className="win-content">
      <TerminalLines lang={lang} />
      <div className="contact__actions">
        <a href="mailto:fr.michaud93@gmail.com" className="btn btn--primary">{t.contact.email}</a>
        <a href="https://github.com/francismic" target="_blank" rel="noreferrer" className="contact__social"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/francis-michaud/" target="_blank" rel="noreferrer" className="contact__social"><FaLinkedin /></a>
      </div>
    </div>
  );
}

export default Contact;
