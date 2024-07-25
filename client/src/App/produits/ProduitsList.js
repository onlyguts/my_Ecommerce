import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";


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

    <h1><button onClick={() => Debut()}>Home</button>/<button onClick={() => Mid(id)}>{Categorie}</button></h1>
      {produits.length === 0 ? (
        <p>Aucun produit trouvé</p>
      ) : (
        
        <ul>
          {produits.map(produit => (
            <li key={produit.id}>
              <p onClick={() => ProduitsShow(produit.id)}>{produit.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Produits;
