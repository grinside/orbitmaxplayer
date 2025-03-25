import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import VideoCard from "./VideoCard";
import "./VideoExplorer.css";

const VideoExplorer = ({ groupedVideos }) => {
  const [groupIndex, setGroupIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  const currentGroup = groupedVideos[groupIndex];
  const currentVideo = currentGroup.items[videoIndex];

  const nextGroupIndex = (direction) => {
    const sameCategoryGroups = groupedVideos.filter(
      (g) => g.category === currentGroup.category && g.type === "chaine"
    );
    const currentIndexInCategory = sameCategoryGroups.findIndex(
      (g) => g.groupId === currentGroup.groupId
    );
    const newIndexInCategory = currentIndexInCategory + direction;
    if (
      newIndexInCategory >= 0 &&
      newIndexInCategory < sameCategoryGroups.length
    ) {
      const newGroup = sameCategoryGroups[newIndexInCategory];
      const absoluteIndex = groupedVideos.findIndex(
        (g) => g.groupId === newGroup.groupId
      );
      return absoluteIndex;
    }
    return groupIndex;
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentGroup.type === "serie") {
        // Dans une série, swipe horizontal = prochain épisode
        if (videoIndex < currentGroup.items.length - 1) {
          setVideoIndex(videoIndex + 1);
        }
      } else {
        const newIndex = nextGroupIndex(1);
        if (newIndex !== groupIndex) {
          setGroupIndex(newIndex);
          setVideoIndex(0);
        }
      }
    },
    onSwipedRight: () => {
      if (currentGroup.type === "serie") {
        // Dans une série, swipe horizontal = épisode précédent
        if (videoIndex > 0) {
          setVideoIndex(videoIndex - 1);
        }
      } else {
        const newIndex = nextGroupIndex(-1);
        if (newIndex !== groupIndex) {
          setGroupIndex(newIndex);
          setVideoIndex(0);
        }
      }
    },
    onSwipedUp: () => {
      // Vertical swipe : contenu suivant dans le groupe
      if (videoIndex < currentGroup.items.length - 1) {
        setVideoIndex(videoIndex + 1);
      }
    },
    onSwipedDown: () => {
      // Vertical swipe : contenu précédent
      if (videoIndex > 0) {
        setVideoIndex(videoIndex - 1);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="video-explorer" {...handlers}>
      <h3 className="group-label">
        {currentGroup.type === "serie" ? "🎬 Série" : "📺 Chaîne"} – {currentGroup.username}
      </h3>
      <VideoCard {...currentVideo} autoplay />
    </div>
  );
};

export default VideoExplorer;
