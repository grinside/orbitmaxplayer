import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-ads"; // Gestion des pubs
import "videojs-ima"; // Plugin VAST
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";
import "./VideoCard.css";

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, autoplay } = props;
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [showAd, setShowAd] = useState(true);

  // ✅ URL de la pub VAST (Revive Adserver)
  const adUrl = "https://ad.maxit.live/www/delivery/fc.php?script=apVideo:vast2&zoneid=4";

  useEffect(() => {
    if (!videoRef.current) return;

    // ⚡ Initialisation du lecteur Video.js
    const videoJsOptions = {
      controls: true,
      autoplay: false,
      muted: true,
      playsInline: true,
      preload: "auto",
      loop: false,
      techOrder: ["html5"],
      sources: [{ src: url, type: "video/mp4" }],
    };

    const playerInstance = videojs(videoRef.current, videoJsOptions, () => {
      console.log("Lecteur Video.js chargé");
    });

    // 🔹 Ajout du plugin IMA pour gérer la pub
    playerInstance.ima({
      adTagUrl: adUrl,
      debug: true, // Permet de voir les logs de l'ads manager
    });

    // 🔹 Gérer la fin de la pub
    playerInstance.on("ads-ad-ended", () => {
      console.log("Pub terminée, affichage de la vidéo");
      setShowAd(false); // Masquer la pub après sa lecture
      playerInstance.play(); // Lancer la vidéo principale
    });

    setPlayer(playerInstance);

    return () => {
      if (playerInstance) {
        playerInstance.dispose();
      }
    };
  }, [url]);

  return (
    <div className="video">
      <video ref={videoRef} className="video-js vjs-default-skin" />

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

