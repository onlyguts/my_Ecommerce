import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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
            <h1>Admin</h1>

            <div>
                <button onClick={() => Home()}>HOME</button>
                <button onClick={() => DASHBOARD()}>DASHBOARD</button>
                <button onClick={() => Ajouter()}>AJOUTER PRODUIT</button>
                <button onClick={() => AjouterC()}>AJOUTER CATEGORIE</button>
                <button onClick={() => List()}>LISTE PRODUIT</button>
                <button onClick={() => ListC()}>LISTE CATEGORIE</button>
            </div>
        </div>
    )
}

export default NavAdmin