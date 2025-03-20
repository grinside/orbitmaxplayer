import "./AIOverlay.css";
import React, { useState } from "react";

const AIOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="ai-button" onClick={() => setIsOpen(!isOpen)}>
        🧠 IA
      </button>
      <div className={`ai-overlay ${isOpen ? "active" : ""}`} style={{ opacity: isOpen ? 0.5 : 0, visibility: isOpen ? "visible" : "hidden", transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out" }}>
        {isOpen && (
          <>
            <button className="ai-close" onClick={() => setIsOpen(false)}>✖</button>
            <iframe src="https://ai.maxit.live" allow="microphone" className="ai-frame"></iframe>
          </>
        )}
      </div>
    </>
  );
};

export default AIOverlay;