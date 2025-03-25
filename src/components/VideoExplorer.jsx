import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import VideoCard from "./VideoCard";
import "./VideoExplorer.css";

const VideoExplorer = ({ groupedVideos }) => {
  const [verticalIndex, setVerticalIndex] = useState(0);
  const [horizontalIndex, setHorizontalIndex] = useState(0);
  const [isExploringGroup, setIsExploringGroup] = useState(false);

  const initialFeed = groupedVideos.map(group => ({
    ...group,
    items: [group.items[0]] // ne garder que le premier contenu de chaque groupe
  }));

  const activeGroup = isExploringGroup
    ? groupedVideos[verticalIndex]
    : initialFeed[verticalIndex];

  const activeVideo = activeGroup.items[horizontalIndex];

  const getSiblingsInSameCategory = () => {
    return groupedVideos.filter(
      (g) => g.category === activeGroup.category && g.type === "chaine"
    );
  };

  const getNewGroupIndex = (direction) => {
    const siblings = getSiblingsInSameCategory();
    const currentIdx = siblings.findIndex((g) => g.groupId === activeGroup.groupId);
    const nextIdx = currentIdx + direction;
    if (nextIdx >= 0 && nextIdx < siblings.length) {
      const newGroup = siblings[nextIdx];
      return groupedVideos.findIndex((g) => g.groupId === newGroup.groupId);
    }
    return verticalIndex;
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeGroup.type === "serie") {
        if (horizontalIndex < activeGroup.items.length - 1) {
          setHorizontalIndex(horizontalIndex + 1);
          setIsExploringGroup(true);
        }
      } else {
        const newGroupIndex = getNewGroupIndex(1);
        if (newGroupIndex !== verticalIndex) {
          setVerticalIndex(newGroupIndex);
          setHorizontalIndex(0);
          setIsExploringGroup(true);
        }
      }
    },
    onSwipedRight: () => {
      if (activeGroup.type === "serie") {
        if (horizontalIndex > 0) {
          setHorizontalIndex(horizontalIndex - 1);
          setIsExploringGroup(true);
        }
      } else {
        const newGroupIndex = getNewGroupIndex(-1);
        if (newGroupIndex !== verticalIndex) {
          setVerticalIndex(newGroupIndex);
          setHorizontalIndex(0);
          setIsExploringGroup(true);
        }
      }
    },
    onSwipedUp: () => {
      if (!isExploringGroup && verticalIndex < initialFeed.length - 1) {
        setVerticalIndex(verticalIndex + 1);
        setHorizontalIndex(0);
      }
    },
    onSwipedDown: () => {
      if (!isExploringGroup && verticalIndex > 0) {
        setVerticalIndex(verticalIndex - 1);
        setHorizontalIndex(0);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="video-explorer" {...handlers}>
      <h3 className="group-label">
        {activeGroup.type === "serie" ? "🎬 Série" : "📺 Chaîne"} – {activeGroup.username}
      </h3>
      <VideoCard {...activeVideo} autoplay />
    </div>
  );
};

export default VideoExplorer;
