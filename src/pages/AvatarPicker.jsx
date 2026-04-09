import { useState } from 'react';
import { useLang } from '../context/LangContext';

const AVATARS = ['🧑‍💻', '🧙', '🥷', '🤖', '👾', '🧛', '🦸', '🧝'];

function AvatarPicker({ onConfirm, onBack }) {
  const { t } = useLang();
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');

  return (
    <div className="avatar-picker">
      <div className="avatar-picker__box">
        <p className="avatar-picker__label">{t.avatar.label}</p>
        <h2 className="avatar-picker__title">{t.avatar.title}</h2>
        <div className="avatar-picker__grid">
          {AVATARS.map(a => (
            <button
              key={a}
              className={`avatar-picker__item ${selected === a ? 'avatar-picker__item--selected' : ''}`}
              onClick={() => setSelected(a)}
            >
              {a}
            </button>
          ))}
        </div>
        <input
          className="avatar-picker__name"
          type="text"
          placeholder={t.avatar.namePlaceholder}
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={16}
        />
        <div className="avatar-picker__actions">
          <button className="avatar-picker__back" onClick={onBack}>{t.avatar.back}</button>
          <button
            className="start-btn"
            disabled={!selected || !name.trim()}
            onClick={() => onConfirm(selected, name.trim())}
          >
            ▶ {t.avatar.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarPicker;
