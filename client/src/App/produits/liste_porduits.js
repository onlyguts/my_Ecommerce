import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../Nav';
import images from '../images.js';
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
      <Nav_one />
      <Nav_two />
      <h1><button onClick={() => Debut()}>Home</button>/<button onClick={() => Mid(id)}>{Categorie}</button></h1>

      <select value={recherche} onChange={(e) => ChangeCherche(e)}>

        <option value=''> Toutes les options </option>



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

              <div className="item">
                <img src={produit.image} onClick={() => ProduitsShow(produit.id)} />
                <span>{produit.name}</span>
                <span>marque:{produit.marque}</span>
                <span>prix:{produit.prix}€</span>
              </div>
            ))}

          </div>


        </div>
        // <ul>
        //   {produits.map(produit => (
        //   <li key={produit.id}>
        //     <p onClick={() => ProduitsShow(produit.id)}>{produit.name}</p>
        //   </li>
        // ))}
        // </ul>
      )}
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
 
    if (loginUser) {
      fetch("https://localhost:8000/panier/" + loginUser.id)
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
  const produits_trier = produits.filter(produit => {
    const produit_trouvee = produit.name.toLowerCase().includes(recherche.toLowerCase());
    const categorie_trouvee = categorie.some(categorie => categorie.name.toLowerCase() === recherche.toLowerCase() && produit.id_categorie === categorie.id);
    return produit_trouvee || categorie_trouvee;
  });



  const toggleCart = () => {
    setShowCart(!showCart);
  };
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
            {loginUser && (
            <button className="menu-btn" onClick={toggleCart}>
              Cart
              {quantity > 0 && (
                <span className="quantity-circle">{quantity}</span>
              )}
            </button>
          )}
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
        const total = data.reduce((sum, item) => sum + (item.prix * (1 - item.promo / 100) * item.quantity), 0);
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

  const AddProduit = (id, stock, quantity) => {
    console.log(stock >= quantity)
    if (stock - 1 >= quantity) {
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
      <h2 className="cart-title">Panier</h2>
      <ul className="cart-items">
        {cartItems.map(item => (
          <li key={item.id} className="cart-item">
            <button onClick={() => DeleteProduit(item.id)} className="cart-item-button">-</button>
            <button className="cart-item-quantity">{item.quantity}</button>
            <button onClick={() => AddProduit(item.id, item.stock, item.quantity)} className="cart-item-button">+</button>
            <span className="cart-item-details">
              {item.name} - {(item.prix * (1 - item.promo / 100) * item.quantity)}€ | x1 {item.prix * (1 - item.promo / 100)}€
            </span>
          </li>
        ))}
      </ul>
      <h2 className="cart-total">Prix total : {value}€</h2>
      <button onClick={() => PagePanier()} className="cart-view-button">AFFICHEZ LE PANIER</button>
    </div>
  );
}
export default Produits;
