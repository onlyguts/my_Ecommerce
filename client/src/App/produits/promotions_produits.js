import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./allProduct.css";
import Nav from './../Nav'

function Promotionsproduits() {
    const [nouveau, setNew] = useState([]);
    const [promo, setPromo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:8000/produits/promotions")
            .then(response => response.json())
            .then(data => setPromo(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    useEffect(() => {
        fetch("https://localhost:8000/produits/nouveauter")
            .then(response => response.json())
            .then(data => setNew(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    function ProduitsShow(id, name) {
        navigate("/produit/" + id);
        localStorage.setItem('categorie', name);
    }

    return (
        <div className="promotions">
            <Nav />
            <div className="promotions-grid">
                <h1>Promo</h1>
                {promo.map(produit => (
                    <div className='promo-in-grid'>
                        <p className="legend" >{produit.name}</p>
                        <p className="legend" >{produit.prix * (1 - produit.promo / 100)}€ au lieu de {produit.prix}€!</p>
                    </div>
                ))}
            <h1>Nouveau Produit </h1>
                {promo.map(produit => (
                    <div className='promo-in-grid'>
                        <p className="legend" >{produit.name}</p>
                        <p className="legend" >{produit.prix * (1 - produit.promo / 100)}€</p>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Promotionsproduits