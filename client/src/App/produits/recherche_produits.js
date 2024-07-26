import React, { useState, useEffect } from 'react';
import './../Homes.css';
import images from '../images.js';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate, useParams } from "react-router-dom";

function Nav_tree() {
    const { id } = useParams();
    const [produits, setProduits] = useState([]);
    const [categorie_trier, setcategorie_trier] = useState('');
    const [recherche, setRechercheNom] = useState('');
    const [categorieshow, setCategorieShow] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const navigate = useNavigate();
    const marqueSolo = new Set();
    const Login = localStorage.getItem('users');
 
    const loginUser = JSON.parse(Login);
    


    const openPopup = () => {
        navigate('/login')
    };


    const Deconnexion = () => {
        localStorage.removeItem('users')
        navigate('/')
    }
    const Admin = () => {
        navigate("/admin");
    }


    const sendInput = () => {
        if (recherche) {
            navigate('/produits/all/' + recherche)
            setRechercheNom('null')
        } else {
            navigate('/produits/all/null')
        }

    }

    useEffect(() => {
        if (id !== 'null') {
            setRechercheNom(id)
        }
    }, []);

    useEffect(() => {
        fetch("https://localhost:8000/produits")
            .then(response => response.json())
            .then(data => setProduits(data))
            .catch(error => console.error('Erreur: ', error));
    }, []);


    useEffect(() => {
        fetch("https://localhost:8000/categorie")
            .then(response => response.json())
            .then(data => setCategorie(data))
            .catch(error => console.error('Erreur: ', error));
    }, []);

    

    const CategorieChange = (e) => {
        setcategorie_trier(e.target.value);
    };

    const RechercheChange = (e) => {
        setRechercheNom(e.target.value);
    };

    const OpenProduit = (id, name) => {
        navigate("/produit/" + id);
        localStorage.setItem('categorie', name);
    };

    const produits_trier = produits.filter(produit =>
        (categorie_trier == '' || produit.categorie_name === categorie_trier || produit.marque === categorie_trier) &&
        produit.name.toLowerCase().includes(recherche.toLowerCase())
    );

   
    useEffect(() => {
        fetch("https://localhost:8000/categorie")
            .then(response => response.json())
            .then(data => setCategorieShow(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    function ProduitsShow(id, name) {
        navigate("/produits/" + id);
        localStorage.setItem('categorie', name);
    }

    function AllProduits() {
        navigate("/produits/all/null");
    }

    const Home = () => {
        navigate('/')
    }

    return (
        <div>
            <header>
                <div className='head'>
                    <div className="logo">
                        <img className="logoImg" src={images.logo} alt="BYP Logo" />
                    </div>
                    <div>
                        <input className="navBar" type="text" value={recherche} placeholder="Recherche" onChange={(event) => RechercheChange(event)} />
                        <button onClick={() => sendInput()}>Envoyer</button>
                    </div>
                    <div className="menu">
                        {!loginUser
                            ? <button className="menu-btn" onClick={() => openPopup()}>Connexion</button>
                            : <button className="menu-btn" onClick={() => Deconnexion()}>Deconnexion</button>
                        }
                        {loginUser && (
                            loginUser.groupe === 1 ? (
                                <button className="menu-btn" onClick={Admin}>Panel Admin</button>
                            ) : (
                                <p></p>
                            )
                        )}
                        <button className="menu-btn">Cart</button>
                    </div>
                </div>
            </header>
            <nav>
            <ul>
            <li className="dropdown">
            <div onClick={() => Home()}>
              <a >Home</a>
            </div>
          </li>
                <li className="dropdown">
                    <a href="#">Catégorie</a>
                    <div className="dropdown-content">
                        {categorieshow.map(categorie => (
                            <li key={categorie.id}>
                                <a onClick={() => ProduitsShow(categorie.id, categorie.name)}>{categorie.name}</a>
                            </li>
                        ))}

                    </div>
                </li>
                <li className="dropdown">
                    <div onClick={() => AllProduits()}>
                        <a >Tout Nos Produits</a>
                    </div>
                </li>
            </ul>
        </nav>
            <form>
                {/* <input type='text' placeholder='Rechercher par nom' value={recherche} onChange={RechercheChange} /> */}
                <select value={categorie_trier} onChange={CategorieChange}>

                    <option value=''> Toutes les categories </option>

                    {categorie.map(categorie => (
                        <option key={categorie.id} value={categorie.name}>
                            {categorie.name}

                        </option>

                    ))}
                </select>
                <select value={categorie_trier} onChange={CategorieChange}>

                    <option value=''> Toutes les marques </option>

                    {produits.map(produit => {
                        if (!marqueSolo.has(produit.marque)) {
                            marqueSolo.add(produit.marque);
                            return (
                                <option key={produit.id} value={produit.marque}>{produit.marque}</option>
                            );
                        }
                    })}
                </select>

                <button type="button">Envoyer</button>
            </form>
            <div>
                {produits_trier.map(produit => (
                    <ul key={produit.id} onClick={() => OpenProduit(produit.id, produit.categorie_name)} >
                        <li>{produit.name}</li>
                        <li>{produit.categorie_name}</li>
                    </ul>
                ))}
            </div>
        </div>
    );
}


function ProduitsAll() {

    return (
        <div>
        
          
            <Nav_tree />
        </div>
    );
}

export default ProduitsAll;
