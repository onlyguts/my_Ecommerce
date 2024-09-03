import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './../Nav';
import './nouveauter_produits.css';
import StarFull from '../assets/star-produit.svg';
import StarEmpty from '../assets/starEmpty.png';

function NouveautesProduits() {
    const [nouveau, setNew] = useState([]);
    const navigate = useNavigate();

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

    const renderStars = (count) => {
        return Array(5).fill().map((_, index) => (
            <img
                key={index}
                className="star-rate"
                alt="Star"
                src={index < count ? StarFull : StarEmpty}
            />
        ));
    };

    return (
        <div>
            <Nav />
            <div className="nouveautes-container">
                <div className="nouveautes-title">
                    <h1>Nouveaux Produits</h1>
                </div>
                <div className="nouveautes-grid">
                    {nouveau.map(produit => (
                        <div
                            key={produit.id}
                            className="nouveautes-product-card"
                            onClick={() => ProduitsShow(produit.id, produit.name)}
                        >
                            <div className="nouveautes-tag">Nouveau</div>
                            <img
                                src={produit.image}
                                alt={produit.name}
                                className="nouveautes-product-image"
                            />
                            <div className="star_produit">
                                {renderStars(produit.moyenne)}
                            </div>
                            <p className="nouveautes-product-name">{produit.name}</p>
                            <p className="nouveautes-product-price">
                                {(produit.prix * (1 - produit.promo / 100)).toFixed(2)}€
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NouveautesProduits;