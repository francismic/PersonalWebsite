import { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext';

function LoadingScreen({ onDone }) {
  const { t } = useLang();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 2800),
      setTimeout(onDone, 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className="dialup-screen">
      <div className="dialup-box">

        <div className="dialup-box__titlebar">
          <span>Connecting...</span>
          <span className="dialup-box__dots">● ● ●</span>
        </div>

        <div className="dialup-log">
          <p className={`dialup-log__line ${step >= 1 ? 'dialup-log__line--done' : ''}`}>
            {t.loading.dialing}
          </p>
          <p className={`dialup-log__line ${step >= 2 ? 'dialup-log__line--done' : ''}`}>
            {t.loading.connecting}
          </p>
          <p className={`dialup-log__line ${step >= 3 ? 'dialup-log__line--done' : ''}`}>
            {t.loading.connected} ✓
          </p>
        </div>

        <div className="dialup-visual">
          <div className="dialup-visual__planet">🌍</div>
          <div className="dialup-visual__line">
            <div className={`dialup-visual__signal ${step >= 1 ? 'dialup-visual__signal--active' : ''}`} />
          </div>
          <div className="dialup-visual__pc">🖥️</div>
        </div>

      </div>
    </div>
  );
}

export default LoadingScreen;
