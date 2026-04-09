import { useEffect } from 'react';

function Window({ title, onClose, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      <div className="window-overlay" onClick={onClose} />
      <div className="window" role="dialog" aria-modal="true">
        <div className="window__titlebar">
          <div className="window__titlebar-controls">
            <span className="window__ctrl window__ctrl--close" onClick={onClose} />
          </div>
          <span className="window__title">{title}</span>
        </div>
        <div className="window__body">
          {children}
        </div>
      </div>
    </>
  );
}

export default Window;
