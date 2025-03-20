import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import SearchView from "./components/SearchView";
import AIOverlay from "./components/AIOverlay";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [searchMode, setSearchMode] = useState(false); // Mode recherche activé/désactivé
  const [userInteracted, setUserInteracted] = useState(false); // Pour éviter le blocage de lecture
  const categories = ["Sport", "Musique", "Actualités", "Divertissement"];
  const [showSplash, setShowSplash] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer); // Nettoyage du timer
  }, []);

  return showSplash ? <SplashScreen onFinish={() => setShowSplash(false)} /> : <MainApp />;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('Service Worker enregistré !', reg))
    .catch(err => console.error('Erreur Service Worker :', err));
}

  useEffect(() => {
    fetch("/videos.json")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Erreur de chargement des vidéos:", error));
  }, []);

  useEffect(() => {
    if (searchMode) return; // Désactiver l'autoplay en mode recherche

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
  }, [videos, searchMode, userInteracted]);

  // 🔥 Correction: `setVideoRef` est maintenant défini correctement
  const handleVideoRef = (index) => (ref) => {
    if (ref) {
      videoRefs.current[index] = ref;
    }
  };

  return (
    <div className="app" onClick={() => setUserInteracted(true)}>
      <TopNavbar className="top-navbar" />
      <AIOverlay />
      {/* Bouton pour activer/désactiver le mode recherche */}
      <button className="search-toggle" onClick={() => setSearchMode(!searchMode)}>
        {searchMode ? "Retour au Feed" : "Recherche 🔍"}
      </button>

      {/* Affichage conditionnel : mode recherche ou mode classique */}
      {searchMode ? (
        <SearchView videos={videos} categories={categories} />
      ) : (
        <div className="container">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              username={video.username}
              description={video.description}
              song={video.song}
              likes={video.likes}
              saves={video.saves}
              comments={video.comments}
              shares={video.shares}
              url={video.url}
              profilePic={video.profilePic}
              setVideoRef={handleVideoRef(index)} // ✅ Correction ici
              autoplay={index === 0}
            />
          ))}
        </div>
      )}

      <BottomNavbar className="bottom-navbar" />
    </div>
  );
}

export default App;

