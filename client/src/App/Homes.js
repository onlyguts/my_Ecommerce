import React, { useState, useEffect } from 'react';
import './Homes.css';
import images from './images.js';
import PopupForm from './PopupForm.js';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Header />
      <Nav />
      <PromoCarousel />
      <PopularProducts />
      <Main />
    </div>
  );
}

function Header() {
  const Login = localStorage.getItem('users');
  const navigate = useNavigate();
  const loginUser = JSON.parse(Login);
  const [recherche, setRecherche] = useState('');


  const openPopup = () => {
      navigate('/login')
  };


  const Deconnexion = () => {
    localStorage.removeItem('users')
    navigate('/')
  }
  const Admin = () => {
    navigate("/admin");
  }

  const valueInput = (event) => {
    setRecherche(event.target.value)
  }

  const sendInput = () => {
    if (recherche) {
      navigate('/produits/all/' + recherche)
      setRecherche('null')
    } else {
      navigate('/produits/all/null')
    }
   
  }

  return (
    <header>
      <div className='head'>
        <div className="logo">
          <img className="logoImg" src={images.logo} alt="BYP Logo" />
        </div>
        <div>
          <input className="navBar" type="text" placeholder="Recherche" onChange={(event) => valueInput(event)} />
          <button onClick={() => sendInput()}>Envoyer</button>
        </div>
        <div className="menu">
          {!loginUser
            ? <button className="menu-btn" onClick={() => openPopup()}>Connexion</button>
            : <button className="menu-btn" onClick={() => Deconnexion()}>Deconnexion</button>
          }
          {loginUser && (
            loginUser.groupe === 1 ? (
              <button className="menu-btn" onClick={Admin}>Panel Admin</button>
            ) : (
              <p></p>
            )
          )}
          <button className="menu-btn">Cart</button>
        </div>
      </div>
    </header>
  );
}

function Nav() {
  const [categorie, setProduits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:8000/categorie")
      .then(response => response.json())
      .then(data => setProduits(data))
      .catch(error => console.error('Erreur:', error));
  }, []);

  function ProduitsShow(id, name) {
    navigate("/produits/" + id);
    localStorage.setItem('categorie', name);
  }

  function AllProduits() {
    navigate("/produits/all/null");
  }

  return (
    <nav>
      <ul>
        <li className="dropdown">
          <a href="#">Catégorie</a>
          <div className="dropdown-content">
            {categorie.map(categorie => (
              <li key={categorie.id}>
                <a onClick={() => ProduitsShow(categorie.id, categorie.name)}>{categorie.name}</a>
              </li>
            ))}

          </div>
        </li>
        <li className="dropdown">
          <div onClick={() => AllProduits()}>
            <a >Tout Nos Produits</a>
          </div>
        </li>
      </ul>
    </nav>
  );
}


function PromoCarousel() {
  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        <div>
          <img src={images.cooler} alt="Promo 1" />
          <p className="legend">Promotion 1</p>
        </div>
        <div>
          <img src={images.storage} alt="Promo 2" />
          <p className="legend">Promotion 2</p>
        </div>
        <div>
          <img src={images.motherboard} alt="Promo 3" />
          <p className="legend">Promotion 3</p>
        </div>
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
    return produitstop.filter(produit => produit.id >= min && produit.id <= max);
  };

  console.log(produitstop)
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
          {limitProduit(4, 7).map(produit => (
            <ProductItemTop key={produit.id} src={produit.image} onClick={() => ProduitsShow(produit.id, produit.name, produit.views)} alt="Produit Populaire 1"  id={produit.id} categorie={produit.categorie_name} views={produit.views} name={produit.name} />
          ))}
        </div>
        {/* <div className="carousel-slide">
          {limitProduit(8, 11).map(produit => (
            <ProductItemTop key={produit.id} src={produit.image} onClick={() => ProduitsShow(produit.id, produit.name, produit.views)} alt="Produit Populaire 1" id={produit.id} categorie={produit.categorie_name} views={produit.views} name={produit.name} />
          ))}
        </div> */}
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
    <div class="imgback">
      <main class="zindex">
        <div className="main-banner">
          <h1>Build Your PC</h1>
        </div>
        <div className="grid-container">
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
            <ProductItem src={images.storage} id='7' alt="Stockage" name="Stockage" />
          </div>
          <div id='item-4'>
            <ProductItem src={images.psu} id='6' alt="Alimentation" name="Alimentation" />
          </div>
          <div id='item-5'>
            <ProductItem src={images.cpu} id='4' alt="Processeur" name="Processeur" />
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
    <div  onClick={() => ProduitsShow(id, name)} className="item">
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