import React, { useState, useEffect } from 'react';
import Nav from './admin_navbar';
import { useNavigate } from "react-router-dom";


function AdminListC() {
    const [produits, setProduits] = useState([]);
    const navigate = useNavigate();


    const ApiCategorie = () => {

        fetch("https://localhost:8000/categorie/")
            .then(reponse => reponse.json())
            .then(data => setProduits(data))
            .catch(erreur => console.error('Erreur: ', erreur));
    }
    useEffect(() => {
        ApiCategorie()
    }, []);


    const OpenPorudits = (id_produits) => {
        navigate('./categorie/' + id_produits)
    }


    const DeletePorudits = (id_produits) => {
        fetch("https://localhost:8000/categorie/delete/" + id_produits, {
            method: 'DELETE',
        })
            .then(response => ApiCategorie())
            .catch(error => {
                console.error('Erreur:', error);
            });

    };


    return (
        <div>

            <Nav />
            <div className='body'>

                <table>
                   
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>

                        {produits.map((produit) => (

                             <tr  key={produit.id}>
                        
                             <td>{produit.id}</td>
                             <td>{produit.name}</td>
                           
                           <td> <button onClick={() => OpenPorudits(produit.id)}>Modifier</button> <button onClick={() => DeletePorudits(produit.id)}>Supprimer</button></td>
                         </tr>
                        ))}

                    </tbody>
                   
                </table>
            </div>
        </div>
    );
}

export default AdminListC;
