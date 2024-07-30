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
          <input
            className="navBar"
            type="text"
            placeholder="Recherche"
            onChange={(event) => valueInput(event)}
          />
          <button onClick={() => sendInput()}>Envoyer</button>
        </div>
        <div className="menu">
          {!loginUser
            ? <button className="menu-btn" onClick={() => openPopup()}>Connexion</button>
            : <button className="menu-btn" onClick={() => Deconnexion()}>Déconnexion</button>
          }
          {loginUser && (
            loginUser.groupe === 1 ? (
              <button className="menu-btn" onClick={Admin}>Panel Admin</button>
            ) : (
              <p></p>
            )
          )}
          <button className="menu-btn" onClick={toggleCart}>
            Cart
            {quantity > 0 && (
              <span className="quantity-circle">{quantity}</span>
            )}
          </button>
        </div>
      </div>
      {showCart && <Cart />}
      {recherche && produits_trier.length > 0 && (
        <div className="produits-trier">
          <h2>Produits Filtrés</h2>
          <div className="produits-list">
            {produits_trier.map(produit => (
              <div key={produit.id} className="produit-card">
                <img src={produit.image} alt={produit.name} className="produit-image" />
                <div className="produit-info">
                  <h3 className="produit-name">{produit.name}</h3>
                  <p className="produit-price">{produit.prix}€</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
  function Promo() {
    navigate("/promotions");
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
        <li className="dropdown">
          <div onClick={() => Promo()}>
            <a >Promotions</a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate(); 

  const UserPanier = () => {
    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);
  
    fetch("https://localhost:8000/panier/" + loginUser.id)
      .then(response => response.json())
      .then(data => {
        setCartItems(data);
        const total = data.reduce((sum, item) => sum + (item.prix * item.quantity), 0);
        setValue(total);
      })
      .catch(error => console.error('Erreur: ', error));
  };

  useEffect(() => {
    UserPanier()
  }, []);


  const PagePanier = () => {

    navigate('/panier')
  }

  const AddProduit = (id) => {
    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);

    const userInfos = {
        id_produit: id,
        id_user: loginUser.id,
    };
    fetch("https://localhost:8000/panier/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfos),
    })

        .then(response => {
            response.json();
            UserPanier()


        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}


const DeleteProduit = (id) => {
    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);

    const userInfos = {
        id_produit: id,
        id_user: loginUser.id,
    };
    fetch("https://localhost:8000/panier/delete", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfos),
    })

        .then(response => {
            response.json();
            UserPanier()


        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

  return (
    <div className='cart'>
      <h2>Panier</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <button onClick={() => DeleteProduit(item.id)}>-</button>
            <button >{item.quantity}</button>
            <button onClick={() => AddProduit(item.id)}>+</button>
            <span> {item.name} - {(item.prix * item.quantity)}€ | x1 {item.prix}€ </span>
          </li>
        ))}
        <h2>Prix total : {value}€</h2>
        <button onClick={() => PagePanier()}>AFFICHEZ LE PANIER</button>
      </ul>
    </div>
  );
}
export default Nav