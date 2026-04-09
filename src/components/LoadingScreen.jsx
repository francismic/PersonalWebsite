import { useEffect } from 'react';
import { useLang } from '../context/LangContext';

function LoadingScreen({ avatar, username, onDone }) {
  const { t } = useLang();

  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="loading-screen">
      <div className="loading-bubble">
        <p className="loading-bubble__welcome">{t.loading.welcome}</p>
        <img src={avatar} alt="avatar" className="loading-bubble__avatar" />
        <p className="loading-bubble__name">{username}</p>
        <div className="loading-bubble__bar">
          <div className="loading-bubble__fill" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
