import { useLang } from '../context/LangContext';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Contact() {
  const { t } = useLang();

  return (
    <div className="win-content">
      <p className="win-bio">{t.contact.message}</p>
      <div className="contact__actions">
        <a href="mailto:fr.michaud93@gmail.com" className="btn btn--primary">{t.contact.email}</a>
<a href="https://github.com/francismic" target="_blank" rel="noreferrer" className="contact__social"><FaGithub /></a>
        <a href="https://www.instagram.com/isy.frank/?hl=fr" target="_blank" rel="noreferrer" className="contact__social"><FaInstagram /></a>
        <a href="https://www.linkedin.com/in/francis-michaud/" target="_blank" rel="noreferrer" className="contact__social"><FaLinkedin /></a>
      </div>
    </div>
  );
}

export default Contact;
