import { useLang } from '../context/LangContext';

function About() {
  const { t } = useLang();

  return (
    <div className="win-content">
      <p className="win-bio">{t.about.bio}</p>

      <div className="win-stats">
        {t.about.stats.map(s => (
          <div key={s.value} className="stat">
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="tag-list">
        {t.about.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default About;
