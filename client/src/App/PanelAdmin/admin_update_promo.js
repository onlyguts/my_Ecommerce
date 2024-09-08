import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from './admin_navbar';
import localhost from '../Config';

function AdmonPromoUpdate() {
    const { id } = useParams();
    const [produit, setProduit] = useState([]);
    const navigate = useNavigate();
    const local = localhost;

    useEffect(() => {
        fetch("https://localhost:8000/code/" + id)
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

    console.log(produit.code)

    const UpdateProduit = (e) => {

        e.preventDefault();
        fetch("https://localhost:8000/code/update/" + produit.id, {
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
                
                    <label>Code promo :</label>
                    <input type="text" name='code' value={produit.code} onChange={formChange} />
        
                    <label>Utilisation:</label>
                    <input type="number" name='image' value={produit.utilisations} onChange={formChange} />
                     
                    <label>Promotion:</label>
                    <input type="number" name='image' value={produit.promotion} onChange={formChange} />
                <button onClick={(e) => UpdateProduit(e)} >Mettre à jour</button>
            </form>
        </div>
    );
}

export default AdmonPromoUpdate;
