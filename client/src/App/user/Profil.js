import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from './../Nav';
import './Profil.css';

const Profil = () => {
    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState({});
    const [formValuesB, setFormValuesBanque] = useState({});
    const [activeSection, setActiveSection] = useState('livraison');
    const [pays, setPays] = useState([]);

    const [usernameDisplay, setUsernameDisplay] = useState('');


    const [username, setUsername] = useState([]);
    const [email, setEmail] = useState([]);

    const [commande, setCommande] = useState([]);
    const [bancaire, setBancaire] = useState([]);
    const [adress, setAdress] = useState([]);


    const ApiBanque = () => {
        if (!loginUser) {

            const UserAccount = localStorage.getItem('user_no_account');
            fetch("https://localhost:8000/achat/" + UserAccount)
                .then(reponse => reponse.json())
                .then(data => {
                    setBancaire(data)
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
                                id: item.id,
                                num: carte_crypter,
                                num_non: item.num,
                                cvv: item.cvv,
                                de: item.de,
                                lastname: item.lastname,
                            });
                        });

                        setBancaire(allCarte);

                    });



                })
                .catch(erreur => console.error('Erreur: ', erreur));
        }
    }

    useEffect(() => {
        ApiBanque()
    }, []);
    useEffect(() => {
        ApiCommande()
    }, []);


    const ApiAdresse = () => {
        if (!loginUser) {
            const UserAccount = localStorage.getItem('user_no_account');
            fetch("https://localhost:8000/information/" + UserAccount)
                .then(reponse => reponse.json())
                .then(data => {
                    setAdress(data)
                })
                .catch(erreur => console.error('Erreur: ', erreur));
        } else {

            fetch("https://localhost:8000/information/" + loginUser.id)
                .then(reponse => reponse.json())
                .then(data => {
                    setAdress(data)
                })
                .catch(erreur => console.error('Erreur: ', erreur));
        }
    }

    const ApiCommande = () => {
        if (!loginUser) {
            const UserAccount = localStorage.getItem('user_no_account');
            fetch("https://localhost:8000/commande/" + UserAccount)
                .then(reponse => reponse.json())
                .then(data => {
                    setCommande(data)
                })
                .catch(erreur => console.error('Erreur: ', erreur));
        } else {
            fetch("https://localhost:8000/commande/" + loginUser.id)
                .then(reponse => reponse.json())
                .then(data => {




                    setCommande(data)


                })
                .catch(erreur => console.error('Erreur: ', erreur));
        }
    }

    useEffect(() => {
        ApiUser()
    }, []);

    const ApiUser = () => {
        fetch("https://localhost:8000/users/" + loginUser.id)
            .then(reponse => reponse.json())
            .then(data => {
                setUsernameDisplay(data[0].username)
            })
            .catch(erreur => console.error('Erreur: ', erreur));
    }

    useEffect(() => {
        ApiAdresse()
    }, []);

    useEffect(() => {
        fetch("https://localhost:8000/pays")
            .then(reponse => reponse.json())
            .then(data => {
                setPays(data)
            })
            .catch(erreur => console.error('Erreur: ', erreur));
    }, []);

    const expedition = [{ name: 'Standard', taxe: 5 }, { name: 'Express', taxe: 10 }];

    const formChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const updateChange = (e) => {
        if (e.target.name === 'username') {
            fetch("https://localhost:8000/username/update/" + loginUser.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la mise à jour du produit');
                    }
                    return response.json();
                })
                .then(data => {
                    ApiUser()
                })

                .catch(error => console.error('Erreur :', error));
        } else if (e.target.name === 'email') {
            fetch("https://localhost:8000/email/update/" + loginUser.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la mise à jour du produit');
                    }
                    return response.json();
                })
                .then(data => {
                    ApiUser()
                })

                .catch(error => console.error('Erreur :', error));
        }
    };

    const userChange = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value)
        }
        else if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
      

    };

    const formChangebanque = (e) => {
        setFormValuesBanque({
            ...formValuesB,
            [e.target.name]: e.target.value
        });
    };


    const AjouterAdresse = () => {
        let userInfos = {}
        let userInfosAdress = {}


        if (loginUser) {
            userInfosAdress = {
                id_user: loginUser.id,
                adress: formValues.adresse,
                postal: formValues.codepostal,
                nom: formValues.nom,
                prenom: formValues.prenom,
                pays: formValues.pays,
            };
            console.log(userInfosAdress)
        } else {

            userInfosAdress = {
                id_user: loginUser.id,
                adress: formValues.adresse,
                postal: formValues.codepostal,
                nom: formValues.nom,
                prenom: formValues.prenom,
                pays: formValues.pays,
            };

            console.log(userInfosAdress)

        }



        fetch("https://localhost:8000/information/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfosAdress),
        })

            .then(response => {
                response.json();
                ApiAdresse()
            })
            .catch(error => {
                console.error('Erreur:', error);
            });



    }


    const AjouterBancaire = () => {
        const Login = localStorage.getItem('users');
        const loginUser = JSON.parse(Login);
        const UserAccount = localStorage.getItem('user_no_account');

        let userInfos = {}
        let userInfosAdress = {}
        if (loginUser) {
            userInfos = {
                id_user: loginUser.id,
                nom: formValuesB.nom,
                prenom: formValuesB.prenom,
                num: formValuesB.num,
                de: formValuesB.de,
                cvv: formValuesB.cvv
            };

            console.log(formValuesB)
        } else {

            userInfos = {
                id_user: UserAccount,
                nom: formValuesB.nom,
                prenom: formValuesB.prenom,
                num: formValuesB.num,
                de: formValuesB.de,
                cvv: formValuesB.cvv
            };


            console.log(userInfos)

        }


        fetch("https://localhost:8000/achat/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfos),
        })

            .then(response => {
                response.json();
                ApiBanque()
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    }

    const deleteCarte = (id) => {
        fetch("https://localhost:8000/achat/delete/" + id, {
            method: 'DELETE',
        })
            .then(response => ApiBanque())
            .catch(error => {
                console.error('Erreur:', error);
            });
    }

    const deleteAdresse = (id) => {
        fetch("https://localhost:8000/information/delete/" + id, {
            method: 'DELETE',
        })
            .then(response => ApiAdresse())
            .catch(error => {
                console.error('Erreur:', error);
            });
    }

    return (
        <div>
            <Nav />
            <img src={loginUser.image} />
            <div>
                <p> {usernameDisplay} </p>
            </div>

            <div className="profil-container">
                <div className="profil-menu">
                    <button onClick={() => setActiveSection('livraison')} className={`profil-menu-button ${activeSection === 'livraison' ? 'active' : ''}`}>
                        Informations de livraison
                    </button>
                    <button onClick={() => setActiveSection('banque')} className={`profil-menu-button ${activeSection === 'banque' ? 'active' : ''}`}>
                        Informations bancaires
                    </button>
                    <button onClick={() => setActiveSection('historique')} className={`profil-menu-button ${activeSection === 'historique' ? 'active' : ''}`}>
                        Historique d'achat
                    </button>
                    <button onClick={() => setActiveSection('paramtre')} className={`profil-menu-button ${activeSection === 'paramtre' ? 'active' : ''}`}>
                        Paramtre
                    </button>
                </div>

                {activeSection === 'livraison' && (
                    <div className="section livraison-section animate-fade-in">
                        <h2>Informations de livraison</h2>
                        <form className="profil-form">
                            <div className="form-group">
                                <label>Nom:</label>
                                <input type="text" placeholder="Votre nom" required name='nom' onChange={formChange} />
                            </div>
                            <div className="form-group">
                                <label>Prénom:</label>
                                <input type="text" placeholder="Votre prénom" required name='prenom' onChange={formChange} />
                            </div>
                            <div className="form-group">
                                <label>Adresse:</label>
                                <input type="text" placeholder="Votre adresse" required name='adresse' onChange={formChange} />
                            </div>
                            <div className="form-group">
                                <label>Code postal:</label>
                                <input type="text" placeholder="Votre code postal" required name='codepostal' onChange={formChange} />
                            </div>
                            <div className="form-group">
                                <label>Pays:</label>
                                <select name="pays" onChange={formChange}>
                                    <option value=''>Tous les pays</option>
                                    {pays.map((country, index) => (
                                        <option key={index} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="button" onClick={() => AjouterAdresse()} className="btn-primary">Ajouter</button>
                        </form>

                        <h3>Adresses de livraison enregistrées</h3>
                        {adress.length > 0 && (
                            <table className="profil-table">
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                        <th>Adresse</th>
                                        <th>Code postal</th>
                                        <th>Pays</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adress.map((details, index) => (
                                        <tr key={index}>
                                            <td>{details.nom}</td>
                                            <td>{details.prenom}</td>
                                            <td>{details.adress}</td>
                                            <td>{details.postal}</td>
                                            <td>{details.pays}</td>
                                            <td>
                                                {/* <button className="btn-edit">Edit</button> */}
                                                <button className="btn-delete" onClick={() => deleteAdresse(details.id)}>Delete</button>
                                                {/* <button className="btn-page">Page</button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {activeSection === 'banque' && (
                    <div className="section banque-section animate-fade-in">
                        <h2>Informations bancaires</h2>
                        <form className="profil-form">
                            <div className="form-group">
                                <label>Nom:</label>
                                <input type="text" placeholder="Votre nom" required name='nom' onChange={formChangebanque} />
                            </div>
                            <div className="form-group">
                                <label>Prénom:</label>
                                <input type="text" placeholder="Votre prénom" required name='prenom' onChange={formChangebanque} />
                            </div>
                            <div className="form-group">
                                <label>Numéro de carte:</label>
                                <input type="text" placeholder="1234 5678 9012 3456" required name='num' onChange={formChangebanque} />
                            </div>
                            <div className="form-group">
                                <label>Date d'expiration:</label>
                                <input type="text" placeholder="MM/AA" required name='de' onChange={formChangebanque} />
                            </div>
                            <div className="form-group">
                                <label>CVV:</label>
                                <input type="text" placeholder="123" required name='cvv' onChange={formChangebanque} />
                            </div>
                            <button type="button" onClick={() => AjouterBancaire()} className="btn-primary">Ajouter</button>
                        </form>

                        <h3>Détails de la carte</h3>
                        {bancaire.carte.length > 0 && (
                            <table className="profil-table">
                                <thead>
                                    <tr>
                                        <th>Proprio</th>
                                        <th>Numéro de carte</th>
                                        <th>Date d'expiration</th>
                                        <th>CVV</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bancaire.carte.map((details, index) => (
                                        <tr key={index}>
                                            <td>{details.lastname}</td>
                                            <td>{details.num}</td>
                                            <td>{details.de}</td>
                                            <td>{details.cvv}</td>
                                            <td>
                                                {/* <button className="btn-edit">Edit</button> */}
                                                <button className="btn-delete" onClick={() => deleteCarte(details.id)}>Delete</button>
                                                {/* <button className="btn-page">Page</button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {activeSection === 'historique' && (
                    <div className="section historique-section animate-fade-in">
                        <h2>Historique d'achat</h2>
                        <table className="profil-table">
                            <thead>
                                <tr>
                                    <th>Date</th>

                                    <th>Numéro de commande</th>
                                    <th>Prix</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commande.map((achat, index) => (
                                    <tr key={index}>
                                        {/* <td>{achat.date}</td> */}
                                        <td>{achat.date}</td>
                                        <td>#{achat.id_commande}</td>
                                        <td>{achat.prix}€</td>
                                        <td>
                                            {/* button fiche produit bg ici  */}
                                            <button className="btn-view" onClick={() => navigate('commande/' + loginUser.id + '/' + achat.id)}>Voir détails commande</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeSection === 'paramtre' && (
                    <div className="section livraison-section animate-fade-in">
                        <form className="profil-form">
                            <div className="form-group">
                                <label>Username:</label>
                                <input type="text" placeholder="Votre Username" required name='username' onChange={(e) => userChange(e)} />
                                <button type="button" name='username' onClick={(e) => updateChange(e)} className="btn-primary">Modifier</button>
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="text" placeholder="Votre Email" required name='email' onChange={(e) => userChange(e)} />
                                <button type="button" name='email' onClick={(e) => updateChange(e)} className="btn-primary">Modifier</button>
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="text" placeholder="Votre Password" required name='Password' />
                                <button type="button" onClick={(e) => updateChange(e)} className="btn-primary">Modifier</button>
                            </div>
                            <div className="form-group">
                                <label>Adresse:</label>
                                <input type="text" placeholder="Votre adresse" required name='adresse' />
                                <button type="button" onClick={(e) => updateChange(e)} className="btn-primary">Modifier</button>
                            </div>
                            <div className="form-group">
                                <label>Code postal:</label>
                                <input type="text" placeholder="Votre code postal" required name='codepostal' />
                                <button type="button" onClick={(e) => updateChange(e)} className="btn-primary">Modifier</button>
                            </div>
                            <div className="form-group">
                                <label>Photo Profil:</label>
                                <input type="text" placeholder="Votre URL Photo Profil" required name='photo' />
                                <button type="button" onClick={(e) => updateChange(e)} className="btn-primary">Modifier</button>
                            </div>

                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profil;