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
    const AjouterP = () => {
        navigate('/admin/addp')
    }
    const List = () => {
        navigate('/admin/list')
    }
    const ListC = () => {
        navigate('/admin/listc')
    }
    const ListP = () => {
        navigate('/admin/listp')
    }
    const ListPF = () => {
        navigate('/admin/listpf')
    }
    return (
        <div>
 

            <div className='Navbar'>
                <a onClick={() => Home()}>HOME</a>
                <a onClick={() => DASHBOARD()}>DASHBOARD</a>
                <a onClick={() => Ajouter()}>AJOUTER PRODUIT</a>
                <a onClick={() => AjouterC()}>AJOUTER CATEGORIE</a>
                <a onClick={() => AjouterP()}>AJOUTER CODE PROMO</a>
                <a onClick={() => List()}>LISTE PRODUIT</a>
                <a onClick={() => ListC()}>LISTE CATEGORIE</a>
                <a onClick={() => ListP()}>LISTE PROMO</a>
                <a onClick={() => ListPF()}>LISTE PAYS FRAIS</a>
            </div>
        </div>
    )
}

export default NavAdmin