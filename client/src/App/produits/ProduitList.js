import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProduitDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const Categorie = localStorage.getItem('categorie');

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

  const Debut = () => {
    navigate("/produits")
  }
  const Mid = (id) => {
    navigate("/produits/" + id)
  }
  const End = (id) => {
    navigate("/produit/" + id)
  }
  return (
    <div>
         
         
      {produit ? (
        <div>
           <h1><button onClick={() => Debut()}>Categorie</button>/<button onClick={() => Mid(produit.idCategorie)}>{Categorie}</button>/<button onClick={() => End(produit.id)}>{produit.name}</button></h1>
          <h2>{produit.name}</h2>
          <p>Nom du produits: {produit.name}</p>
          <p>Vue : {produit.views}</p>
          {produit.stock === 0 ? (
            <p>Rupture de stock</p>
          ) : (
            <p>Disponnible : {produit.stock}</p>
          )}
        </div>
      ) : (
        <p>Produit non trouvé</p>
      )}
    </div>
  );
}

export default ProduitDetail;
