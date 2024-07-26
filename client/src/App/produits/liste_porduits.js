import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../Nav';

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
      <Header />
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

export default Produits;
