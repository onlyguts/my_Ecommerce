import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import CSS from './Admin.css'
import Nav from './admin_navbar'
import Export from './export'
import Exporte from './exporte'
function AdminDashboard() {

    const [categories, setCategorie] = useState([]);
    const [produits, setProduit] = useState([]);
    const [users, setUsers] = useState([]);


    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

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

    useEffect(() => {
        fetch("https://localhost:8000/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    useEffect(() => {
        fetch("https://localhost:8000/users/date")
            .then(response => response.json())
            .then(data => console.log(data, formattedToday))
            .catch(error => console.error('Erreur:', error));
    }, []);
    return (
        <div>
            <Nav />
            <Export />
            <Exporte />
            <div>
                <p>Nombre de catégories : {categories.length}</p>
                <p>Nombre de produits : {produits.length}</p>
                <p>Nombre d'utilisateurs : {users.length}</p>
              
            </div>
        </div>
    )
}

export default AdminDashboard