import React, { useState, useEffect } from 'react';
import Nav from './../Nav';
import './Commande.css';
import { useNavigate, useParams } from 'react-router-dom';

function Commande() {
    const { id, commande } = useParams();
    const navigate = useNavigate();
    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);
    const UserAccount = localStorage.getItem('user_no_account');

    const [commandes, setCommande] = useState([]);
    const [produits, setProduit] = useState([]);

    // if (!loginUser) {
    //     if (UserAccount !== id) {
    //         navigate('/')
    //     }
    // } else {
    //     if (loginUser.id !== id) {
    //         navigate('/')
    //     }
    // }

    useEffect(() => {
        fetch("https://localhost:8000/commande/solo/" + commande)
            .then(reponse => reponse.json())
            .then(data => {
                setCommande(data)
                data.forEach(item => {
                    const produit = JSON.parse(item.produits)
                    setProduit(produit);
                });
            
            })
            .catch(erreur => console.error('Erreur: ', erreur));



    }, []);

    console.log(produits)
    console.log(commandes)
    return (
        <div>
            <Nav />
            <div className="page-container">
                {commandes && commandes.length > 0 ? (
                    <div className="commande-recap">
                        <div className="commande-card">
                            <div className="commande-info">Adresse : {commandes[0].adresse}</div>
                            <div className="commande-info">Code : {commandes[0].code}</div>
                            <div className="commande-info">Mode d'expédition : {commandes[0].mode_expe}</div>
                            <div className="commande-info">Date : {commandes[0].date}</div>
                            <div className="commande-info">Prix Totals : {commandes[0].prix_total}€</div>
                            <div className="commande-info">Status : {commandes[0].status}</div>
                        </div>
                    </div>
                ) : (
                    <div className="commande-recap">
                        <div className="commande-card">
                            <div className="commande-info">Aucune commande disponible.</div>
                        </div>
                    </div>
                )}
                
                <div className="produits-container">
                    {produits.map((details, index) => (
                        <div className="produit-card" key={index}>
                            <div className="produit-id">{index+1}</div>

                            <img className="produit-image" src={details.image_type} alt={`Produit ${details.id}`} />
                            <div className="produit-name">{details.name}</div>
                            <div className="produit-marque">{details.marque} Marque</div>
                            <div className="produit-weight">{details.weight} Poids</div>
                            <div className="produit-quantity">{details.quantity} Quantité</div>
                            <div className="produit-prix">{details.prix}€</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
      
}

export default Commande