import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserFriends, faInbox, fa7, faUser } from '@fortawesome/free-solid-svg-icons';
import maxitLogo from '../../public/logo.png'; // 📌 Assure-toi que le chemin du logo est correct

function BottomNavbar() {
  return (
    <div className="bottom-navbar">
      <div className="nav-item">
        <FontAwesomeIcon icon={faHouse} className="icon active" />
        <span className="item-name active">Home</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faUserFriends} className="icon" />
        <span className="item-name">Friends</span>
      </div>
      <div className="nav-item">
        <img src={maxitLogo} alt="Maxit" className="maxit-icon" /> {/* 🔹 Remplacement de faPlus par le logo */}
        <span className="item-name">Maxit</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={fa7} className="notification" />
        <FontAwesomeIcon icon={faInbox} className="icon" />
        <span className="item-name">Inbox</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faUser} className="icon" />
        <span className="item-name">Profile</span>
      </div>
    </div>
  );
}

export default BottomNavbar;