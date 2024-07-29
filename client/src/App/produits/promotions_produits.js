import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './../Nav'

function Promotionsproduits() {

    const [promo, setPromo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:8000/produits/promotions")
            .then(response => response.json())
            .then(data => setPromo(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    function ProduitsShow(id, name) {
        navigate("/produit/" + id);
        localStorage.setItem('categorie', name);
    }

    return (
        <div>

            <Nav />
            <div>
            {promo.map(produit => (
                <div className="item" key={produit.id} onClick={() => ProduitsShow(produit.id, produit.name, produit.views)}>
                    <img src={produit.image} alt="Promo 1" />
                    <p className="legend" >{produit.name}</p>
                    <p className="legend" >{produit.prix * (1 - produit.promo / 100)}€ au lieu de {produit.prix}€!</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Promotionsproduits