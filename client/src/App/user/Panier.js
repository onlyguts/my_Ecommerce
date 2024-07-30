import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './../Nav'
function Panier() {

    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);
    const [value, setValue] = useState([]);
    const [prixtotal, setPriceTotal] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("https://localhost:8000/panier/" + loginUser.id)
            .then(reponse => reponse.json())
            .then(data => {
                setValue(data);
                const total = data.reduce((sum, item) => sum + (item.prix * item.quantity), 0);

                setPriceTotal(total);
            })
            .catch(erreur => console.error('Erreur: ', erreur));
    }, []);
    const AddProduit = (id) => {
        const Login = localStorage.getItem('users');
        const loginUser = JSON.parse(Login);

        const userInfos = {
            id_produit: id,
            id_user: loginUser.id,
        };
        fetch("https://localhost:8000/panier/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfos),
        })

            .then(response => {
                response.json();
                window.location.reload()


            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    }


    const DeleteProduit = (id) => {
        const Login = localStorage.getItem('users');
        const loginUser = JSON.parse(Login);

        const userInfos = {
            id_produit: id,
            id_user: loginUser.id,
        };
        fetch("https://localhost:8000/panier/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfos),
        })

            .then(response => {
                response.json();
                window.location.reload()


            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    }
    return (
        <div>
            <Nav />
            Panier
            <p>prix total : {prixtotal}€</p>
            {value.map(item => (
                <li key={item.id}>
                    <span>
                        <button onClick={() => DeleteProduit(item.id)}>-</button>
                        <button >{item.quantity}</button>
                        <button onClick={() => AddProduit(item.id)}>+</button>
                        <span> {item.name} - {(item.prix * item.quantity)}€ | x1 {item.prix}€ </span>
                    </span>

                </li>
            ))}
            <button>Acheter</button>
        </div>
    )
}

export default Panier