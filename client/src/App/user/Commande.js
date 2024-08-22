import React, { useState, useEffect } from 'react';
import Nav from './../Nav';
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
            {produits.map((details, index) => (
                <div key={index}>
                    <div>{details.id}</div>
                    <img src={details.image_type} />
                    <div>{details.prix}€</div>
                </div>
            ))}
        </div>
    )
}

export default Commande