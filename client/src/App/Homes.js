import React, { useState, useEffect } from 'react';
import './Homes.css';
import images from './images.js';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from "react-router-dom";

import Header from './Nav';

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
    </div>
    );

  } else {
    return (
      <div className="App">
        
        <Header />
        <PromoCarousel />
        <PopularProducts />
        <Main />
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
  console.log(promo)
  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} autoPlay infiniteLoop>
      {promo.map(produit => (
        <div key={produit.id} onClick={() => ProduitsShow(produit.id, produit.categorie_name)}>
        <img src={produit.image} alt="Promo 1" />
        {/* <p className="legend" >{produit.prix * (1 - produit.promo / 100)}€ au lieu de {produit.prix}€!</p> */}
            <p className="legend" >{produit.name} pour {produit.prix}€</p>
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
    navigate("/produits/" + id);
    localStorage.setItem('categorie', name);
  }

  const limitProduit = (min, max) => {
    return produitstop.slice(min - 1, max);
  };

 
  return (
    <div className="popular-products">
      <h2>Produits les plus populaires</h2>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay interval={3000} showArrows>
        <div className="carousel-slide">
          {limitProduit(1, 3).map(produit => (
            <ProductItemTop key={produit.id} src={produit.image} onClick={() => ProduitsShow(produit.id, produit.name, produit.views)} alt="Produit Populaire 1" id={produit.id} categorie={produit.categorie_name} views={produit.views} name={produit.name} />
          ))}
        </div>
        <div className="carousel-slide">
          {limitProduit(4, 6).map(produit => (
            <ProductItemTop key={produit.id} src={produit.image} onClick={() => ProduitsShow(produit.id, produit.name, produit.views)} alt="Produit Populaire 1"  id={produit.id} categorie={produit.categorie_name} views={produit.views} name={produit.name} />
          ))}
        </div>
        <div className="carousel-slide">
          {limitProduit(6, 8).map(produit => (
            <ProductItemTop key={produit.id} src={produit.image} onClick={() => ProduitsShow(produit.id, produit.name, produit.views)} alt="Produit Populaire 1" id={produit.id} categorie={produit.categorie_name} views={produit.views} name={produit.name} />
          ))}
        </div>
      </Carousel>
    </div>
  );
}

function Main() {
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
          <div className='byp-banner'>
            <img className='marging' src={images.BYP} alt='banniere'/>
            <button id='button-BYP'>Build Your PC</button>
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