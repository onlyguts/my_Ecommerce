import React, { useState, useEffect } from 'react';
import Nav from './NavAdmin';
import { useNavigate } from "react-router-dom";


function AdminListC() {
    const [produits, setProduits] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:8000/categorie/")
            .then(reponse => reponse.json())
            .then(data => setProduits(data))
            .catch(erreur => console.error('Erreur: ', erreur));
    }, []);


    const OpenPorudits = (id_produits) => {
        navigate('./categorie/' + id_produits)
    }


    const DeletePorudits = (id_produits) => {
        fetch("https://localhost:8000/categorie/delete/" + id_produits, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Erreur:', error);
        });
        
    };
    

    return (
        <div>
        
            <Nav />
            <div>


                {produits.map((produit) => (

                    <div key={produit.id}>

                        <span>{produit.id} | {produit.name} <button onClick={() => OpenPorudits(produit.id)}>Edit</button> <button  onClick={() => DeletePorudits(produit.id)}>Delete</button></span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminListC;
