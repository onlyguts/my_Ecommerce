import React, { useState, useEffect } from 'react';
import './../Homes.css';
import images from '../images.js';
import "./allProduct.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate, useParams } from "react-router-dom";

function Nav_tree() {
    const { id } = useParams();
    const [produits, setProduits] = useState([]);
    const [categorie_trier, setcategorie_trier] = useState('');
    const [marque, setmarque] = useState('');
    const [recherche, setRechercheNom] = useState('');
    const [categorieshow, setCategorieShow] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const navigate = useNavigate();
    const marqueSolo = new Set();
    const Login = localStorage.getItem('users');
    const [showCart, setShowCart] = useState(false);
    const loginUser = JSON.parse(Login);
    const [quantity, setQuantity] = useState(0);


    useEffect(() => {
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
            fetch("https://localhost:8000/panier/" +UserAccount)
            .then(reponse => reponse.json())
            .then(data => {

                const quantity = data.reduce((sum, item) => sum + (1 * item.quantity), 0);
                setQuantity(quantity);

            })
            .catch(erreur => console.error('Erreur: ', erreur));
        }
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


    const sendInput = () => {
        if (recherche) {
            navigate('/produits/all/' + recherche)
            setRechercheNom('null')
        } else {
            navigate('/produits/all/null')
        }

    }

    useEffect(() => {
        if (id !== 'null') {
            setRechercheNom(id)
        }
    }, []);

    useEffect(() => {
        fetch("https://localhost:8000/produitsRating")
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



    const CategorieChange = (e) => {
        setcategorie_trier(e.target.value);
    };

    const MarqueChange = (e) => {
        setmarque(e.target.value);
    };

    const RechercheChange = (e) => {
        setRechercheNom(e.target.value);
    };

    const OpenProduit = (id, name) => {
        navigate("/produit/" + id);
        localStorage.setItem('categorie', name);
    };

    const produits_trier = produits.filter(produit =>
        (categorie_trier == '' || produit.categorie_name === categorie_trier || produit.marque === categorie_trier) &&
        produit.name.toLowerCase().includes(recherche.toLowerCase())
    );
    const produits2_trier = produits_trier.filter(produit =>
        (marque == '' || produit.categorie_name === marque || produit.marque === marque) &&
        produit.name.toLowerCase().includes(recherche.toLowerCase())
    );


    useEffect(() => {
        fetch("https://localhost:8000/categorie")
            .then(response => response.json())
            .then(data => setCategorieShow(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    function ProduitsShow(id, name) {
        navigate("/produits/" + id);
        localStorage.setItem('categorie', name);
    }

    function AllProduits() {
        navigate("/produits/all/null");
    }

    const Home = () => {
        navigate('/')
    }
    const toggleCart = () => {
        setShowCart(!showCart);
    };
    function Promo() {
        navigate("/promotions");
    }
    return (
        <div>
            <header className='header'>
                <div className='head'>
                    <div className="logo">
                        <img className="logoImg" src={images.logo} alt="BYP Logo" />
                    </div>
                    <div className='navBar-container'>
                        <input className="navBar" type="text" value={recherche} placeholder="Recherche" onChange={(event) => RechercheChange(event)} />
                        <button className='searchButton' onClick={() => sendInput()}>    <span className="searchIcon">🔍</span></button>
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
                     
                            <button className="menu-btn" onClick={toggleCart}>
                                Cart
                                {quantity > 0 && (
                                    <span className="quantity-circle">{quantity}</span>
                                )}
                            </button>
                        
                    </div>
                </div>
                {showCart && <Cart />}
            </header>
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
                            {categorieshow.map(categorie => (
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
            <form>
                {/* <input type='text' placeholder='Rechercher par nom' value={recherche} onChange={RechercheChange} /> */}
                <select value={categorie_trier} onChange={CategorieChange}>

                    <option value=''> Toutes les categories </option>

                    {categorie.map(categorie => (
                        <option key={categorie.id} value={categorie.name}>
                            {categorie.name}

                        </option>

                    ))}
                </select>
                <select value={marque} onChange={MarqueChange}>

                    <option value=''> Toutes les marques </option>

                    {produits_trier.map(produit => {
                        if (!marqueSolo.has(produit.marque)) {
                            marqueSolo.add(produit.marque);
                            return (
                                <option key={produit.id} value={produit.marque}>{produit.marque}</option>
                            );
                        }
                    })}
                </select>

                <button type="button">Envoyer</button>
            </form>
            <div className='all-product'>

                <div className="product-grid">
                    {produits2_trier.map(produit => (

                        <div className="product-in-grid">
                            <img src={produit.image} onClick={() => OpenProduit(produit.id, produit.categorie_name)} />
                            <span className='product-in-grid-name'>{produit.rating}</span>
                            <span className='product-in-grid-marque'>marque:{produit.marque}</span>
                            <span className='product-in-grid-price'>prix:{produit.prix}€</span>
                        </div>
                    ))}
                </div>
            </div>


        </div>
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

function ProduitsAll() {

    return (
        <div>
            <Nav_tree />
        </div>
    );
}

export default ProduitsAll;
