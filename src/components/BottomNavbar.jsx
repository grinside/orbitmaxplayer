import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserFriends, faInbox, faUser } from '@fortawesome/free-solid-svg-icons';
import maxitLogo from '../asset/logo.png'; // Assure-toi du chemin

function BottomNavbar({ onToggleAI }) {
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
        <img src={maxitLogo} alt="Maxit" className="maxit-icon" />
        <span className="item-name">Maxit</span>
      </div>
      <div className="nav-item" onClick={onToggleAI}>
        🧠
        <span className="item-name">IA</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faUser} className="icon" />
        <span className="item-name">Profile</span>
      </div>
    </div>
  );
}

export default BottomNavbar;