import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from './admin_navbar';
import localhost from '../Config';

function AdminProduitC() {
    const { id } = useParams();
    const [produit, setProduit] = useState([]);
    const navigate = useNavigate();
    const local = localhost;

    useEffect(() => {
        fetch("https://localhost:8000/categorie/" + id)
            .then(response => response.json())
            .then(data => setProduit(data))
            .catch(error => console.error('Erreur :', error));
    }, [id, local]);



    const formChange = (e) => {
        const { name, value } = e.target;
        setProduit(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const UpdateProduit = (e) => {

        e.preventDefault();
        fetch("https://localhost:8000/categorie/update/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produit),
        })
            .then(response => {
                alert('Produit update');
                navigate('/admin');
            })
            .catch(error => console.error('Erreur :', error));
    };

    if (!produit) {
        return (
            <div>
                <Nav />
                <p>Chargement...</p>

            </div>
        );
    }

    return (
        <div>
            <Nav />
            <form>
                
                    <label>Nom :</label>
                    <input type="text" name='name' value={produit.name} onChange={formChange} />
        
                    <label>Image:</label>
                    <input type="text" name='image' value={produit.image} onChange={formChange} />

                <button onClick={(e) => UpdateProduit(e)}>Sauvegarder</button>
            </form>
        </div>
    );
}

export default AdminProduitC;
