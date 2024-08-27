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

    const [status, setStatus] = useState(0);
    const [commandeId, setIdCommande] = useState(0);
    // if (!loginUser) {
    //     if (UserAccount !== id) {
    //         navigate('/')
    //     }
    // } else {
    //     if (loginUser.id !== id) {
    //         navigate('/')
    //     }
    // }


    const CommandeAPI = () => {
        fetch("https://localhost:8000/commande/solo/" + commande)
            .then(reponse => reponse.json())
            .then(data => {
                setCommande(data)
                data.forEach(item => {
                    const produit = JSON.parse(item.produits)
                    setProduit(produit);
                    setIdCommande(item.id)
                    setStatus(item.status)
                    console.log(item.status)
                });

            })
            .catch(erreur => console.error('Erreur: ', erreur));


    }
    useEffect(() => {
        CommandeAPI()

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setStatus(prevStatus => {
                if (prevStatus === 0) {
                    fetch(`https://localhost:8000/commande/update/${commandeId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            status: 1,
                        }),
                    })
                        .then(data => CommandeAPI())
                        .catch(error => console.error('Erreur :', error));
                    console.log(1);
                    return 1;
                } else if (prevStatus === 1) {
                    fetch(`https://localhost:8000/commande/update/${commandeId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            status: 2,
                        }),
                    })
                        .then(data => CommandeAPI())
                        .catch(error => console.error('Erreur :', error));
                    console.log(2);
                    return 2;
                } else if (prevStatus === 2) {
                    console.log(2);
                    return 2;
                }
                return prevStatus;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [commandeId]);




    return (
        <div>
            <Nav />
            <div className="page-container">
                {commandes && commandes.length > 0 ? (
                    <div className="commande-recap">
                        <div className="commande-card">

                            <div className="commande-info">ID Commande : {commandes[0].id_commande}</div>
                            <div className="commande-info">Adresse : {commandes[0].adresse}</div>
                            <div className="commande-info">Code : {commandes[0].code}</div>
                            <div className="commande-info">Mode d'expédition : {commandes[0].mode_expe}</div>
                            <div className="commande-info">Date : {commandes[0].date}</div>
                            <div className="commande-info">Prix Totals : {commandes[0].prix_total}€</div>
                            {status === 0 && (
                                <div className="commande-info">Status : en préparation</div>
                            )}
                            {status === 1 && (
                                <div className="commande-info">Status : en cours de livraison</div>
                            )}
                            {status === 2 && (
                                <div className="commande-info">Status : Livrée</div>
                            )}
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
                            <div className="produit-id">{index + 1}</div>

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