import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './../Nav'
import CSS from './Panier.css'
function Panier() {

    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);

    const Panier = localStorage.getItem('panier');
    const panierUser = JSON.parse(Panier);

    const [value, setValue] = useState([]);
    const [prixtotal, setPriceTotal] = useState([]);
    const [code, setCode] = useState('');
    const [pays, setPays] = useState([]);
    const [paysuser, setPaysUser] = useState('');
    const [message, setMessage] = useState('');
    const [promo, setPromo] = useState(false);
    const [packages, setPackage] = useState([]);
    const [packageAll, setPackageAll] = useState([]);
    const [form, setForm] = useState([]);
    
    const [prixfrais, setPrixFrais] = useState(0);
    const [prixpoid, setPrixPoids] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la visibilité du modal
    const [step, setStep] = useState(1); // État pour gérer les étapes du modal
    const [selectedCountry, setSelectedCountry] = useState(''); // État pour gérer le pays sélectionné
    const navigate = useNavigate();


    const ApiPanier = () => {
        if (!loginUser) {
            const UserAccount = localStorage.getItem('user_no_account');
            fetch("https://localhost:8000/panier/" + UserAccount)
            .then(reponse => reponse.json())
            .then(data => {
                setValue(data);
                const total = data.reduce((sum, item) => sum + (((item.prix + item.price_type) * (1 - item.promo / 100)) * item.quantity), 0)
                console.log(data)

                const packageItem = {
                    weight: 0,
                    width: 0,
                    height: 0,
                    length: 0,
                    quantity: 0
                }

                data.forEach(item => {
  
                    packageItem.weight += item.weight * item.quantity;
                    packageItem.width += item.width * item.quantity;
                    packageItem.height += item.height * item.quantity;
                    packageItem.length += item.length * item.quantity;
                    packageItem.quantity += item.quantity;
                });

                const packageColis = {
                    produit: []
                }
                
                data.forEach(item => {
                    packageColis.produit.push({
                        name: item.name,
                        weight: item.weight,
                        width: item.width,
                        height: item.height,
                        length: item.length,
                        quantity: item.quantity
                    });
                });
                
                

                setPackage(packageColis)
                setPackageAll(packageItem)
                const int = parseFloat(prixfrais);

                const prixGramme = 1.5;
                const prixGrame = (packageItem.weight / 100) * prixGramme;

                console.log(prixGrame);

                setPrixFrais(int)
                setPrixPoids(prixGrame)

                setPriceTotal(total)
            })
            .catch(erreur => console.error('Erreur: ', erreur));
        } else {

            fetch("https://localhost:8000/panier/" + loginUser.id)
                .then(reponse => reponse.json())
                .then(data => {
                    setValue(data);
                    const total = data.reduce((sum, item) => sum + (((item.prix + item.price_type) * (1 - item.promo / 100)) * item.quantity), 0)
                    console.log(data)
    
                    const packageItem = {
                        weight: 0,
                        width: 0,
                        height: 0,
                        length: 0,
                        quantity: 0
                    }
    
                    data.forEach(item => {
      
                        packageItem.weight += item.weight * item.quantity;
                        packageItem.width += item.width * item.quantity;
                        packageItem.height += item.height * item.quantity;
                        packageItem.length += item.length * item.quantity;
                        packageItem.quantity += item.quantity;
                    });
    
                    const packageColis = {
                        produit: []
                    }
                    
                    data.forEach(item => {
                        packageColis.produit.push({
                            name: item.name,
                            weight: item.weight,
                            width: item.width,
                            height: item.height,
                            length: item.length,
                            quantity: item.quantity
                        });
                    });
                    
                    
    
                    setPackage(packageColis)
                    setPackageAll(packageItem)
                    const int = parseFloat(prixfrais);
    
                    const prixGramme = 1.5;
                    const prixGrame = (packageItem.weight / 100) * prixGramme;
    
                    console.log(prixGrame);
    
                    setPrixFrais(int)
                    setPrixPoids(prixGrame)
    
                    setPriceTotal(total)
                })
                .catch(erreur => console.error('Erreur: ', erreur));
        }
    }

    useEffect(() => {
        ApiPanier()
    }, []);


    useEffect(() => {
        fetch("https://localhost:8000/pays")
            .then(reponse => reponse.json())
            .then(data => {
                setPays(data)
            })
            .catch(erreur => console.error('Erreur: ', erreur));
    }, []);



    const PaysUser = (e) => {
        const int = parseFloat(e.target.value);

        const prixGramme = 1.5;
        const prixGrame = (packageAll.weight / 100) * prixGramme;

        // console.log(prixGrame);

        setPrixFrais(int)
        setPrixPoids(prixGrame)
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

    const AddProduit = (id, stock, quantity, newprice) => {
        console.log(stock)
        if (stock - 1 >= quantity) {

            const Login = localStorage.getItem('users');
            const loginUser = JSON.parse(Login);
            const UserAccount = localStorage.getItem('user_no_account');
            let userInfos = {}
            if (loginUser) {
                 userInfos = {
                    id_produit: id,
                    price_type: newprice,
                    id_user: loginUser.id,
                };
            } else {

                 userInfos = {
                    id_produit: id,
                    price_type: newprice,
                    id_user: UserAccount,
                };
            }
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

    const formChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
      
    };


    const DeleteProduit = (id) => {
        const Login = localStorage.getItem('users');
        const loginUser = JSON.parse(Login);
        const UserAccount = localStorage.getItem('user_no_account');
        let userInfos = {}
        if (loginUser) {
             userInfos = {
               id_produit: id,
               id_user: loginUser.id,
           };
        } else {
             userInfos = {
                id_produit: id,
                id_user: UserAccount,
            };
        }       
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
    const handlePayment = () => {
        const prixFinal = (prixfrais + prixpoid) + prixtotal
        console.log(packageAll)
        console.log(packages)
        console.log(prixFinal + '€')
        console.log("Payment successful");
        console.log(form)
    };
    return (
        <div>
            <Nav />
            <div className='panier-container'>
                <h1 className="panier-title">Panier</h1>
                {message}
       



                <p className="panier-total">Prix Panier : {prixtotal}€</p>
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
                                <button onClick={() => AddProduit(item.id, item.stock, item.quantity, item.price_type)} className="item-button">+</button>
                                <span className="item-details">
                                    {item.name} - {((item.prix + item.price_type) * (1 - item.promo / 100) * item.quantity)}€ | x1 {(item.prix + item.price_type) * (1 - item.promo / 100)}€
                                </span>
                            </span>
                        </li>
                    ))}
                </ul>
                <button onClick={() => setIsModalOpen(true)} className="checkout-button">Acheter</button>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {step === 1 && (
                            <div>
                                <h2>Récapitulatif de la commande</h2>

                                <p>Prix du panier: {prixtotal}€ +</p>
                                <p>Prix du poids: {prixpoid}€ +</p>
                                <p>Prix de livraison: {prixfrais}€ +</p>
                                <p>Prix total: {(prixtotal + prixfrais) + prixpoid}€</p>
                                <label>Choisissez votre pays :</label>
                                <select onChange={(e) => PaysUser(e)}>
                                    <option value=''>Toutes les pays</option>
                                    {pays.map((country, index) => (
                                        <option key={index} value={country.taxe} >
                                            <p value={country.name}>{country.name}</p>
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => setStep(2)}>Suivant</button>
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <h2>Informations de paiement</h2>
                                <form>
                                    <label>Nom:</label>
                                    <input type="text" placeholder="Votre nom" required name='nom' onChange={formChange} />
                                    <label>Prénom:</label>
                                    <input type="text" placeholder="Votre prénom" required  name='prenom' onChange={formChange}/>
                                    <label>Numéro de carte:</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" required name='num' onChange={formChange}/>
                                    <label>Date d'expiration:</label>
                                    <input type="text" placeholder="MM/AA" required name='de' onChange={formChange} />
                                    <label>CVV:</label>
                                    <input type="text" placeholder="123" required name='cvv' onChange={formChange}/>
                                    <button type="button" onClick={() => setStep(3)}>Suivant</button>
                                </form>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <h2>Confirmation de commande</h2>
                                <p>Votre commande a été confirmée!</p>
                                <button onClick={() => { handlePayment(); setIsModalOpen(false); }}>OK</button>
                            </div>
                        )}
                        <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>Fermer</button>
                    </div>
                </div>
            )}
        </div>

    );
}

export default Panier