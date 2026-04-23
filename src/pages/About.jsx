import { useLang } from '../context/LangContext';
import francisImg from '../assets/francis.jpg';

const SKILLS = [
  { name: 'JS / React', level: 60 },
  { name: 'HTML / CSS',   level: 90 },
  { name: 'PHP',          level: 60 },
  { name: 'Photoshop',    level: 85 },
  { name: 'Illustrator',  level: 90 },
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

      {/* ── Avatar ── */}
      <div className="about-avatar-col">
        <p className="about-avatar__name">FRANCIS</p>
        <div className="about-avatar__frame">
          <img src={francisImg} alt="Francis" className="about-avatar__photo" />
        </div>
        <p className="rpg-bio about-bio--desktop">{t.about.bio}</p>
      </div>

      {/* ── Character info ── */}
      <div className="about-char-info">
        <p className="rpg-title">[ CHARACTER INFO ]</p>
        <div className="rpg-sheet">
          <div className="rpg-sheet__row"><span className="rpg-sheet__key">CLASS</span><span className="rpg-sheet__val">Full-Stack Dev</span></div>
          <div className="rpg-sheet__row"><span className="rpg-sheet__key">GUILD</span><span className="rpg-sheet__val">Web & Design</span></div>
          <div className="rpg-sheet__row"><span className="rpg-sheet__key">STATUS</span><span className="rpg-sheet__val rpg-sheet__val--status">● {t.about.status}</span></div>
        </div>
      </div>

      {/* ── Skill tree ── */}
      <div className="about-skill-tree">
        <p className="rpg-title">[ SKILL TREE ]</p>
        <div className="rpg-stats">
          {SKILLS.map(s => <StatBar key={s.name} {...s} />)}
        </div>
      </div>

    </div>
  );
}

export default About;
