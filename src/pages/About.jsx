import { useLang } from '../context/LangContext';

const SKILLS = [
  { name: 'JavaScript',   level: 80 },
  { name: 'React',        level: 80 },
  { name: 'CSS',          level: 75 },
  { name: 'PHP',          level: 60 },
  { name: 'Photoshop',    level: 70 },
  { name: 'Illustrator',  level: 65 },
];

function StatBar({ name, level }) {
  const filled = Math.round(level / 10);
  const empty  = 10 - filled;
  return (
    <div className="rpg-stat">
      <span className="rpg-stat__name">{name}</span>
      <span className="rpg-stat__bar">
        <span className="rpg-stat__bar--filled">{'█'.repeat(filled)}</span>
        <span className="rpg-stat__bar--empty">{'█'.repeat(empty)}</span>
      </span>
      <span className="rpg-stat__val">{level}</span>
    </div>
  );
}

function About() {
  const { t } = useLang();

  return (
    <div className="about-layout">

      {/* ── Left: character info + skill tree ── */}
      <div className="about-rpg">
        <p className="rpg-title">[ CHARACTER INFO ]</p>
        <div className="rpg-sheet">
          <div className="rpg-sheet__row"><span className="rpg-sheet__key">CLASS</span><span className="rpg-sheet__val">Full-Stack Dev</span></div>
          <div className="rpg-sheet__row"><span className="rpg-sheet__key">GUILD</span><span className="rpg-sheet__val">Web & Design</span></div>
          <div className="rpg-sheet__row"><span className="rpg-sheet__key">LVL</span><span className="rpg-sheet__val">3</span></div>
          <div className="rpg-sheet__row"><span className="rpg-sheet__key">STATUS</span><span className="rpg-sheet__val rpg-sheet__val--status">● {t.about.status}</span></div>
        </div>
        <p className="rpg-title" style={{ marginTop: '1rem' }}>[ SKILL TREE ]</p>
        <div className="rpg-stats">
          {SKILLS.map(s => <StatBar key={s.name} {...s} />)}
        </div>
      </div>

      {/* ── Right: avatar + bio ── */}
      <div className="about-avatar-col">
        <p className="about-avatar__name">FRANCIS</p>
        <div className="about-avatar__frame">
          <div className="about-avatar__placeholder">
            <span>?</span>
          </div>
        </div>
        <p className="rpg-bio">{t.about.bio}</p>
      </div>

    </div>
  );
}

export default About;
