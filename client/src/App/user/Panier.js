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
                console.log(data[0])
                if (data[0].utilisations === 0) {
                    setCode('')
                    console.log('code promo fini')
                    return
                } else {
                    setPriceTotal(prixtotal * (1 - data[0].promotion / 100))
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
            <input type='text' value={code} onChange={(e) => setCode(e.target.value)}></input>
            <button onClick={() => addCode(code)}>APPLIQUER</button>
            {value.map(item => (
                <li key={item.id}>
                    <span>
                        <button onClick={() => DeleteProduit(item.id)}>-</button>
                        <button >{item.quantity}</button>
                        <button onClick={() => AddProduit(item.id)}>+</button>
                        <span> {item.name} - {(item.prix * (1 - item.promo / 100) * item.quantity)}€ | x1 {item.prix * (1 - item.promo / 100)}€ </span>
                    </span>

                </li>
            ))}
            <button>Acheter</button>
        </div>
    )
}

export default Panier