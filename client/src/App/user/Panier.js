import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './../Nav'


function Panier() {

    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);
    const [value, setValue] = useState([]);
    const [prixtotal, setPriceTotal] = useState([]);
    const [code, setCode] = useState('');
    const [promo, setPromo] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("https://localhost:8000/panier/" + loginUser.id)
            .then(reponse => reponse.json())
            .then(data => {
                setValue(data);
                const total = data.reduce((sum, item) => sum + ((item.prix * (1 - item.promo / 100)) * item.quantity), 0);


                setPriceTotal(total);
            })
            .catch(erreur => console.error('Erreur: ', erreur));
    }, []);
    const addCode = (code) => {
        if (promo === false ) {
            fetch("https://localhost:8000/code/" + code)
            .then(reponse => reponse.json())
            .then(data => {
            
                if (data.utilisations === 0) {
                    setCode('')
                    console.log('code promo fini')
                    return
                } else {
                    setPriceTotal(prixtotal * (1 - data.promotion / 100))
                    setCode('')
                    CodeUtiliser()
                    setPromo(true)
                    return
                }
            })
            .catch(erreur => console.error('Erreur: ', erreur));
        }
       
    }


    const CodeUtiliser = () => {

        fetch(`https://localhost:8000/code/update_utilisation/${code}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
           
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Erreur:', error));

    }

    const AddProduit = (id, stock, quantity) => {

        if (stock - 1 >= quantity) { 

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
    <div className='panier-container'>
        <h1 className="panier-title">Panier</h1>
        <p className="panier-total">Prix total : {prixtotal}€</p>
        <div className="promo-container">
            <input 
                type='text' 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                placeholder="CODE PROMO" 
                className="promo-input" 
            />
            <button onClick={() => addCode(code)} className="promo-button">APPLIQUER</button>
        </div>
        <ul className="panier-items">
            {value.map(item => (
                <li key={item.id} className="panier-item">
                    <span className="item-info">
                        <button onClick={() => DeleteProduit(item.id)} className="item-button">-</button>
                        <button className="item-quantity">{item.quantity}</button>
                        <button onClick={() => AddProduit(item.id, item.stock, item.quantity)} className="item-button">+</button>
                        <span className="item-details">{item.name} - {(item.prix * (1 - item.promo / 100) * item.quantity)}€ | x1 {item.prix * (1 - item.promo / 100)}€ </span>
                    </span>
                </li>
            ))}
        </ul>
        <button className="checkout-button">Acheter</button>
    </div>
</div>

    );
}

export default Panier