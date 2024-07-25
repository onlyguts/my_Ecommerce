import React, { useState, useEffect } from 'react';
import Nav from './NavAdmin';
import { useNavigate } from "react-router-dom";


function AdminList() {
    const [produits, setProduits] = useState([]);
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
    const EditerProduits  = (id) => {
 
        navigate("/produit/" + id)
  
}

    return (
        <div>
          
            <Nav />
            <div>

                {produits.map((produit) => (

                    <div key={produit.id}>

                        <span>{produit.id} | {produit.categorie_name} | {produit.name} <button onClick={() => OpenPorudits(produit.id)}>Edit</button> <button  onClick={() => DeletePorudits(produit.id)}>Delete</button> <button  onClick={() => EditerProduits(produit.id)}>Views</button></span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminList;
