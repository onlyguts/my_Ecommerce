import React, { useState } from 'react';
import './Homes.css';
import images from './images.js';
import PopupForm from './PopupForm';
import { useNavigate } from "react-router-dom";

function Homes() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="App">
      <Header openPopup={openPopup} />
      <Nav />
      <Main />
      {isPopupOpen && <PopupForm closePopup={closePopup} />}
    </div>
  );
}

function Header({ openPopup }) {
  return (
    <header>
        <div className='head'>
            <div className="logo">
                <img className="logoImg" src={images.logo} alt="BYP Logo" />
            </div>
            <input className="navBar" type="text" placeholder="Recherche" />
            <div className="menu">
                <button className="menu-btn" onClick={openPopup}>Connexion</button>
                <button className="menu-btn">Cart</button>
            </div>
        </div>
    </header>
  );
}

function Nav() {
    
  const navigate = useNavigate();

  const handleClick = () => {
      navigate("/admin");
  }
  return (
    <nav>
      <ul>
        <li><a href="test">Tout Nos Produits</a></li>
        <li><a href="test">Carte graphique</a></li>
        <li><a href="test">Processeur</a></li>
        <li><a href="test">Carte Mère</a></li>
        <li><a href="test">Barrette RAM</a></li>
        <li><a href="test">Stockage</a></li>
        <li><a href="test">Boîtier</a></li>
        <li><a onClick={handleClick}>Panel Admin</a></li>
      </ul>
    </nav>
  );
}

function Main() {
  return (
    <main>
      <div className="main-banner">
        <h1>Build Your PC</h1>
      </div>
      <div className="grid-container">
        <ProductItem src={images.gpu} alt="Carte graphique" name="Carte graphique" />
        <ProductItem src={images.motherboard} alt="Carte Mère" name="Carte Mère" />
        <ProductItem src={images.ram} alt="Barrette de RAM" name="Barrette de RAM" />
        <ProductItem src={images.storage} alt="Stockage" name="Stockage" />
        <ProductItem src={images.psu} alt="Alimentation" name="Alimentation" />
        <ProductItem src={images.cpu} alt="Processeur" name="Processeur" />
        <ProductItem src={images.caseImg} alt="Boîtier" name="Boîtier" />
        <ProductItem src={images.cooler} alt="Ventirad" name="Ventirad" />
        <ProductItem src={images.aio} alt="Water-cooling AIO" name="Water-cooling AIO" />
      </div>
    </main>
  );
}

function ProductItem({ src, alt, name }) {
  return (
    <div className="item">
      <img src={src} alt={alt} />
      <span>{name}</span>
    </div>
  );
}

export default Homes;