import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../Nav';
import images from '../images.js';
function Produits() {
  const { id } = useParams()
  const [produits, setProduits] = useState([]);
  const navigate = useNavigate();
  const Categorie = localStorage.getItem('categorie');

  console.log(id)
  useEffect(() => {
    fetch("https://localhost:8000/produits/" + id)
      .then(response => response.json())
      .then(data => setProduits(data))
      .catch(error => console.error('Erreur: ', error));
  }, []);

  function ProduitsShow(id) {
    navigate("/produit/" + id);
  }
  const Debut = () => {
    navigate("/")
  }
  const Mid = (id) => {
    navigate("/produits/" + id)
  }
  return (
    <div>
  <Nav_one />
  <Nav_two />
      <h1><button onClick={() => Debut()}>Home</button>/<button onClick={() => Mid(id)}>{Categorie}</button></h1>
      {produits.length === 0 ? (
        <p>Aucun produit trouvé</p>
      ) : (
        <div className="popular-products">

          <div className="carousel-slide">
            {produits.map(produit => (
      
              <div  className="item">
              <img src={produit.image}  onClick={() => ProduitsShow(produit.id)}/>
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
export default Produits;
