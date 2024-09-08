import React, { useState, useEffect } from 'react';
import Nav from './admin_navbar';
import { useNavigate } from "react-router-dom";


function AdminListC() {
    const [produits, setProduits] = useState([]);
    const navigate = useNavigate();

    const ApiCode = () => {
        fetch("https://localhost:8000/code")
            .then(reponse => reponse.json())
            .then(data => setProduits(data))
            .catch(erreur => console.error('Erreur: ', erreur));
    }

    useEffect(() => {
        ApiCode()
    }, []);


    const OpenPorudits = (id_produits) => {
        navigate('./promo/' + id_produits)
    }


    const DeletePorudits = (id_produits) => {
        fetch("https://localhost:8000/code/delete/" + id_produits, {
            method: 'DELETE',
        })
            .then(response =>  ApiCode())

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
                            <th scope="col">Nom du code promo</th>
                            <th scope="col">Promotion</th>
                            <th scope="col">Utilisations</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>

                        {produits.map((produit) => (

                            <tr key={produit.id}>

                                <td>{produit.id}</td>
                                <td>{produit.code}</td>
                                <td>{produit.promotion}%</td>
                                <td>{produit.utilisations}</td>

                                <td> <button onClick={() => OpenPorudits(produit.code)}>Modifier</button> <button onClick={() => DeletePorudits(produit.id)}>Supprimer</button></td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default AdminListC;
