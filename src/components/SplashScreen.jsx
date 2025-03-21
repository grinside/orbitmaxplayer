import React, { useState, useRef } from "react";
import "./SplashScreen.css";
import logo from "../asset/logo.png";
import splashSound from "../asset/splash.mp3";

const SplashScreen = ({ onFinish }) => {
  const [step, setStep] = useState("login");
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username === "admin" && password === "orbitmax") {
      const audio = new Audio(splashSound);
      audio.play().catch(() => console.warn("Son bloqué"));
      setStep("splash");
      setTimeout(onFinish, 3000);
    } else {
      alert("Identifiants incorrects");
    }
  };

  return (
    <div className={`splash-screen ${step === "splash" ? "fade-out" : ""}`}>
      {step === "login" ? (
        <div className="login-container">
          <img src={logo} alt="OrbitMax" className="login-logo" />
          <form className="login-form" onSubmit={handleLogin}>
            <input type="text" placeholder="Nom d'utilisateur" ref={usernameRef} required />
            <input type="password" placeholder="Mot de passe" ref={passwordRef} required />
            <button type="submit">Se connecter</button>
          </form>
        </div>
      ) : (
        <img src={logo} alt="OrbitMax" className="splash-logo" />
      )}
    </div>
  );
};

export default SplashScreen;