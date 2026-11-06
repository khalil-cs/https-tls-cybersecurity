import { ChevronLeft, ChevronRight, X, Monitor } from 'lucide-react';
import './PresentationBar.css';

export default function PresentationBar({ items, activePage, onNavigate, onExit }) {
  const pages = items.map(n => n.id);
  const currentIdx = pages.indexOf(activePage);
  const isFirst = currentIdx <= 0;
  const isLast = currentIdx >= pages.length - 1;
  const currentItem = items[currentIdx];

  const goPrev = () => {
    if (!isFirst) {
      onNavigate(pages[currentIdx - 1]);
    }
  };

  const goNext = () => {
    if (!isLast) {
      onNavigate(pages[currentIdx + 1]);
    }
  };

  return (
    <div className="presentation-bar" role="navigation" aria-label="Presentation navigation">
      {/* Left: Prev */}
      <button
        className="pbar-btn pbar-prev"
        onClick={goPrev}
        disabled={isFirst}
        aria-label="Previous section"
      >
        <ChevronLeft size={18} />
        <span className="pbar-btn-label">Previous</span>
      </button>

      {/* Center: Progress */}
      <div className="pbar-center">
        <div className="pbar-dots">
          {items.map((item, idx) => (
            <button
              key={item.id}
              className={`pbar-dot ${idx === currentIdx ? 'active' : ''} ${idx < currentIdx ? 'done' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-label={`Go to ${item.label}`}
              title={item.label}
            />
          ))}
        </div>
        <div className="pbar-info">
          <Monitor size={13} />
          <span className="pbar-page-label">
            {currentItem?.label || ''}
          </span>
          <span className="pbar-counter">
            {currentIdx + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* Right: Next + Exit */}
      <div className="pbar-right">
        <button
          className="pbar-btn pbar-next"
          onClick={goNext}
          disabled={isLast}
          aria-label="Next section"
        >
          <span className="pbar-btn-label">Next</span>
          <ChevronRight size={18} />
        </button>
        <button
          className="pbar-btn pbar-exit"
          onClick={onExit}
          aria-label="Exit presentation mode"
          title="Exit presentation mode (Esc)"
        >
          <X size={16} />
          <span className="pbar-btn-label">Exit</span>
        </button>
      </div>
    </div>
  );
}
