import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProduitDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://localhost:8000/produit/` + id) 
      .then(response => response.json())
      .then(data => setProduit(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  return (
    <div>
      <h1>Produit Détail</h1>
      {produit ? (
        <div>
          <h2>{produit.name}</h2>
          <p>Nom du produits: {produit.name}</p>
        </div>
      ) : (
        <p>Produit non trouvé</p>
      )}
    </div>
  );
}

export default ProduitDetail;
