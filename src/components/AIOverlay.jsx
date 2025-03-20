import React, { useState } from 'react';
import './AIOverlay.css';

const AIOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="ai-button" onClick={() => setIsOpen(!isOpen)}>
        🧠 IA
      </button>
      {isOpen && (
        <div className="ai-overlay">
          <iframe src="https://ai.maxit.live" title="AI Assistant" />
          <button className="ai-close" onClick={() => setIsOpen(false)}>✖</button>
        </div>
      )}
    </>
  );
};

export default AIOverlay;
