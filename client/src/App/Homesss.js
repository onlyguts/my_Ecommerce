import React, { useState, useEffect } from 'react';
import './Homes.css';
import images from './images.js';
import PopupForm from './PopupForm';
import Nav from './Nav';
import { useNavigate } from "react-router-dom";

function Homes() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const navigate = useNavigate();
    const openPopup = () => {
        navigate('/login')
    };




    return (
        <div className="App">
            <Header openPopup={openPopup} />
            <Nav />
            <Main />

        </div>
    );
}

function Header({ openPopup }) {
    const Login = localStorage.getItem('users');
    const navigate = useNavigate();

    const Deconnexion = () => {
        localStorage.removeItem('users')
        navigate('/')
    }
    const parseUser = JSON.parse(Login);



    const handleClick = () => {
        navigate("/admin");
    }

    return (
        <header>
            <div className='head'>
                <div className="logo">
                    <img className="logoImg" src={images.logo} alt="BYP Logo" />
                </div>
                <input className="navBar" type="text" placeholder="Recherche" />
                <div className="menu">
                    {!parseUser
                        ? <button className="menu-btn" onClick={openPopup}>Connexion</button>
                        : <button className="menu-btn" onClick={Deconnexion}>Deconnexion</button>
                    }
                    {parseUser && (
                        parseUser.groupe === 1 ? (
                            <button className="menu-btn"  onClick={handleClick}>Panel Admin</button>
                        ) : (
                            <p></p>
                        )
                    )}


                    <button className="menu-btn">Cart</button>
                </div>
            </div>
        </header>
    );
}



function Main() {

    const navigate = useNavigate();

    const OpenBoitier = () => {
        navigate("/boitier");
    }

    return (
        <main>
            <div className="main-banner">
                <h1>Build Your PC</h1>

            </div>

            <div className="grid-container">

                <ProductItem src={images.gpu} alt="Carte graphique" name="Carte graphique" />
                <ProductItem src={images.motherboard} alt="Carte Mère" name="Carte Mère" />
                <ProductItem src={images.ram} alt="Barrette de RAM" name="Barrette de RAM" />
                <ProductItem src={images.storage} alt="Stockage" name="Stockage" />
                <ProductItem src={images.psu} alt="Alimentation" name="Alimentation" />
                <ProductItem src={images.cpu} alt="Processeur" name="Processeur" />
                <ProductItem src={images.caseImg} navigate={OpenBoitier} alt="Boîtier" name="Boîtier" />
                <ProductItem src={images.cooler} alt="Ventirad" name="Ventirad" />
                <ProductItem src={images.aio} alt="Water-cooling AIO" name="Water-cooling AIO" />
            </div>
        </main>
    );
}

function ProductItem({ src, alt, name, navigate }) {
    return (
        <div className="item" onClick={navigate}>
            <img src={src} alt={alt} />
            <span>{name}</span>
        </div>
    );
}

export default Homes;