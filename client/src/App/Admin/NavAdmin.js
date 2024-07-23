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

    const Ajouter = () => {
        navigate('/admin')
    }
    const AjouterC = () => {
        navigate('/admin/addc')
    }
    const List = () => {
        navigate('/admin/list')
    }
  return (
    <div>
        <button onClick={() => Ajouter()}>AJOUTER PRODUIT</button>
        <button onClick={() => AjouterC()}>AJOUTER CATEGORIE</button>
        <button onClick={() => List()}>LISTE PRODUIT</button>
    </div>
  )
}

export default NavAdmin