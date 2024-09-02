import React, { useState, useEffect } from 'react';
import './Homes.css';
import images from './images.js';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from "react-router-dom";

import Header from './Nav';
import Footer from './Footer.js';

function App() {
  const Login = localStorage.getItem('users');
  const loginUser = JSON.parse(Login);

  if (loginUser && loginUser.verification === 0 ) {
    return (
      <div className="App">
      <Header />

      <PromoCarousel />
      <PopularProducts />
      <Main />
      <Footer />
    </div>
    );

  } else {
    return (
      <div className="App">
        
        <Header />
        <PromoCarousel />
        <PopularProducts />
        <Main />
        <Footer />
      </div>
    );
  }
}


function PromoCarousel() {
  const [promo, setPromo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:8000/produits/suggestion")
      .then(response => response.json())
      .then(data => setPromo(data))
      .catch(error => console.error('Erreur:', error));
  }, []);

  function ProduitsShow(id, name) {
    navigate("/produit/" + id);
    localStorage.setItem('categorie', name);
  }

  return (

    <div className="promo-carousel-container marging">
      <Carousel 
        showThumbs={false} 
        autoPlay 
        infiniteLoop 
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button type="button" onClick={onClickHandler} className="carousel-control-prev" aria-label={label}>
              &#10094;
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button type="button" onClick={onClickHandler} className="carousel-control-next" aria-label={label}>
              &#10095;
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const indicatorClass = isSelected ? "carousel-dot selected" : "carousel-dot";
          return (
            <li
              className={indicatorClass}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`${label} ${index + 1}`}
            />
          );
        }}
      >
        {promo.map(produit => (
          <div key={produit.id} className="promo-carousel-slide" onClick={() => ProduitsShow(produit.id, produit.categorie_name)}>
            <img src={produit.image} alt={`Promo pour ${produit.name}`} />
            <p className="promo-carousel-legend">{produit.name} pour {produit.prix}€</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

function PopularProducts() {
  const [produitstop, setProduitsTop] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:8000/produits/top10")
      .then(response => response.json())
      .then(data => setProduitsTop(data))
      .catch(error => console.error('Erreur:', error));
  }, []);

  function ProduitsShow(id, name) {
    navigate("/produit/" + id);
    localStorage.setItem('categorie', name);
  }

  const limitProduit = (min, max) => {
    return produitstop.slice(min - 1, max);
  };

  return (
    <div className="popular-products-container marging">
      <h2>Produits les plus populaires</h2>
      <Carousel 
        showThumbs={false} 
        showStatus={false} 
        infiniteLoop 
        autoPlay 
        interval={3000} 
        showArrows
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button type="button" onClick={onClickHandler} className="carousel-control-prev" aria-label={label}>
              &#10094;
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button type="button" onClick={onClickHandler} className="carousel-control-next" aria-label={label}>
              &#10095;
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const indicatorClass = isSelected ? "carousel-dot selected" : "carousel-dot";
          return (
            <li
              className={indicatorClass}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`${label} ${index + 1}`}
            />
          );
        }}
      >
        <div className="popular-products-carousel-slide">
          {limitProduit(1, 6).map(produit => (
            <div key={produit.id} className="product-item-top" onClick={() => ProduitsShow(produit.id, produit.categorie_name)}>
              <img src={produit.image} alt={`Produit Populaire ${produit.name}`} />
              <p className="product-name">{produit.name}</p>
            </div>
          ))}
        </div>
        <div className="popular-products-carousel-slide">
          {limitProduit(7, 12).map(produit => (
            <div key={produit.id} className="product-item-top" onClick={() => ProduitsShow(produit.id, produit.categorie_name)}>
              <img src={produit.image} alt={`Produit Populaire ${produit.name}`} />
              <p className="product-name">{produit.name}</p>
            </div>
          ))}
        </div>
      </Carousel>
    </div>
  );
}

function Main() {
  const navigate = useNavigate();
  const [categorie, setProduits] = useState([]);
  useEffect(() => {
    fetch("https://localhost:8000/categorie")
      .then(response => response.json())
      .then(data => setProduits(data))
      .catch(error => console.error('Erreur:', error));
  }, []);
  return (
      <div class="">
      <main class="zindex">
        <div className="main-banner">
        <div className='main-banner'>
          <div className='byp-banner'>
            <img className='marging' src={images.BYP} alt='banniere'/>
            <button id='button-BYP' onClick={() => navigate('/build')}>Build Your PC</button>
          </div>  
        </div>
        </div>
        <div className="grid-container marging">
          <div id='item-0'>
            <ProductItem src={images.gpu} id='3' alt="Carte graphique" name="Carte graphique" />
          </div>
          <div id='item-1'>
            <ProductItem src={images.motherboard} id='2' alt="Carte Mère" name="Carte Mère" />
          </div>
          <div id='item-2'>
            <ProductItem src={images.ram} id='5' alt="Barrette de RAM" name="Barrette de RAM" />
          </div>
          <div id='item-3'>
            <ProductItem src={images.cpu} id='7' alt="Processeur" name="Processeur" />
          </div>
          <div id='item-4'>
            <ProductItem src={images.psu} id='6' alt="Alimentation" name="Alimentation" />
          </div>
          <div id='item-5'>
          <ProductItem src={images.storage} id='7' alt="Stockage" name="Stockage" />
          </div>
          <div id='item-6'>
            <ProductItem src={images.caseImg} id='1' alt="Boîtier" name="Boîtier" />
          </div>
          <div id='item-7'>
            <ProductItem src={images.cooler} id='9' alt="Ventirad" name="Ventirad" />
          </div>
          <div id='item-8'>
            <ProductItem src={images.aio}  id='10' alt="Water-cooling AIO" name="Water-cooling AIO" />
          </div>
        </div>
      </main>
    </div>
  );
}

function ProductItem({ src, alt, name, id }) {
  const navigate = useNavigate();
  function ProduitsShow(id, name) {
    navigate("/produits/" + id);
    localStorage.setItem('categorie', name);
  }
  return (
    <div  onClick={() => ProduitsShow(id, name)} className="item-home">
      <img src={src} alt={alt} />
      <span>{name}</span>
      
    </div>
  );
}

function ProductItemTop({ src, alt, name, id, views, categorie }) {
  const navigate = useNavigate();

  function ProduitsShow(id, categorie) {
    navigate("/produit/" + id);
    localStorage.setItem('categorie', categorie);
  }
  return (
    <div  onClick={() => ProduitsShow(id, categorie)} className="item">
      <img src={src} alt={alt} />
      <span>{name}</span>
      <span>Nb vue :{views}</span>  
    </div>
  );
}

export default App;