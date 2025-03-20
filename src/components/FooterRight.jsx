import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';

function FooterRight({ likes, comments, saves, shares, profilePic }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(faCirclePlus);
    }, 3000);
  };

  const parseLikesCount = (count) => {
    if (typeof count === 'string') {
      if (count.includes('K')) return parseFloat(count) * 1000;
      return parseInt(count, 10);
    }
    return count;
  };

  const formatLikesCount = (count) => (count >= 1000 ? (count / 1000).toFixed(1) + 'K' : count);

  const handleLikeClick = () => setLiked((prevLiked) => !prevLiked);
  const handleSaveClick = () => setSaved((prevSaved) => !prevSaved);

  return (
    <div className="footer-right-container">
      <div className="footer-right">
        <div className="sidebar-icon">
          {profilePic && (
            <img src={profilePic} className="userprofile" alt="Profile" style={{ width: '45px', height: '45px' }} />
          )}
          <FontAwesomeIcon icon={userAddIcon} className="useradd" style={{ width: '18px', height: '18px', color: '#FF0000' }} onClick={handleUserAddClick} />
        </div>
        <div className="sidebar-icon">
          <FontAwesomeIcon
            icon={faHeart}
            style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }}
            onClick={handleLikeClick}
          />
          <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
        </div>
        <div className="sidebar-icon">
          <FontAwesomeIcon icon={faCommentDots} style={{ width: '35px', height: '35px', color: 'white' }} />
          <p>{comments}</p>
        </div>
        <div className="sidebar-icon">
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: saved ? '#ffc107' : 'white' }}
            onClick={handleSaveClick}
          />
          <p>{saved ? saves + 1 : saves}</p>
        </div>
        <div className="sidebar-icon">
          <FontAwesomeIcon icon={faShare} style={{ width: '35px', height: '35px', color: 'white' }} />
          <p>{shares}</p>
        </div>
        <div className="sidebar-icon record">
          <img src="https://static.thenounproject.com/png/934821-200.png" alt="Record Icon" />
        </div>
      </div>
    </div>
  );
}

export default FooterRight;
