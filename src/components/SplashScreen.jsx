import React, { useState, useEffect } from "react";
import "./SplashScreen.css";
import logo from "../asset/logo.png";
import splashSound from "../asset/splash.mp3";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const audio = new Audio(splashSound);
    
    const playSound = () => {
      audio.play().catch(() => console.warn("Son bloqué par le navigateur"));
    };
    
    document.addEventListener("click", playSound, { once: true }); // Attendre un clic utilisateur pour jouer le son
    
    setTimeout(() => setFadeOut(true), 2500);
    setTimeout(() => {
      document.removeEventListener("click", playSound); // Nettoyer l'écouteur après utilisation
      onFinish();
    }, 3000);
  }, [onFinish]);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <img src={logo} alt="OrbitMax" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;