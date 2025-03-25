import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import SearchView from "./components/SearchView";
import AIOverlay from "./components/AIOverlay";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import SplashScreen from "./components/SplashScreen";
import Recommendations from "./components/Recommendations";
import { useSwipeable } from "react-swipeable";

function App() {
  const [videos, setVideos] = useState({});
  const videoRefs = useRef([]);
  const [searchMode, setSearchMode] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showAI, setShowAI] = useState(false);

  const categories = Object.keys(videos); // Dynamique selon contenu JSON

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/videos.json")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Erreur de chargement des vidéos:", error));
  }, []);

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
          videoElement.play().catch((err) => console.warn("Lecture bloquée:", err));
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) observer.observe(videoRef);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos, searchMode, showRecommendations, userInteracted]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js', { type: "module" })
          .then(reg => console.log('✅ Service Worker enregistré avec succès !', reg))
          .catch(err => console.error('❌ Erreur Service Worker :', err));
      });
    }
  }, []);

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
          console.log("✅ L'utilisateur a installé l'application.");
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
        <SearchView videos={videos} categories={categories} />
      ) : (
        <div className="container">
          {videos["Maquisards"]?.map((video, index) => (
            <VideoCard
              key={index}
              {...video}
              setVideoRef={(ref) => (videoRefs.current[index] = ref)}
              autoplay={index === 0}
            />
          ))}
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
