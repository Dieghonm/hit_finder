import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import sanduiche from '../assets/icon sanduiche.png';
import baresData from '../assets/bares.json';
import '../style/Header.css';

const Header = () => {
  const location = useLocation();
  const [BarId, setBarId] = useState('');
  const [barData, setBarData] = useState({ nome: '' });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    setBarId(decodeURIComponent(lastPart));
  }, [location]);

  useEffect(() => {
    const bar = baresData.find((bar) => bar.id === BarId);
    if (bar) {
      setBarData(bar);
    } else {
      setBarData({ nome: '' });
    }
  }, [BarId]);

  return (
    <header className="header">
      <img src={logo} className="app-logo" alt="logo" />
      <p className="bar-name">{barData.nome || 'Selecione um bar'}</p>
      <div className="menu-wrapper">
        <img
          src={sanduiche}
          alt="menu-icon"
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <div className="menu-dropdown">
            <Link to="/" className="menu-item" onClick={() => setMenuOpen(false)}>Bares</Link>
            <Link to="/favoritos" className="menu-item" onClick={() => setMenuOpen(false)}>Favoritos</Link>
            <Link to="/detalhes" className="menu-item" onClick={() => setMenuOpen(false)}>Detalhes</Link>
            <Link to={`/musicas/${BarId}`} className="menu-item" onClick={() => setMenuOpen(false)}>Karaoke</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;