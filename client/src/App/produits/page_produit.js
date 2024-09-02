import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./page_produit.css";
import Nav from "../Nav";
import StarProduit from '../assets/star-produit.svg';
import PhotoSpecs from '../assets/Specs.png';
import StarFull from '../assets/starFull.png';
import StarEmpty from '../assets/starEmpty.png';

export const ProductPage = () => {
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
    const [outpout, setOutpout] = useState('');

    const [step, setStep] = useState(1);
    const [text, setText] = useState('');
    const [rate, setRate] = useState(0);

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


    const Type_Produit = (item) => {
        // const data = JSON.parse(e.target.value);
        // const int = parseFloat(data.price);
        // setNewPrice(int);
        // setNewImage(data.image);
        // setOutpout(data.type);
        setNewPrice(parseFloat(item.price));
        setNewImage(item.image_type);
        setOutpout(item.outpout);
    }


    const AvisSet = (value) => {
        const users = localStorage.getItem('users');
        // const id_user = JSON.parse(users)
        // setRate(e.target.value)
        // setAvisSend(backData => ({
        //     ...backData,
        //     id_user: id_user.id,
        //     id_produit: id,
        //     rate: e.target.value,
        const id_user = JSON.parse(users);
        setRate(value);

        setAvisSend(prevData => ({
            ...prevData,
            id_user: id_user.id,
            id_produit: id,
            rate: value,
        }));
    }

    const AvisSet_2 = (e) => {
        const users = localStorage.getItem('users');
        const id_user = JSON.parse(users)
        setText(e.target.value)
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


    const AddPanier = (id, stock, image, outpout) => {
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

                            const userInfos = {
                                id_produit: id,
                                id_user: UserAccount,
                                price_type: newprice,
                                image_type: image,
                                info: outpout,
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
                    image_type: image,
                    info: outpout,
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
                        <div className='breadcrumb'>
                            <button onClick={() => Debut()}>Home</button>/<button onClick={() => Mid(produit.idCategorie)}>{Categorie}</button>/<button onClick={() => End(produit.id)}>{produit.name}</button>
                        </div>
                        {loginUser && (
                            loginUser.groupe === 1 ? (
                                <button className="menu-btn" onClick={() => EditerProduits(produit.id)}>Modifier le produit</button>
                            ) : (
                                <p></p>
                            )
                        )}
                    </div>
                    <div className='nom_produit'>
                        <p className="nom">{produit.name}</p>
                    </div>
                    <div className='produit_page'>
                        <div class="page_produit">
                            <div className='jointure'>
                                <div className='photo_produit'>
                                    <img className="image_produit" alt="Photo du produit" src={image} />
                                </div>
                                <section className='produit_description'>
                                    <div className='block_infos'>
                                        <div className='star_produit'>
                                            {moyenne >= 1 && moyenne < 2 && renderStars(1)}
                                            {moyenne >= 2 && moyenne < 3 && renderStars(2)}
                                            {moyenne >= 3 && moyenne < 4 && renderStars(3)}
                                            {moyenne >= 4 && moyenne < 5 && renderStars(4)}
                                            {moyenne >= 5 && renderStars(5)}
                                        </div>
                                        <div>
                                            <p className="avis_produit">{nbavis} avis client</p>
                                        </div>
                                    </div>
                                    <div className='description_produit'>
                                        <p className='description'>
                                            Le NZXT H5 Flow RGB est un boîtier PC Gaming moderne équipé d'un panneau latéral en verre trempé et de ventilateurs RGB 140 mm en façade. Il dispose de toutes les caractéristiques que l'on est en droit d'attendre d'un boîtier PC Gaming.
                                        </p>
                                    </div>
                                    <div className='select_produit'>
                                        <img
                                            src={produit.image}
                                            alt="Image principale"
                                            onClick={() => Type_Produit({
                                                price: 0,
                                                image_type: produit.image,
                                                outpout: produit.outpout
                                            })}
                                        />
                                        {typeporduit.map(item => (
                                            <img
                                                key={item.id}
                                                src={item.image_type}
                                                alt={item.type}
                                                onClick={() => Type_Produit(item)}
                                            />
                                        ))}
                                    </div>
                                </section>
                            </div>
                            <section class="produit_achat">
                                <div className='etiquette'>
                                    {produit.promo != 0 && (
                                        <div><span className='etiquette_promo'>Promo</span> <span className='etiquette_pourcent'>-{produit.promo}%</span></div>
                                    )}
                                </div>
                                <div className='produit_promo'>
                                    {produit.promo != 0
                                        ? <h2 className="promo_produit"><span className='prix_promo'>{produit.prix + newprice}€</span> <span className='prix_enpromo'>{((produit.prix) * (1 - produit.promo / 100)) + newprice}€</span></h2>

                                        : <h2 className="prix_produit">{produit.prix + newprice}€</h2>
                                    }
                                </div>
                                <div className="ajouter_panier" onClick={() => AddPanier(produit.id, produit.stock, image, outpout)}>
                                    <h2>Ajouter au panier</h2>
                                </div>
                                {produit.stock === 0 ? (
                                    <section className="stock_produit">
                                        <h4 className="rupture_stock">En rupture de stock!</h4>
                                        <div className="mail_stock">
                                            <p className='p1'>Créer une alerte</p>
                                            <div className='info_email'>
                                                <input type="text" name="email_stock" onChange={(e) => writeEmail(e)} className="input_email" placeholder="Votre e-mail" />
                                                <button className="envoyer_email" onClick={() => sendAlert()}>Envoyer</button>
                                            </div>
                                        </div>
                                    </section>
                                ) : (
                                    <div className="stock_produit">
                                        <h4 className="en_stock">En stock : {produit.stock}</h4>
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                    <div className='produit_step'>
                        <div className="section_step">
                            <button onClick={() => setStep(1)} className={step === 1 ? 'active' : ''}>Fiche technique</button>
                            <button onClick={() => setStep(2)} className={step === 2 ? 'active' : ''}>Avis client</button>
                            {loginUser && (
                                <button onClick={() => setStep(3)} className={step === 3 ? 'active' : ''}>Ajouter un avis</button>
                            )}
                        </div>
                        {step === 1 && (
                            <div className='section_fichetech'>
                                <img src={PhotoSpecs} alt="Image Fiche Technique" />
                            </div>
                        )}
                        {step === 2 && (

                            <div className='section_avis'>
                                <section className="liste_avis">
                                    {avis.map((produit) => (
                                        <article className="avis" key={produit.id}>
                                            <div className='infos_client'>
                                                <img src={produit.user_image} />
                                                <p>{produit.username}</p>
                                            </div>
                                            <div className="avis_evaluation">
                                                {produit.rate === 0 && <p>Aucune évaluation</p>}
                                                {produit.rate >= 1 && produit.rate < 2 && renderStars(1)}
                                                {produit.rate >= 2 && produit.rate < 3 && renderStars(2)}
                                                {produit.rate >= 3 && produit.rate < 4 && renderStars(3)}
                                                {produit.rate >= 4 && produit.rate < 5 && renderStars(4)}
                                                {produit.rate >= 5 && renderStars(5)}
                                            </div>
                                            <div className='avis_description'>
                                                <p> {produit.description} </p>
                                            </div>
                                        </article>

                                    ))}

                                </section>
                            </div>
                        )}

                        {(step === 3 && loginUser) && (

                            <div className='section_addavis'>
                                <div className='post_avis'>
                                    <p className='avis_p'>Note générale</p>
                                    {/* <input type='number' max='5' value={rate} onChange={(e) => AvisSet(e)} placeholder="Nombre d'étoiles"></input> */}
                                    {/* <div class="five-rate-active">
                                        <button type="button" class="rate-value-empty" aria-label="Noter 1 sur 5"><span aria-hidden="true">1</span></button>
                                        <button type="button" class="rate-value-empty" aria-label="Noter 2 sur 5"><span aria-hidden="true">2</span></button>
                                        <button type="button" class="rate-value-empty" aria-label="Noter 3 sur 5"><span aria-hidden="true">3</span></button>
                                        <button type="button" class="rate-value-empty" aria-label="Noter 4 sur 5"><span aria-hidden="true">4</span></button>
                                        <button type="button" class="rate-value-empty" aria-label="Noter 5 sur 5"><span aria-hidden="true">5</span></button>
                                    </div> */}
                                    <div className="evaluation_avis">
                                        {[1, 2, 3, 4, 5].map(value => (
                                            <img
                                                key={value}
                                                src={value <= rate ? StarFull : StarEmpty} // Utilisation des images appropriées
                                                alt={`${value} étoile${value > 1 ? 's' : ''}`}
                                                className="evaluation_etoile"
                                                onClick={() => AvisSet(value)} // Assurez-vous que 'value' est défini ici
                                                aria-label={`Noter ${value} sur 5`}
                                            />
                                        ))}
                                    </div>
                                    <p className='avis_p'>Ajouter un commentaire écrit</p>
                                    <textarea className="avis_texte" value={text} placeholder="Pour quelles utilisations avez-vous employé ce produit? Qu'est-ce que vous avez aimé ou n'avez pas aimé?" onChange={(e) => AvisSet_2(e)}></textarea>
                                    <button className="avis_envoyer" onClick={() => EnvoyerAvis()}>Envoyer</button>
                                </div>
                            </div>
                        )}
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

export default ProductPage;