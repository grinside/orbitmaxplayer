import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import VideoCard from "./VideoCard";
import "./SearchView.css";

const SearchView = ({ videos, categories }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentCategoryIndex((prev) => Math.min(prev + 1, categories.length - 1)),
    onSwipedRight: () => setCurrentCategoryIndex((prev) => Math.max(prev - 1, 0)),
    onSwipedUp: () => setCurrentVideoIndex((prev) => Math.min(prev + 1, videos[currentCategoryIndex].length - 1)),
    onSwipedDown: () => setCurrentVideoIndex((prev) => Math.max(prev - 1, 0)),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <div className="search-view" {...handlers}>
      <h2 className="category-title">{categories[currentCategoryIndex]}</h2>
      <VideoCard {...videos[currentCategoryIndex][currentVideoIndex]} autoplay />
    </div>
  );
};

export default SearchView;
