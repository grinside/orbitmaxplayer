import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";
import "./VideoCard.css";

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, autoplay } = props;
  const videoRef = useRef(null);
  const adVideoRef = useRef(null);
  const [showAd, setShowAd] = useState(true); // Par défaut, afficher la pub

  // 🔹 URL de la pub Revive Adserver (à remplacer par ton vrai tag VAST)
  const adUrl = "https://ad.maxit.live/www/delivery/fc.php?script=apVideo:vast2&zoneid=4";

  useEffect(() => {
    const video = videoRef.current;
    const adVideo = adVideoRef.current;

    if (!video || !adVideo) return;

    // 🔸 Charger la pub en premier
    if (showAd) {
      adVideo.src = adUrl;
      adVideo.play()
        .catch((err) => console.warn("Autoplay de la pub bloqué:", err));

      adVideo.onended = () => {
        setShowAd(false); // Passer à la vraie vidéo
        video.play().catch((err) => console.warn("Autoplay de la vidéo bloqué:", err));
      };
    }

    return () => {
      if (adVideo) {
        adVideo.pause();
      }
    };
  }, [showAd]);

  const onVideoPress = () => {
    if (showAd) {
      adVideoRef.current.paused ? adVideoRef.current.play() : adVideoRef.current.pause();
    } else {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    }
  };

  return (
    <div className="video">
      {showAd ? (
        <video
          className="player"
          ref={adVideoRef}
          muted
          playsInline
          controls
        />
      ) : (
        <video
          className="player"
          onClick={onVideoPress}
          ref={videoRef}
          loop
          muted
          playsInline
          controls
        >
          {!url.endsWith(".m3u8") && <source src={url} type="video/mp4" />}
        </video>
      )}

      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
