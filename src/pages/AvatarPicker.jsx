import { useState } from 'react';
import { useLang } from '../context/LangContext';

const avatarModules = import.meta.glob('../assets/avatar/*.png', { eager: true });
const AVATARS = Object.values(avatarModules).map(m => m.default);

function AvatarPicker({ onConfirm, onBack }) {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [name, setName] = useState('');

  const prev = () => setIndex(i => (i - 1 + AVATARS.length) % AVATARS.length);
  const next = () => setIndex(i => (i + 1) % AVATARS.length);

  return (
    <div className="avatar-picker">
      <div className="avatar-picker__box">
        <p className="avatar-picker__label">{t.avatar.label}</p>
        <h2 className="avatar-picker__title">{t.avatar.title}</h2>
        <div className="avatar-picker__carousel">
          <button className="avatar-picker__arrow" onClick={prev}>◀</button>
          <div className="avatar-picker__preview">
            <img src={AVATARS[index]} alt={`Avatar ${index + 1}`} />
          </div>
          <button className="avatar-picker__arrow" onClick={next}>▶</button>
        </div>
        <p className="avatar-picker__counter">{index + 1} / {AVATARS.length}</p>
        <input
          className="avatar-picker__name"
          type="text"
          placeholder={t.avatar.namePlaceholder}
          value={name}
          onChange={e => {
            const v = e.target.value;
            setName(v.length ? v[0].toUpperCase() + v.slice(1) : v);
          }}
          maxLength={16}
        />
        <div className="avatar-picker__actions">
          <button className="avatar-picker__back" onClick={onBack}>{t.avatar.back}</button>
          <button
            className="start-btn"
            disabled={!name.trim()}
            onClick={() => onConfirm(AVATARS[index], name.trim())}
          >
            ▶ {t.avatar.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarPicker;
