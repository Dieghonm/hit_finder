import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import sanduiche from '../assets/icon sanduiche.png';
import baresData from '../assets/bares.json';
import '../style/Header.css';

const Header = ({props, setEscolhido,  escolhido}) => {
  const location = useLocation();
  const [BarId, setBarId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    setBarId(decodeURIComponent(lastPart));
  }, [location]);

  useEffect(() => {
    const bar = baresData.find((bar) => bar.id === BarId);
    if (bar) {
      setEscolhido(bar)
    } else {
      setEscolhido({id: 0, nome: ''});
    }
  }, [BarId]);

  return (
    <header className="header">
      <img src={logo} className="app-logo" alt="logo" />
      <div className="bar-nam-div">
        <p className="bar-name">{escolhido.nome || 'Selecione um bar'}</p>
        <p className="bar-name">{escolhido.apelido || ''}</p>
      </div>

      <div className="menu-wrapper">
        <img
          src={sanduiche}
          alt="menu-icon"
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <div className="menu-dropdown">
            {props !== 'QRCODE' && (<Link to="/" className="menu-item" onClick={() => setMenuOpen(false)}>Bares</Link>)}
            <Link to="/favoritos" className="menu-item" onClick={() => setMenuOpen(false)}>Favoritos</Link>
            {escolhido.id !== 0 && <Link to={`/detalhes/${BarId}`} className="menu-item" onClick={() => setMenuOpen(false)}>Detalhes</Link>}
            {escolhido.id !== 0 && <Link to={`/musicas/${BarId}`} className="menu-item" onClick={() => setMenuOpen(false)}>Karaoke</Link>}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;