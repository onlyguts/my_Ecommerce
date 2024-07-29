import React, { useState, useEffect } from 'react';
import './Homes.css';
import images from './images.js';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from "react-router-dom";

function Nav() {

    return (
      <div>
        <Nav_one />
        <Nav_two />
      </div>
    );
  }

function Nav_one() {
    const Login = localStorage.getItem('users');
    const navigate = useNavigate();
    const loginUser = JSON.parse(Login);
    const [recherche, setRecherche] = useState('');
    const [produits, setProduits] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [quantity, setQuantity] = useState(0);
        const [categorie, setCategorie] = useState([]);
    
    useEffect(() => {
        fetch("https://localhost:8000/panier/" + loginUser.id)
            .then(reponse => reponse.json())
            .then(data => {
            
              const quantity = data.reduce((sum, item) => sum + (1 * item.quantity), 0);
              setQuantity(quantity);
     
            })
            .catch(erreur => console.error('Erreur: ', erreur));
    }, []);
  
    useEffect(() => {
      fetch("https://localhost:8000/produits")
          .then(response => response.json())
          .then(data => setProduits(data))
          .catch(error => console.error('Erreur: ', error));
  }, []);
  
  useEffect(() => {
    fetch("https://localhost:8000/categorie")
        .then(response => response.json())
        .then(data => setCategorie(data))
        .catch(error => console.error('Erreur: ', error));
}, []);
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

    
    const toggleCart = () => {
      setShowCart(!showCart);
    };
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/some
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     const produits_trier = produits.filter(produit => {
      const produit_trouvee = produit.name.toLowerCase().includes(recherche.toLowerCase());
      const categorie_trouvee = categorie.some(categorie => categorie.name.toLowerCase() === recherche.toLowerCase() && produit.id_categorie === categorie.id);
      return produit_trouvee || categorie_trouvee;
    });

    console.log(produits_trier)

  
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
                <button className="menu-btn" onClick={toggleCart}>Cart {quantity}</button>
            
          </div>
        </div>
        {showCart && <Cart />}
      </header>
    );
  }

  
function Nav_two() {
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

    function Home() {
        navigate("/");
      }
  
    return (
      <nav>
        <ul>
          <li className="dropdown">
            <div onClick={() => Home()}>
              <a >Home</a>
            </div>
          </li>
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

  function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("https://localhost:8000/panier/" + loginUser.id)
            .then(reponse => reponse.json())
            .then(data => {
              setCartItems(data);
              const total = data.reduce((sum, item) => sum + (item.prix * item.quantity), 0);
      
              setValue(total);
            })
            .catch(erreur => console.error('Erreur: ', erreur));
    }, []);

 
    const PagePanier  = () => {
      
      navigate('/panier')
    }

    return (
      <div className='cart'>
        <h2>Panier</h2>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <span>x{item.quantity} - {item.name}</span> - <span>{(item.prix * item.quantity)}€ | x1 {item.prix}€</span>
            </li>
          ))}
          <h2>Prix total : {value}€</h2>
          <button onClick={() => PagePanier()}>AFFICHEZ LE PANIER</button>
        </ul>
      </div>
    );
  }
export default Nav