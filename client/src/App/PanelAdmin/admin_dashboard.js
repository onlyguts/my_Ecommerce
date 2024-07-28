import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import CSS from './Admin.css'
import Nav from './admin_navbar'

function AdminDashboard() {

    const [categories, setCategorie] = useState([]);
    const [produits, setProduit] = useState([]);

    useEffect(() => {
        fetch("https://localhost:8000/categorie")
            .then(response => response.json())
            .then(data => setCategorie(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    useEffect(() => {
        fetch("https://localhost:8000/produits")
            .then(response => response.json())
            .then(data => setProduit(data))
            .catch(error => console.error('Erreur:', error));
    }, []);
    return (
        <div>
            <Nav />
            <div>
           <p>Nombre de catégories : {categories.length}</p>
           <p>Nombre de produits : {produits.length}</p>
    </div>
        </div>
    )
}

export default AdminDashboard