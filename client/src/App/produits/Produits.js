import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Produits() {
  const [produits, setProduits] = useState([]);
  const [produitstop, setProduitsTop] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://localhost:8000/categorie")
      .then(response => response.json())
      .then(data => setProduits(data))
      .catch(error => console.error('Erreur:', error));
  }, []);

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
  const Debut = () => {
    navigate("/produits")
  }

  return (
    <div>
      <h1><button onClick={() => Debut()}>Categorie</button></h1>
      {produits.length === 0 ? (
        <p>Aucun produit trouvé</p>
      ) : (
        <div>

          <div>
          <ol>
            {produitstop.map(produit => (
      
                <li key={produit.id} onClick={() => ProduitsShow(produit.id, produit.name)}>{produit.name} | Vue : {produit.views}</li>
            
            ))}
              </ol>
          </div>
          <ul>
            {produits.map(produit => (
              <li key={produit.id}>
                <p onClick={() => ProduitsShow(produit.id, produit.name)}>{produit.name}</p>
              </li>
            ))}
          </ul>
          </div>
      )}
     
    </div>

  );
}

export default Produits;
