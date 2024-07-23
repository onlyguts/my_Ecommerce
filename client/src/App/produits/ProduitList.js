import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProduitDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:8000/produit/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduit(data);
        setLoad(true);
      })
      .catch(error => console.error('Erreur:', error));
  }, [id]);

  useEffect(() => {
    if (load) {
      fetch(`https://localhost:8000/produit/updateView/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ views: 1 }),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Erreur:', error));
    }
  }, [id, load]);



  return (
    <div>
      <h1>Produit Détail</h1>
      {produit ? (
        <div>
          <h2>{produit.name}</h2>
          <p>Nom du produits: {produit.name}</p>
          <p>Vue : {produit.views}</p>
        </div>
      ) : (
        <p>Produit non trouvé</p>
      )}
    </div>
  );
}

export default ProduitDetail;
