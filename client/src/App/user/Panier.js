import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './../Nav'


function Panier() {

    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);
    const [value, setValue] = useState([]);
    const [prixtotal, setPriceTotal] = useState([]);
    const [code, setCode] = useState('');
    const [pays, setPays] = useState([]);
    const [paysuser, setPaysUser] = useState('');
    const [message, setMessage] = useState('');
    const [promo, setPromo] = useState(false);
    const [packages, setPackage] = useState([]);
    const navigate = useNavigate();


    const ApiPanier = () => {
        fetch("https://localhost:8000/panier/" + loginUser.id)
        .then(reponse => reponse.json())
        .then(data => {
            setValue(data);
            const total = data.reduce((sum, item) => sum + ((item.prix * (1 - item.promo / 100)) * item.quantity), 0)
            console.log(data)

        const packageItem = {
            content: "",
            weight: 0,
            width: 0,
            height: 0,
            length: 0
        }

        data.forEach(item => {
            packageItem.content += item.name;
            packageItem.weight += item.weight * item.quantity;
            packageItem.width += item.width * item.quantity;
            packageItem.height += item.height * item.quantity;
            packageItem.length += item.length * item.quantity;
         
        });
       
        setPackage(packageItem)
        
        setPriceTotal(total)
        })
        .catch(erreur => console.error('Erreur: ', erreur));
    }

    useEffect(() => {
        ApiPanier()
    }, []);


    useEffect(() => {
        fetch("https://epicareer.epidoc.eu/api/countries")
            .then(reponse => reponse.json())
            .then(data => {
                setPays(data.data)

            })
            .catch(erreur => console.error('Erreur: ', erreur));
    }, []);

const PaysUser = (e) => {
    setPaysUser(e.target.value)
}
    const SendColis = () => {
        const userInfos = {
            from: "France",
            to: paysuser,
            package: [
                {
                    content: packages.content,
                    weight: packages.weight,
                    width: packages.width,
                    height: packages.height,
                    length: packages.length,
                }
            ],
            currency: "EUR"
        };

        console.log(userInfos)

        fetch("https://epicareer.epidoc.eu/api/package/estimate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfos),
        })

            .then(response => {
                return response.json();

            })
            .then(data => {
                if (data.success) {
                    setMessage(data.data.travelTime);
                    console.log(data.data)
                    setPriceTotal(prixtotal + data.data.price.total)
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
            });



    }



    const addCode = (code) => {
        if (promo === false) {
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
        console.log(stock)
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
              ApiPanier()
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
                ApiPanier()

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
                {message}
                <p onClick={() => SendColis()}>Send</p>

                <select onChange={(e) => PaysUser(e)}>
                    <option value=''>Toutes les pays</option>
                    {pays.map((country, index) => (
                        <option key={index} value={country} >
                            <p value={country}>{country}</p>
                        </option>
                    ))}
                </select>

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
                            <img src={item.image} alt={item.name} className="item-image" />
                            <span className="item-info">
                                <button onClick={() => DeleteProduit(item.id)} className="item-button">-</button>
                                <button className="item-quantity">{item.quantity}</button>
                                <button onClick={() => AddProduit(item.id, item.stock, item.quantity)} className="item-button">+</button>
                                <span className="item-details">
                                    {item.name} - {(item.prix * (1 - item.promo / 100) * item.quantity)}€ | x1 {item.prix * (1 - item.promo / 100)}€
                                </span>
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