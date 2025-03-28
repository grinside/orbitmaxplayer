import React, { useRef, useEffect } from "react";
import Hls from "hls.js";
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";
import "./VideoCard.css";

const VideoCard = ({ url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance = null;

    if (Hls.isSupported() && url.endsWith(".m3u8")) {
      hlsInstance = new Hls();
      hlsInstance.loadSource(url);
      hlsInstance.attachMedia(video);

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoplay) {
          video.muted = true;
          video.play().catch((err) => console.warn("Autoplay bloqué:", err));
        }
      });
    } else if (autoplay) {
      video.muted = true;
      video.play().catch((err) => console.warn("Autoplay bloqué:", err));
    }

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [url, autoplay]);

  const onVideoPress = () => {
    if (!videoRef.current) return;
    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
  };

  return (
    <div className="video">
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          if (setVideoRef) setVideoRef(ref);
        }}
        loop
        muted
        playsInline
        controls
      >
        {!url.endsWith(".m3u8") && <source src={url} type="video/mp4" />}
      </video>

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


