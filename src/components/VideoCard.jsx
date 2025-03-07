import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-ads";
import "videojs-ima";
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";
import "./VideoCard.css";

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic } = props;
  const videoRef = useRef(null);

  // ✅ URL de la pub VAST (Revive Adserver)
  const adUrl = "https://ad.maxit.live/www/delivery/fc.php?script=apVideo:vast2&zoneid=4";

  useEffect(() => {
    if (!videoRef.current) return;

    const playerInstance = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      muted: true,
      playsInline: true,
      preload: "auto",
      loop: false,
      techOrder: ["html5"],
      sources: [{ src: url, type: "video/mp4" }],
    });

    // 🔹 Intégration de la pub VAST via IMA
    playerInstance.ima({
      adTagUrl: adUrl,
      debug: true,
    });

    playerInstance.on("ads-ad-ended", () => {
      console.log("Pub terminée, affichage de la vidéo");
      playerInstance.play();
    });

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


