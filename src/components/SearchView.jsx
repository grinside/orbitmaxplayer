import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import VideoCard from "./VideoCard";
import "./SearchView.css";

const SearchView = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gestion des swipes gauche/droite
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => Math.min(prev + 1, videos.length - 1)),
    onSwipedRight: () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <div className="search-view" {...handlers}>
      <div className="video-container" style={{ transform: `translateX(-${currentIndex * 100}vw)` }}>
        {videos.map((video, index) => (
          <div key={index} className="video-wrapper">
            <VideoCard {...video} autoplay={index === currentIndex} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchView;
