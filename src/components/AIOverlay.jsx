import React, { useState } from 'react';
import './AIOverlay.css';

const AIOverlay = ({ isOpen, onClose }) => {
  return isOpen ? (
    <div className={`ai-overlay ${isOpen ? 'active' : ''}`}>
      <iframe
       src="https://ai.maxit.live"
       title="AI Assistant"
       allow="microphone; camera; autoplay; clipboard-write"
       allowFullScreen
/>
      <button className="ai-close" onClick={onClose}>✖</button>
    </div>
  ) : null;
};

export default AIOverlay;