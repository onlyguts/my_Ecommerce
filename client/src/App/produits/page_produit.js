import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./productBoitier.css";
import Nav from "../Nav";
import PhotoBoitier from '../assets/boitie.png';
import VueIcon from '../assets/vue_icon.svg';
import AvisIcon from '../assets/avis_icon.svg';
import StarProduit from '../assets/star-produit.svg';
import WrenchCreate from '../assets/wrench-create.svg';
import MSILogo from '../assets/MSI-removebg-preview.png';
import NvidiaLogo from '../assets/nvidia-removebg-preview.png';
import BuyingCart from '../assets/cart.svg';
import ChevronRight from '../assets/chevron-right.svg';

import QuantityPicker from '../components/quantityPicker'
import Tabs from "../components/Tabs";

export const ProductBoitier = () => {
    const { id } = useParams();
    const [produit, setProduit] = useState(null);
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const Categorie = localStorage.getItem('categorie');
    const Login = localStorage.getItem('users');
    const loginUser = JSON.parse(Login);
    const [avis, setAvis] = useState([]);
    const [avissend, setAvisSend] = useState([]);
    const [typeporduit, setTypeProduit] = useState([]);
    const [moyenne, setMoyenne] = useState(0);
    const [nbavis, setNbAvis] = useState(0);
    const [email, setEmail] = useState();
    const [newprice, setNewPrice] = useState(0);
    const [image, setNewImage] = useState('');



    useEffect(() => {
        fetch(`https://localhost:8000/produit/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduit(data);
                setNewImage(data.image)
                setLoad(true);
            })
            .catch(error => console.error('Erreur:', error));
        fetch(`https://localhost:8000/produit/type/${id}`)
            .then(response => response.json())
            .then(data => {
                setTypeProduit(data);
                console.log(data)
            })
            .catch(error => console.error('Erreur:', error));
    }, [id]);



    useEffect(() => {
        fetch(`https://localhost:8000/avis/${id}`)
            .then(response => response.json())
            .then(data => {
                setAvis(data)
                const totalavis = data.reduce((sum, avis) => sum + avis.rate, 0);
                const moyenne = data.length > 0 ? totalavis / data.length : 0;
                setMoyenne(moyenne);
                setNbAvis(data.length)
            })
            .catch(error => console.error('Erreur:', error));
    }, [id]);

    // console.log(moyenne)
    useEffect(() => {
        if (load) {
            fetch(`https://localhost:8000/produit/updateView/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ views: 1 }),
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Erreur:', error));
        }
    }, [id, load]);

    const Debut = () => {
        navigate("/")
    }


    const Mid = (id) => {
        navigate("/produits/" + id)
    }
    const End = (id) => {
        navigate("/produit/" + id)
    }

    const EditerProduits = (id) => {
        navigate("../admin/list/produit/" + id)
    }


    const Type_Produit = (e) => {
        const data = JSON.parse(e.target.value);
        const int = parseFloat(data.price);
        setNewPrice(int);
        setNewImage(data.image);
    }


    const AvisSet = (e) => {
        const users = localStorage.getItem('users');
        const id_user = JSON.parse(users)

        setAvisSend(backData => ({
            ...backData,
            id_user: id_user.id,
            id_produit: id,
            rate: e.target.value,
        }));

    }

    const AvisSet_2 = (e) => {
        const users = localStorage.getItem('users');
        const id_user = JSON.parse(users)
        setAvisSend(backData => ({
            ...backData,
            id_user: id_user.id,
            id_produit: id,
            description: e.target.value,
        }));

    }

    const EnvoyerAvis = () => {
        // console.log('envhyer')
        fetch("https://localhost:8000/avis/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(avissend),
        })

            .then(response => {
                response.json();
                alert('Produit Ajouter');
                ;
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    }

    const renderStars = (count) => {
        return Array(count).fill().map((_, index) => (
            <img key={index} className="star-rate" alt="Star" src={StarProduit} />
        ));
    };



    const writeEmail = (e) => {
        setEmail(e.target.value)
    }

    const sendAlert = () => {
        const userInfos = {
            id_produit: produit.id,
            email: email,
        };
        fetch("https://localhost:8000/email/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfos),
        })

            .then(response => {
                response.json();
                alert('Email ajoutée');
                // console.log(userInfos);
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    }


    const AddPanier = (id, stock) => {
        if (stock === 0) {
            alert('plus de stock')
        } else {

            const Login = localStorage.getItem('users');
            const loginUser = JSON.parse(Login);
            const UserAccount = localStorage.getItem('user_no_account');


            if (!loginUser) {
                if (!UserAccount) {
                    function entierAleatoire(min, max) {
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }
                    const id_generate = entierAleatoire(100000, 999999)

                    console.log(id_generate)
                    localStorage.setItem('user_no_account', id_generate);
                } else {
                    console.log(UserAccount)
                }

                fetch("https://localhost:8000/panier/chercher/" + UserAccount)
                    .then(reponse => reponse.json())
                    .then(data => {
                        if (data === false) {
                            console.log("Aucun utilisateur trouvé avec cet ID, cela est attendu.");
                            const userInfos = {
                                id_produit: id,
                                id_user: UserAccount,
                                price_type: newprice,
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
                        } else {
                            AddPanier(id, stock)
                            console.log("Utilisateur trouvé : ", data);
                        }
                    })
                    .catch(erreur => console.error('Erreur: ', erreur));

            } else {
                const userInfos = {
                    id_produit: id,
                    id_user: loginUser.id,
                    price_type: newprice,
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
    }


    return (
        <div>
            <Nav />
            {produit ? (
                <div>
                    <div className='board'>
                        <div>
                            <button onClick={() => Debut()}>Home</button>/<button onClick={() => Mid(produit.idCategorie)}>{Categorie}</button>/<button onClick={() => End(produit.id)}>{produit.name}</button>
                        </div>
                        {loginUser && (
                            loginUser.groupe === 1 ? (
                                <button className="menu-btn" onClick={() => EditerProduits(produit.id)}>Editer le produit</button>
                            ) : (
                                <p></p>
                            )
                        )}
                    </div>
                    <div className="product-boitier">


                        <section className="product-section">
                            <section className="product">
                                <div className="picture">
                                    <img className="boitier" alt="photo Boitier" src={image} />
                                </div>
                                <p className="p">{produit.name}</p>
                            </section>
                            <section className="product-info">
                                <div className="notation">
                                    <div className="vue-stat">
                                        <img src={VueIcon} alt="Icon Nombre Vue" />
                                        <p className="vue-texte">{produit.views} vues</p>
                                    </div>
                                    <div className="avis-stat">
                                        <img src={AvisIcon} alt="Icon Nombre Avis" />
                                        <p className="avis-texte">{nbavis} avis client</p>
                                    </div>
                                    <div className="star-stat">
                                        <select onChange={(e) => Type_Produit(e)}>
                                            <option value={JSON.stringify({ price: 0, image: produit.image })} >
                                                Basique
                                            </option>
                                            {typeporduit.map(item => (
                                                <option key={item.id} value={JSON.stringify({ price: item.price, image: item.image_type })}>
                                                    {item.type} - {item.outpout}
                                                </option>
                                            ))}

                                        </select>

                                        {moyenne === 0 && <p>Aucune évaluation</p>}
                                        {moyenne >= 1 && moyenne < 2 && renderStars(1)}
                                        {moyenne >= 2 && moyenne < 3 && renderStars(2)}
                                        {moyenne >= 3 && moyenne < 4 && renderStars(3)}
                                        {moyenne >= 4 && moyenne < 5 && renderStars(4)}
                                        {moyenne >= 5 && renderStars(5)}
                                    </div>
                                </div>
                                <p className="descripion-produits">
                                    Le boîtier Zalman i3 Neo Black va pouvoir accueillir une configuration ATX,
                                    Micro-ATX ou Mini-ITX avec une carte graphique de 355 mm de long.
                                    Ce boîtier moyen tour avec fenêtre en verre trempé sera un achat idéal pour assembler une
                                    configuration performante,
                                    axée vers le jeu et le multimédia.
                                </p>
                                {/* <div className="button-create">
                                    <img className="icone-create" alt="Icone create" src={WrenchCreate} />
                                    <p className="texte-create">CREER UN PC AVEC CE PRODUIT</p>
                                </div> */}
                                <div className="marques-produits">
                                    <img className="msi-Logo" alt="Msi removebg preview" src={MSILogo} />
                                    <img className="nvidia-logo" alt="Nvidia removebg" src={NvidiaLogo} />
                                </div>
                            </section>
                            <section className="price-section">


                                {produit.promo != 0
                                    ? <h2 className="product-price">En promo : <span className='produit-promo'>{produit.prix + newprice}€</span> {((produit.prix) * (1 - produit.promo / 100)) + newprice} €</h2>

                                    : <h2 className="product-price">{produit.prix + newprice} €</h2>
                                }
                                {/* <section className="multiple-payement">
                                    <h3>Multiple Payements</h3>
                                    <p className="time-price">{Math.round((produit.prix / 3) + 1.05) + newprice} € <span>3 fois</span></p>
                                    <p className="frais-price">dont 1.05 € de frais</p>
                                </section> */}
                                {/* <section className="product-quantity">
                                    <h3>QUANTITE</h3>
                                    <QuantityPicker min={1} max={10} />
                                </section> */}
                                <section className="add-basket-button" onClick={() => AddPanier(produit.id, produit.stock)}>
                                    <h2>AJOUTER AU PANIER</h2>
                                    <img src={BuyingCart} alt="Icone Ajout Panier" />
                                </section>
                                {/* <section className="buy-now-button">
                                    <h2>ACHETER MAINTENANT</h2>
                                    <img src={ChevronRight} alt="Icone Achat Immediat" />
                                </section> */}


                                {produit.stock === 0 ? (
                                    <section className="product-stock">
                                        <h4 className="out-of-stock">Stock Non Disponible</h4>
                                        <div className="stock-notify">
                                            <label htmlFor="email_stock">Etre prévenu de la disponibilité</label>
                                            <input type="text" name="email_stock" onChange={(e) => writeEmail(e)} className="input_email" placeholder="EMAIL" />
                                            <button className="button_email" onClick={() => sendAlert()}>ENVOYER</button>
                                        </div>
                                    </section>
                                ) : (
                                    <section className="product-stock">
                                        <h4 className="in-stock">En Stock : {produit.stock}</h4>
                                    </section>
                                )}


                            </section>
                        </section>
                        <Tabs />
                    </div>
                </div>
            ) : (
                <div>
                    <p>Produit non trouvé</p>
                </div>
            )}
        </div>

    );
}

export default ProductBoitier;