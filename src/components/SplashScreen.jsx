import React, { useState, useEffect, useRef } from "react";
import "./SplashScreen.css";
import logo from "../asset/logotrans.png";
import splashSound from "../asset/splash.mp3";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const audioRef = useRef(new Audio(splashSound));
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (userInteracted) {
      audio.volume = 1;
      audio.play().catch(() => console.warn("Son bloqué par le navigateur"));
    }

    setTimeout(() => setFadeOut(true), 2500);
    setTimeout(onFinish, 3000);
  }, [userInteracted, onFinish]);

  return (
    <div 
      className={`splash-screen ${fadeOut ? "fade-out" : ""}`} 
      onClick={() => setUserInteracted(true)} // Détecte l'interaction
      onTouchStart={() => setUserInteracted(true)} // Détecte le toucher mobile
    >
      <img src={logo} alt="OrbitMax" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;
