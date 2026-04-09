import { useLang } from '../context/LangContext';

function Portfolio() {
  const { t } = useLang();

  return (
    <div className="win-content">
      <div className="cards">
        {t.portfolio.projects.map(p => (
          <div key={p.title} className="card">
            <span className="card__type">{p.type}</span>
            <h3 className="card__title">{p.title}</h3>
            <p className="card__desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
