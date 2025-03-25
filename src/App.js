import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import SearchView from "./components/SearchView";
import AIOverlay from "./components/AIOverlay";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import SplashScreen from "./components/SplashScreen";
import Recommendations from "./components/Recommendations";
import VideoExplorer from "./components/VideoExplorer"; // ✅ Ajouté
import { useSwipeable } from "react-swipeable";

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [searchMode, setSearchMode] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showAI, setShowAI] = useState(false);

  const categories = Object.keys(videos); // Dynamique selon contenu JSON

  // 🔹 Gérer le redimensionnement
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Charger les vidéos groupées
  useEffect(() => {
  fetch("/groupedVideos.json")
    .then((res) => res.json())
    .then((data) => {
      setVideos(data); // ⚠️ doit être un tableau []
    });
}, []);

  // 🔹 Autoplay conditionnel
  useEffect(() => {
    if (searchMode || showRecommendations) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target;
        if (entry.isIntersecting && userInteracted) {
          videoElement.muted = true;
          videoElement.play().catch((err) => console.warn("Lecture bloquée :", err));
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) observer.observe(videoRef);
    });

    return () => observer.disconnect();
  }, [videos, searchMode, showRecommendations, userInteracted]);

  // 🔹 Service Worker PWA
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js", { type: "module" })
          .then((reg) => console.log("✅ Service Worker enregistré !", reg))
          .catch((err) => console.error("❌ Erreur Service Worker :", err));
      });
    }
  }, []);

  // 🔹 Prompt d'installation PWA
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    });
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("✅ L'application a été installée.");
        }
        setInstallPrompt(null);
      });
    }
  };

  // 🔹 Swipes horizontaux/verticaux
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
        <VideoExplorer groupedVideos={videos} />
      ) : (
        <div className="container">
          {Array.isArray(videos["Maquisards"]) && videos["Maquisards"].length > 0 ? (
            videos["Maquisards"].map((video, index) => (
              <VideoCard
                key={index}
                {...video}
                setVideoRef={(ref) => (videoRefs.current[index] = ref)}
                autoplay={index === 0}
              />
            ))
          ) : (
            <p style={{ color: "white", textAlign: "center" }}>
              Aucune vidéo trouvée pour Maquisards.
            </p>
          )}
        </div>
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
