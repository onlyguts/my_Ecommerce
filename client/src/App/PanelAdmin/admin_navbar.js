import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CSS from "./Admin.css"

function NavAdmin() {
    const navigate = useNavigate();
    useEffect(() => {
        const utilisateurConnecte = localStorage.getItem('users');
        const utilisateur = utilisateurConnecte ? JSON.parse(utilisateurConnecte) : null;
        if (!utilisateur || utilisateur.groupe !== 1) {
            navigate("/");
        }
    }, [navigate]);
    const Home = () => {
        navigate('/')
    }
    const DASHBOARD = () => {
        navigate('/admin')
    }
    const Ajouter = () => {
        navigate('/admin/add')
    }
    const AjouterC = () => {
        navigate('/admin/addc')
    }
    const List = () => {
        navigate('/admin/list')
    }
    const ListC = () => {
        navigate('/admin/listc')
    }
    return (
        <div>
 

            <div className='Navbar'>
                <a onClick={() => Home()}>HOME</a>
                <a onClick={() => DASHBOARD()}>DASHBOARD</a>
                <a onClick={() => Ajouter()}>AJOUTER PRODUIT</a>
                <a onClick={() => AjouterC()}>AJOUTER CATEGORIE</a>
                <a onClick={() => List()}>LISTE PRODUIT</a>
                <a onClick={() => ListC()}>LISTE CATEGORIE</a>
            </div>
        </div>
    )
}

export default NavAdmin