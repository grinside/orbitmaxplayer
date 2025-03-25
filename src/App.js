import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import AIOverlay from "./components/AIOverlay";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import SplashScreen from "./components/SplashScreen";
import Recommendations from "./components/Recommendations";
import VideoExplorer from "./components/VideoExplorer";
import { useSwipeable } from "react-swipeable";

function App() {
  const [groupedVideos, setGroupedVideos] = useState([]);
  const videoRefs = useRef([]);
  const [searchMode, setSearchMode] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    fetch("/groupedVideos.json")
      .then((res) => res.json())
      .then((data) => setGroupedVideos(data))
      .catch((err) => console.error("Erreur chargement groupedVideos.json :", err));
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js', { type: "module" })
          .then(reg => console.log('✅ Service Worker enregistré !', reg))
          .catch(err => console.error('❌ Erreur SW :', err));
      });
    }
  }, []);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("✅ Application installée.");
        }
        setInstallPrompt(null);
      });
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowRecommendations(true),
    onSwipedRight: () => setShowRecommendations(false),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <div className="app" onClick={() => setUserInteracted(true)} {...handlers}>
      <TopNavbar className="top-navbar" />

      <AIOverlay isOpen={showAI} onClose={() => setShowAI(false)} />

      {installPrompt && (
        <button onClick={handleInstallClick} className="install-button">
          📲 Installer OrbitMax
        </button>
      )}

      {showRecommendations ? (
        <Recommendations />
      ) : searchMode ? (
        <p style={{ color: "white" }}>🔍 Recherche activée (à implémenter)</p>
      ) : (
        groupedVideos.length > 0 ? (
          <VideoExplorer groupedVideos={groupedVideos} />
        ) : (
          <p style={{ color: "white", textAlign: "center" }}>Aucune vidéo disponible.</p>
        )
      )}

      <BottomNavbar
        className="bottom-navbar"
        style={{ position: "fixed", bottom: 0, width: "100vw", zIndex: 1000 }}
        onToggleAI={() => setShowAI((prev) => !prev)}
        onSearchToggle={() => setSearchMode((prev) => !prev)}
      />
    </div>
  );
}

export default App;
