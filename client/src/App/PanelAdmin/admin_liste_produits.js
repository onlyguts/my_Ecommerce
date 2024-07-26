import React, { useState, useEffect } from 'react';
import Nav from './admin_navbar';
import { useNavigate } from "react-router-dom";


function AdminList() {
    const [produits, setProduits] = useState([]);
    const [recherche, setRechercheNom] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:8000/produits/")
            .then(reponse => reponse.json())
            .then(data => setProduits(data))
            .catch(erreur => console.error('Erreur: ', erreur));
    }, []);


    const OpenPorudits = (id_produits) => {
        navigate('./produit/' + id_produits)
    }
    const DeletePorudits = (id_produits) => {
        fetch("https://localhost:8000/produits/delete/" + id_produits, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Erreur:', error);
            });
    };

    const RechercheChange = (e) => {
        setRechercheNom(e.target.value);
    };

    const EditerProduits = (id) => {

        navigate("/produit/" + id)

    }

    const produits_trier = produits.filter(produit =>
        produit.name.toLowerCase().includes(recherche.toLowerCase())
    );

    return (
        <div>

            <Nav />
            <div>
 <input className="navBar" type="text" value={recherche} placeholder="Recherche" onChange={(event) => RechercheChange(event)} />
                {produits_trier.map((produit) => (

                    <div key={produit.id}>

                        <span>{produit.id} | {produit.categorie_name} | {produit.name} <button onClick={() => OpenPorudits(produit.id)}>Edit</button> <button onClick={() => DeletePorudits(produit.id)}>Delete</button> <button onClick={() => EditerProduits(produit.id)}>Views</button></span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminList;
