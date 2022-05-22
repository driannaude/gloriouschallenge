import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faX,
  faCrown,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';

import './Navbar.scss';
import { WallectConnectButton } from './WallectConnectButton';
import logo from '../../assets/logo.png';

const NavbarComponent = () => {
  // State
  const [menuOpen, setMenuOpen] = useState(false);

  // Memoized Values
  const menuIcon = useMemo(() => (menuOpen ? faX : faBars), [menuOpen]);
  const openClass = useMemo(() => (menuOpen ? 'open' : 'closed'), [menuOpen]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'active' : '';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <NavLink data-testid="logo" to="/" className="logo">
        <img src={logo} />
        Challenge
      </NavLink>
      <div className="menu">
        <nav data-testid="menu" className={openClass}>
          <NavLink to="/" className={getLinkClass} onClick={toggleMenu}>
            <FontAwesomeIcon icon={faChartPie} />
            Dashboard
          </NavLink>
          <NavLink to="/nfts" className={getLinkClass} onClick={toggleMenu}>
            <FontAwesomeIcon icon={faCrown} />
            Assets
          </NavLink>
          <WallectConnectButton />
        </nav>
        <button
          data-testid="hamburger"
          className="hamburger-btn"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={menuIcon} />
        </button>
      </div>
    </header>
  );
};

export const Navbar = React.memo(NavbarComponent);
