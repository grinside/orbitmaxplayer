import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import VideoCard from "./VideoCard";
import "./SearchView.css";

const SearchView = ({ videos, categories }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const currentCategory = categories[currentCategoryIndex];
  const categoryVideos = videos[currentCategory] || [];

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const nextIndex = Math.min(currentCategoryIndex + 1, categories.length - 1);
      if (nextIndex !== currentCategoryIndex) {
        setCurrentCategoryIndex(nextIndex);
        setCurrentVideoIndex(0); // reset to first video of next category
      }
    },
    onSwipedRight: () => {
      const prevIndex = Math.max(currentCategoryIndex - 1, 0);
      if (prevIndex !== currentCategoryIndex) {
        setCurrentCategoryIndex(prevIndex);
        setCurrentVideoIndex(0); // reset to first video of previous category
      }
    },
    onSwipedUp: () => {
      const nextVideoIndex = Math.min(currentVideoIndex + 1, categoryVideos.length - 1);
      setCurrentVideoIndex(nextVideoIndex);
    },
    onSwipedDown: () => {
      const prevVideoIndex = Math.max(currentVideoIndex - 1, 0);
      setCurrentVideoIndex(prevVideoIndex);
    },
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <div className="search-view" {...handlers}>
      <h2 className="category-title">{currentCategory}</h2>
      {categoryVideos.length > 0 ? (
        <VideoCard {...categoryVideos[currentVideoIndex]} autoplay />
      ) : (
        <p style={{ color: "white", textAlign: "center" }}>Aucune vidéo disponible pour cette catégorie.</p>
      )}
    </div>
  );
};

export default SearchView;