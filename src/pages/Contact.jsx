import { useLang } from '../context/LangContext';

function Contact() {
  const { t } = useLang();

  return (
    <div className="win-content">
      <p className="win-bio">{t.contact.message}</p>
      <div className="contact__actions">
        <a href="mailto:your@email.com" className="btn btn--primary">{t.contact.email}</a>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn--ghost">{t.contact.github}</a>
      </div>
    </div>
  );
}

export default Contact;
