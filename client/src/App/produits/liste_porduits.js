import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../Nav';
import images from '../images.js';
import Nav from './../Nav';
function Produits() {
  const { id } = useParams()
  const [produits, setProduits] = useState([]);
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState('');
  const Categorie = localStorage.getItem('categorie');
  const marqueSolo = new Set();
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://localhost:8000/produits/" + id)
      .then(response => response.json())
      .then(data => setProduits(data))
      .catch(error => console.error('Erreur: ', error));
  }, []);


  const ChangeCherche = (e) => {
    setRecherche(e.target.value)


  }

  const type = id === '1' ? 'taille' : id === '2' ? 'taille' : id === '4' ? 'typec' : false;
  function ProduitsShow(id) {
    navigate("/produit/" + id);
  }
  const Debut = () => {
    navigate("/")
  }
  const Mid = (id) => {
    navigate("/produits/" + id)
  }
  const produits_trier2 = produits.filter(produit => {
    if (recherche.trim() === '') {
      return true;
    }
    const taille_trouvee = produit[type] ? produit[type] === recherche : false;
    return taille_trouvee;
  });
  console.log(produits_trier2)
  return (
  
    <div>
    <Nav />
    <div className="page-container">

      
      <div className="page-header">
        <button className="nav-button" onClick={() => Debut()}>Accueil</button>/
        <button className="nav-button" onClick={() => Mid(id)}>{Categorie}</button>
      </div>
  
      <select className="custom-select" value={recherche} onChange={(e) => ChangeCherche(e)}>
        <option value=''>Toutes les options</option>
        {produits.map(produit => {
          const data = produit[type];
          if (!marqueSolo.has(data)) {
            marqueSolo.add(data);
            return (
              <option key={data} value={data}>{data}</option>
            );
          }
        })}
      </select>
  
      {produits_trier2.length === 0 ? (
        <p>Aucun produit trouvé</p>
      ) : (
        <div className="popular-products">
          <div className="carousel-slide">
            {produits_trier2.map(produit => (
              <div className="product-item" key={produit.id}>
                <img className="product-image" src={produit.image} onClick={() => ProduitsShow(produit.id)} alt={produit.name} />
                <span className="product-name">{produit.name}</span>
                <span className="product-brand">Marque: {produit.marque}</span>
                <span className="product-price">Prix: {produit.prix}€</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);



  useEffect(() => {
    // if (loginUser.verification === 0) {
    //   navigate("/")
    // }
    const UserAccount = localStorage.getItem('user_no_account');
    if (loginUser) {
      fetch("https://localhost:8000/panier/" + loginUser.id)
        .then(reponse => reponse.json())
        .then(data => {

          const quantity = data.reduce((sum, item) => sum + (1 * item.quantity), 0);
          setQuantity(quantity);

        })
        .catch(erreur => console.error('Erreur: ', erreur));
    } else {
      fetch("https://localhost:8000/panier/" + UserAccount)
        .then(reponse => reponse.json())
        .then(data => {

          const quantity = data.reduce((sum, item) => sum + (1 * item.quantity), 0);
          setQuantity(quantity);

        })
        .catch(erreur => console.error('Erreur: ', erreur));
    }
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

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (action) => {
    setIsDropdownVisible(false);
    if (action === 'admin') {
      Admin();
    } else if (action === 'logout') {
      Deconnexion();
    } else if (action === 'profil') {
      navigate('/profil');
    }
  };


  const toggleCart = () => {
    setShowCart(!showCart);
  };
  // httpsss://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  // httpsss://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  const produits_trier = produits.filter(produit => {
    const produit_trouvee = produit.name.toLowerCase().includes(recherche.toLowerCase());
    const categorie_trouvee = categorie.some(categorie => categorie.name.toLowerCase() === recherche.toLowerCase() && produit.id_categorie === categorie.id);
    return produit_trouvee || categorie_trouvee;
  });


  function ProduitsShow(id, name) {
    navigate("/produit/" + id);
    localStorage.setItem('categorie', name);
  }

  return (
    <header className='header'>
      <div className='head'>
        <div className="logo">
          <img className="logoImg" src={images.logo} alt="BYP Logo" />
        </div>
        <div className="navBar-container">
          <input
            className="navBar"
            type="text"
            placeholder="Recherche"
            onChange={(event) => valueInput(event)}
          />
          <button className="searchButton" onClick={sendInput}>
            <span>
              <img className='searchImg' src={images.search}></img>
            </span>
          </button>
        </div>
        <div className="menu">
          {!loginUser ? (

            <button className="menu-btn" onClick={() => openPopup()}>
              <img src={images.profil} alt="Connexion/profils" className="menu-icon" />
            </button>
          ) : (
            <div className="menu-dropdown-container">
              <button className="menu-btn" onClick={toggleDropdown}>
                <img src={images.para} alt="Menu utilisateur" className="menu-icon" />
              </button>
              {isDropdownVisible && (
                <div className="dropdown-menu animated-dropdown">
                  <div className="dropdown-option" onClick={() => handleOptionClick('profil')}>
                    <img src={images.profil} alt="profil" className="dropdown-icon" />
                    Profil
                  </div>
                  {loginUser && loginUser.groupe === 1 && (
                    <div className="dropdown-option" onClick={() => handleOptionClick('admin')}>
                      <img src={images.admin} alt="admin" className="dropdown-icon" />
                      Admin
                    </div>
                  )}
                  <div className="dropdown-option" onClick={() => handleOptionClick('logout')}>
                    <img src={images.deconnexion} alt="Déconnexion" className="dropdown-icon" />
                    Déconnexion
                  </div>
                </div>
              )}
            </div>
          )}
          <button className="menu-btn" onClick={toggleCart}>
            <img src={images.panier} alt="Panier" className="menu-icon" />
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
              <div key={produit.id} onClick={() => ProduitsShow(produit.id, produit.categorie_name)} className="produit-card">
                <img src={produit.image} alt={produit.name} className="produit-image" />
                <div className="produit-info">
                  <h3 className="produit-name">{produit.name}</h3>
                  <h2 className="produit-price">{produit.marque}</h2>
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
    localStorage.setItem('categorie', name);

    navigate("/produits/" + id);
    window.location.reload();
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
            <a >Accueil</a>
          </div>
        </li>
        <li className="dropdown">
          <a href="#">Catégories</a>
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
            <a >Tout nos produits</a>
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
    const UserAccount = localStorage.getItem('user_no_account');

    if (!loginUser) {
      fetch("https://localhost:8000/panier/" + UserAccount)
      .then(response => response.json())
      .then(data => {
        setCartItems(data);
        const total = data.reduce((sum, item) => sum + ((item.prix + item.price_type) * (1 - item.promo / 100) * item.quantity), 0);
        setValue(total);
      })
      .catch(error => console.error('Erreur: ', error));
    } else {
      fetch("https://localhost:8000/panier/" + loginUser.id)
        .then(response => response.json())
        .then(data => {
          setCartItems(data);
          const total = data.reduce((sum, item) => sum + ((item.prix + item.price_type) * (1 - item.promo / 100) * item.quantity), 0);
          setValue(total);
        })
        .catch(error => console.error('Erreur: ', error));
    }
  };

  useEffect(() => {
    UserPanier()
  }, []);



  const PagePanier = () => {

    navigate('/panier')
  }

  const AddProduit = (id, stock, quantity, newprice, image_type, outpout) => {
    console.log(stock >= quantity)
    if (stock - 1 >= quantity) {
      const Login = localStorage.getItem('users');
      const loginUser = JSON.parse(Login);
      const UserAccount = localStorage.getItem('user_no_account');
      let userInfos = {}
      if (loginUser) {
        userInfos = {
          id_produit: id,
          price_type: newprice,
          id_user: loginUser.id,
          image_type: image_type,
          info: outpout,
        };
      } else {
        userInfos = {
          id_produit: id,
          price_type: newprice,
          id_user: UserAccount,
          image_type: image_type,
          info: outpout,
        };
      }
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
  }


  const DeleteProduit = (id, newprice) => {
    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);

    const UserAccount = localStorage.getItem('user_no_account');
    let userInfos = {}
    if (loginUser) {
       userInfos = {
        id_produit: id,
        price_type: newprice,
        id_user: loginUser.id,
      };
    } else {
       userInfos = {
        id_produit: id,
        price_type: newprice,
        id_user: UserAccount,
      };
    }
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
      <h2 className="cart-title">Panier</h2>
      <ul className="cart-items">
        {cartItems.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.image_type} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <div className='cart-description'>
                <span className="cart-item-info">
                {item.info != 'null'
                    ? <span> {item.name} {item.info}  </span>
                    : <span> {item.name} </span>
                  }
                </span>
                <span className="cart-item-info">
                  {((item.prix + item.price_type) * (1 - item.promo / 100) * item.quantity)}€ | x1 {(item.prix + item.price_type) * (1 - item.promo / 100)}€
                </span>
              </div>

              <div className='cart-PlusMoin'>
                <button onClick={() => DeleteProduit(item.id, item.price_type)} className="cart-item-button">-</button>
                <button className="cart-item-quantity">{item.quantity}</button>
                 <button onClick={() => AddProduit(item.id, item.stock, item.quantity, item.price_type, item.image_type, item.info)} className="cart-item-button">+</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="cart-total">Prix total : {value}€</h2>
      <button onClick={() => navigate('/panier')} className="cart-view-button">AFFICHEZ LE PANIER</button>
    </div>
  );
}
export default Produits;