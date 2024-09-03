import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './../Nav';
import './promotions_produits.css';
import StarFull from '../assets/star-produit.svg';
import StarEmpty from '../assets/starEmpty.png';

function Promotionsproduits() {
    const [promo, setPromo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:8000/produits/promotions")
            .then(response => response.json())
            .then(data => setPromo(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const renderStars = (rating) => {
        const validRating = Math.min(5, Math.max(0, Math.floor(Number(rating) || 0)));

        return (
            <div className='star_produit'>
                {Array.from({ length: 5 }, (_, index) => (
                    <img
                        key={index}
                        className="star-rate"
                        alt="Star"
                        src={index < validRating ? StarFull : StarEmpty}
                    />
                ))}
            </div>
        );
    };

    function ProduitsShow(id, name) {
        navigate("/produit/" + id);
        localStorage.setItem('categorie', name);
    }

    return (
        <div>
            <Nav />
            <div className="promotions-container">
                <div className="promotions-title">
                    <h1>Promo</h1>
                </div>
                <div className="promotions-grid">
                    {promo.map(produit => (
                        <div key={produit.id} className="promotions-product-card" onClick={() => ProduitsShow(produit.id, produit.name)}>
                            <div className="promotions-tag">-{produit.promo}%</div>
                            <img src={produit.image} alt={produit.name} className="promotions-product-image" />
                            <p className="promotions-product-name">{produit.name}</p>
                            {renderStars(produit.nombreAvis)}
                            <p className="promotions-product-price">
                                {(produit.prix * (1 - produit.promo / 100)).toFixed(2)}€ au lieu de {produit.prix.toFixed(2)}€!
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Promotionsproduits;







                    {/* <h1 className="promotions-header">Nouveau Produit</h1>
                    {nouveau.map(produit => (
                        <div key={produit.id} className="promotions-product-card" onClick={() => ProduitsShow(produit.id, produit.name)}>
                            <p className="promotions-product-name">{produit.name}</p>
                            <p className="promotions-product-price">{(produit.prix * (1 - produit.promo / 100)).toFixed(2)}€</p>
                        </div>
                    ))} */}