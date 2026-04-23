import { useEffect, useRef, useState } from 'react';

function Window({ title, onClose, children }) {
  const [pos, setPos] = useState(null); // null = centered via CSS on first render
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();

    const rect = windowRef.current.getBoundingClientRect();

    // On first drag, lock in the current centered position
    if (!pos) {
      setPos({ x: rect.left, y: rect.top });
      offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    } else {
      offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    }

    dragging.current = true;

    const onMouseMove = (e) => {
      if (!dragging.current) return;
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    };

    const onMouseUp = () => {
      dragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const style = pos
    ? { top: pos.y, left: pos.x, transform: 'none' }
    : {};

  return (
    <>
      <div className="window-overlay" onClick={onClose} />
      <div className="window" role="dialog" aria-modal="true" ref={windowRef} style={style}>
        <div className="window__titlebar" onMouseDown={onMouseDown} style={{ cursor: 'grab' }}>
          <div className="window__titlebar-controls">
            <button className="window__ctrl window__ctrl--close" onClick={onClose}>✕</button>
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
