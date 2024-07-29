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
    return (
        <div>
            <Nav/>
            Panier
            <p>prix total : {prixtotal}</p>
            {value.map(item => (
                <li key={item.id}>
                    <span>x{item.quantity} - {item.name}</span> - <span>{(item.prix * item.quantity)}€ | x1 {item.prix}€</span>
                </li>
            ))}
            <button>Acheter</button>
        </div>
    )
}

export default Panier