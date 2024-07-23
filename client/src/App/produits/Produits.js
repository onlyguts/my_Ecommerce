import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Produits() {
  const [produits, setProduits] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://localhost:8000/categorie") // Assurez-vous que l'URL correspond à votre route API
      .then(response => response.json())
      .then(data => setProduits(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  function ProduitsShow(id) {
    navigate("/produits/" + id);
  }

  return (
    <div>
      <h1>Produits</h1>
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
