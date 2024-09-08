import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './../Nav'
import CSS from './Panier.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
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
    const [form2, setForm2] = useState([]);


    const [expedition, setExpedition] = useState([]);


    const [paysname, setNamePays] = useState('');

    const [bancaire, setBancaire] = useState([]);
    const [numberCarte, setNumberCarte] = useState(0);
    const [deCarte, setDeCarte] = useState(0);


    const [papier, setPapier] = useState(0);


    const [adress, setAdress] = useState([]);
    const [adressText, setAdressP] = useState('');
    const [codeText, setCodeP] = useState('');
    const [prenomText, setPrenomP] = useState('');
    const [emailText, setEmail] = useState('');
    const [nomText, setNomP] = useState('');

    const [prixexpe, setPrixExpe] = useState(0);
    const [nameexpe, setNameExpe] = useState('');

    const [prixfrais, setPrixFrais] = useState(0);
    const [prixpoid, setPrixPoids] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1);

    const [selectedCountry, setSelectedCountry] = useState('');
    const navigate = useNavigate();

    const [date, setDate] = useState(new Date())
    const debut = new Date(date.getFullYear(), 7, 29);
    const fin = new Date(date.getFullYear(), 7, 30);
    const entre = date > debut && date < fin;

    const [packageItem, setpackageItem] = useState([]);

    const ApiPanier = () => {
        if (!loginUser) {
            const UserAccount = localStorage.getItem('user_no_account');
            fetch("https://localhost:8000/panier/" + UserAccount)
                .then(reponse => reponse.json())
                .then(data => {
                    setValue(data);
                    const total = data.reduce((sum, item) => sum + (((item.prix + item.price_type) * (1 - item.promo / 100)) * item.quantity), 0)
                    // console.log(data)

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

                    setpackageItem(packageItem)

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

                    // console.log(prixGrame);

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
                    // console.log(data)

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

                    // console.log(prixGrame);

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

    useEffect(() => {
        if (!loginUser) {
            const UserAccount = localStorage.getItem('user_no_account');
            fetch("https://localhost:8000/achat/" + UserAccount)
                .then(reponse => reponse.json())
                .then(data => {


                    data.forEach(item => {


                        const allCarte = {
                            carte: []
                        }

                        data.forEach(item => {
                            let reg = /.{1,15}/
                            let string = item.num;

                            const carte_crypter = string.replace(reg, (m) => "*".repeat(m.length));


                            allCarte.carte.push({
                                num: carte_crypter,
                                num_non: item.num,
                                cvv: item.cvv,
                                de: item.de,
                            });
                        });

                        setBancaire(allCarte);

                    });



                })
                .catch(erreur => console.error('Erreur: ', erreur));
        } else {

            fetch("https://localhost:8000/achat/" + loginUser.id)
                .then(reponse => reponse.json())
                .then(data => {


                    data.forEach(item => {


                        const allCarte = {
                            carte: []
                        }

                        data.forEach(item => {
                            let reg = /.{1,15}/
                            let string = item.num;

                            const carte_crypter = string.replace(reg, (m) => "*".repeat(m.length));


                            allCarte.carte.push({
                                num: carte_crypter,
                                num_non: item.num,
                                cvv: item.cvv,
                                de: item.de,
                            });
                        });

                        setBancaire(allCarte);

                    });



                })
                .catch(erreur => console.error('Erreur: ', erreur));
        }
    }, []);



    useEffect(() => {
        if (!loginUser) {
            const UserAccount = localStorage.getItem('user_no_account');

            fetch("https://localhost:8000/information/" + UserAccount)
                .then(reponse => reponse.json())
                .then(data => {
                    setAdress(data)
                })
                .catch(erreur => console.error('Erreur: ', erreur));
        } else {
            setStep(2)
            fetch("https://localhost:8000/information/" + loginUser.id)
                .then(reponse => reponse.json())
                .then(data => {
                    setAdress(data)
                })
                .catch(erreur => console.error('Erreur: ', erreur));
        }
    }, []);


    useEffect(() => {
        fetch("https://localhost:8000/expedition")
            .then(reponse => reponse.json())
            .then(data => {
                setExpedition(data)
            })
            .catch(erreur => console.error('Erreur: ', erreur));
    }, []);


    const PaysUser = (e) => {
        const value = JSON.parse(e.target.value)
        const int = parseFloat(value.taxe);
        const prixGramme = 1.5;
        const prixGrame = (packageAll.weight / 100) * prixGramme;

        // console.log(prixGrame);

        setPrixFrais(int)
        setPrixPoids(prixGrame)
        setNamePays(value.name)

    }


    const carteChange = (e) => {
        // setNumberCarte(JSON.parse(value.num_non))
        if (!e.target.value) {
            setNumberCarte(0)
            setDeCarte(0)
        } else {
            const value = JSON.parse(e.target.value);
            setNumberCarte(value.num_non)
            setDeCarte(value.de)
        }
    }

    const adressChange = (e) => {
        // setNumberCarte(JSON.parse(value.num_non))
        if (!e.target.value) {
            setAdressP('')
            setCodeP('')
            setPrenomP('')
            setNomP('')
        } else {
            const value = JSON.parse(e.target.value);
            setAdressP(value.adress)
            setCodeP(value.postal)
            setPrenomP(value.prenom)
            setNomP(value.nom)
        }
    }



    const ExpUser = (e) => {
        const data = JSON.parse(e.target.value)
        const int = parseFloat(data.taxe);
        setNameExpe(data.name)
        setPrixExpe(int)
        console.log(data.taxe)


    }


    const addCode = (code) => {
        if (promo === false) {
            fetch("https://localhost:8000/code/" + code)
                .then(reponse => reponse.json())
                .then(data => {

                    if (data.utilisations === 0) {
                        setCode('')
                        // console.log('code promo fini')
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
            // .then(data => console.log(data))
            .catch(error => console.error('Erreur:', error));

    }

    const AddProduit = (id, stock, quantity, newprice, image_type, outpout) => {
        // console.log(stock)
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
                    image_type: image_type,
                    info: outpout,
                };
            } else {
                userInfos = {
                    id_produit: id,
                    price_type: newprice,
                    id_user: UserAccount,
                    image_type: image_type,
                    info: outpout,
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
        if (name === 'num') {
            setNumberCarte(value)
        }
        if (name === 'de') {
            setDeCarte(value)
        }
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const form2Change = (e) => {
        const { name, value } = e.target;
        if (name === 'nom') {
            setNomP(value)
        }
        if (name === 'prenom') {
            setPrenomP(value)
        }
        if (name === 'adresse') {
            setAdressP(value)

        }
        if (name === 'codepostal') {
            setCodeP(value)
        }

        if (name == 'email') {
            setEmail(value)
        }

        setForm2(prevState => ({
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
    

    const PapierCado = (e) => {
        console.log(e.target.checked)
        setPapier(e.target.checked)
    }

 
    const handlePayment = () => {

        const Login = localStorage.getItem('users');
        const loginUser = JSON.parse(Login);
        const UserAccount = localStorage.getItem('user_no_account');


        function entierAleatoire(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const id_generate = entierAleatoire(100000, 999999)

        const prixFinal = (prixfrais + prixpoid) + (prixtotal + prixexpe)
        console.log(packageAll)
        console.log(packages)
        console.log(prixFinal + '€')


        value.forEach((value) => {
            for (let i = 0; i < value.quantity; i++) {
                fetch("https://localhost:8000/produit/sell/" + value.produit_id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .catch(error => console.error('Erreur :', error));
            }
        });
        

        

        let userInfos = {}
        if (!loginUser) {
            userInfos = {
                id_user: UserAccount,
                email: emailText,
                id_commande: id_generate,
                produit: value,
                status: 0,
                adress: adressText,
                postal: codeText,
                weight: packageAll.weight,
                width: packageAll.width,
                height: packageAll.height,
                length: packageAll.length,
                expe: nameexpe,
                papier: papier,
                price: prixFinal,
                name: prenomText + ' ' + nomText,
  
            };
        } else {

            userInfos = {
                id_user: loginUser.id,
                email: emailText,
                id_commande: id_generate,
                produit: value,
                status: 0,
                adress: adressText,
                postal: codeText,
                weight: packageAll.weight,
                width: packageAll.width,
                height: packageAll.height,
                length: packageAll.length,
                expe: nameexpe,
                papier: papier,
                price: prixFinal,
                name: prenomText + ' ' + nomText,
            };
        }

        fetch("https://localhost:8000/panier/delete/all", {
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



        fetch("https://localhost:8000/commande/chercher/" + id_generate)
            .then(reponse => reponse.json())
            .then(data => {
                if (data === false) {
                    fetch("https://localhost:8000/commande/add", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userInfos),
                    })

                        .then(response => {
                            response.json();
                            // ApiPanier()
                        })
                        .catch(error => {
                            console.error('Erreur:', error);
                        });
                } else {
                    handlePayment()
                }
            })
            .catch(erreur => console.error('Erreur: ', erreur));



        // const Login = localStorage.getItem('users');
        // const loginUser = JSON.parse(Login);
        // const UserAccount = localStorage.getItem('user_no_account');


        // let userInfos = {}
        // let userInfosAdress = {}
        // if (loginUser) {
        //     userInfos = {
        //         id_user: loginUser.id,
        //         nom: form2.nom,
        //         prenom: form2.prenom,
        //         num: numberCarte,
        //         de: deCarte,
        //         cvv: form.cvv
        //     };
        //     userInfosAdress = {
        //         id_user: loginUser.id,
        // adress: form2.adresse,
        // postal: form2.codepostal,
        //         nom: form2.nom,
        //         prenom: form2.prenom,
        //         pays: paysname,
        //     };
        //     console.log(userInfosAdress)
        // } else {

        //     userInfos = {
        //         id_user: UserAccount,
        //         nom: form2.nom,
        //         prenom: form2.prenom,
        //         num: numberCarte,
        //         de: deCarte,
        //         cvv: form.cvv
        //     };
        //     userInfosAdress = {
        //         id_user: loginUser.id,
        //         adress: form2.adresse,
        //         postal: form2.codepostal,
        //         nom: form2.nom,
        //         prenom: form2.prenom,
        //         pays: paysname,
        //     };

        //     console.log(userInfosAdress)

        // }



        // fetch("https://localhost:8000/information/add", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(userInfosAdress),
        // })

        //     .then(response => {
        //         response.json();
        //         // ApiPanier()
        //     })
        //     .catch(error => {
        //         console.error('Erreur:', error);
        //     });

        // // console.log(userInfos)


        // fetch("https://localhost:8000/achat/add", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(userInfos),
        // })

        //     .then(response => {
        //         response.json();
        //         // ApiPanier()
        //     })
        //     .catch(error => {
        //         console.error('Erreur:', error);
        //     });




    };
    return (
        <div className="body-container">
            <Nav />
            <div className='panier-container'>
                <h1 className="panier-title">Panier</h1>
                {message}

                <p className="panier-total">Prix du panier : {prixtotal}€</p>
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
                            <img src={item.image_type} alt={item.name} className="item-image" />
                            <span className="item-info">
                                <button onClick={() => DeleteProduit(item.id)} className="item-button">-</button>
                                <button className="item-quantity">{item.quantity}</button>
                                <button onClick={() => AddProduit(item.id, item.stock, item.quantity, item.price_type, item.image_type, item.info)} className="item-button">+</button>
                                <span className="item-details">
                                    {item.info != 'null'
                                        ? <span> {item.name} {item.info} - {((item.prix + item.price_type) * (1 - item.promo / 100) * item.quantity)}€ | x1 {(item.prix + item.price_type) * (1 - item.promo / 100)}€  </span>
                                        : <span> {item.name} - {((item.prix + item.price_type) * (1 - item.promo / 100) * item.quantity)}€ | x1 {(item.prix + item.price_type) * (1 - item.promo / 100)}€</span>
                                    }
                                    {/* {item.name} - {((item.prix + item.price_type) * (1 - item.promo / 100) * item.quantity)}€ | x1 {(item.prix + item.price_type) * (1 - item.promo / 100)}€ */}
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
                        <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                        {step === 1 && (
                            <div className="modal-step step-1">
                                <h2>Bienvenue</h2>
                                <div className="modal-buttons">
                                    {/* Link connection */}
                                    <button onClick={() => navigate('/login')} className="modal-button modal-button-connect">Connexion</button>
                                    <button onClick={() => navigate('/register')} className="modal-button modal-button-connect">Inscription</button>
                                    <button onClick={() => setStep(2)} className="modal-button modal-button-guest">Continuer en invité</button>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="modal-step step-2">
                                <h2>Informations de livraison</h2>
                                <form>
                                    <select className="form-select" onChange={(e) => adressChange(e)}>
                                        <option value=''>Tous les adresses postales</option>
                                        {adress.map((adress, index) => (
                                            <option key={index} value={JSON.stringify(adress)}  >
                                                {adress.adress} - {adress.postal}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="form-group">
                                        <label className="form-label">Nom:</label>
                                        <input type="text" placeholder="Votre nom" required name='nom' value={nomText} onChange={form2Change} className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Prénom:</label>
                                        <input type="text" placeholder="Votre prénom" required name='prenom' value={prenomText} onChange={form2Change} className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email:</label>
                                        <input type="text" placeholder="Votre Email" required name='email' value={emailText} onChange={form2Change} className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Numéro de téléphone:</label>
                                        <input type="text" placeholder="Votre numéro de téléphone" required name='telephone' onChange={form2Change} className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Adresse:</label>
                                        <input type="text" placeholder="Votre adresse" required name='adresse' value={adressText} onChange={form2Change} className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Code postal:</label>
                                        <input type="text" placeholder="Votre code postal" required name='codepostal' value={codeText} onChange={form2Change} className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Pays:</label>
                                        <select onChange={(e) => PaysUser(e)} className="form-select">
                                            <option value=''>Tous les pays</option>
                                            {pays.map((country, index) => (
                                                <option key={index} value={JSON.stringify(country)} >
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="button" onClick={() => setStep(3)} className="modal-button">Suivant</button>
                                </form>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="modal-step step-3">
                                <h2>Mode de paiement & Récapitulatif</h2>
                                <form>
                                    <select className="form-select" onChange={(e) => carteChange(e)}>
                                        <option value=''>Toutes les cartes bancaires</option>
                                        {bancaire.carte.map((banque, index) => (
                                            <option key={index} value={JSON.stringify(banque)}  >
                                                {banque.num}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="form-group">
                                        <label className="form-label">Numéro de carte:</label>
                                        <input type="text" placeholder="1234 5678 9012 3456" required name='num' value={numberCarte} onChange={formChange} className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Date d'expiration:</label>
                                        <input type="text" placeholder="MM/AA" required name='de' value={deCarte} onChange={formChange} className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">CVV:</label>
                                        <input type="text" placeholder="123" required name='cvv' onChange={formChange} className="form-input" />
                                    </div>

                                    <h2>Récapitulatif de la commande</h2>
                                    <p>Prix du panier: {prixtotal}€</p>
                                    <p>Prix du poids: {prixpoid}€</p>
                                    <p>Prix de livraison: {prixfrais}€</p>
                                    <div className="form-group">
                                        <label className="form-label">Choisissez votre mode d'expédition :</label>
                                        <select onChange={(e) => ExpUser(e)} className="form-select">
                                            <option value=''>Mode d'expédition</option>
                                            {expedition.map((mode, index) => (
                                                <option key={index} value={JSON.stringify(mode)}>
                                                    {mode.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p>Prix du mode d'expédition: {prixexpe}€</p>
                                    <p>Prix total: {(prixtotal + prixfrais) + (prixpoid + prixexpe)}€</p>
                                    {(entre) && (

                                        <div>
                                            <input type="checkbox" onChange={(e) => PapierCado(e)} id="cadeau" name="cadeau" />
                                            <label for="cadeau">Papier cadeau</label>
                                        </div>
                                    )}
                                    {(prixtotal > 3000 && !loginUser) ? (
                                        <button type="button" onClick={() => navigate('/login')} className="modal-button">Connexion</button>

                                    ) : (
                                        <button type="button" onClick={() => setStep(4)} className="modal-button">Confirmer</button>
                                    )}
                                </form>
                            </div>
                        )}
                        {step === 4 && (
                            <div className="modal-step step-4">
                                <h2>Confirmation de commande</h2>
                                <p>Votre commande a été confirmée!</p>
                                <button onClick={() => { handlePayment(); setIsModalOpen(false); }} className="modal-button modal-pay-button">OK</button>
                            </div>
                        )}
                        <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );



}

export default Panier