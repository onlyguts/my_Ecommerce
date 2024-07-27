import React, { useState, useEffect } from 'react';
import Nav from './admin_navbar';
import { useNavigate } from "react-router-dom";


function AdminList() {
    const [produits, setProduits] = useState([]);
    const [recherche, setRechercheNom] = useState('');
    const [categorie, setCategorie] = useState([]);
       const [marque, setmarque] = useState('');
    const [categorie_trier, setcategorie_trier] = useState('');
    const navigate = useNavigate();
    const marqueSolo = new Set();

    useEffect(() => {
        fetch("https://localhost:8000/produits/")
            .then(reponse => reponse.json())
            .then(data => setProduits(data))
            .catch(erreur => console.error('Erreur: ', erreur));
    }, []);

    useEffect(() => {
        fetch("https://localhost:8000/categorie")
            .then(response => response.json())
            .then(data => setCategorie(data))
            .catch(error => console.error('Erreur: ', error));
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

    const CategorieChange = (e) => {
        setcategorie_trier(e.target.value);
    };

    const MarqueChange = (e) => {
        setmarque(e.target.value);
    };

   

    const EditerProduits = (id) => {

        navigate("/produit/" + id)

    }

 
    const produits_trier = produits.filter(produit =>
        (categorie_trier == '' || produit.categorie_name === categorie_trier || produit.marque === categorie_trier) &&
        produit.name.toLowerCase().includes(recherche.toLowerCase())
    );
    const produits2_trier = produits_trier.filter(produit =>
        (marque == '' || produit.categorie_name === marque || produit.marque === marque) &&
        produit.name.toLowerCase().includes(recherche.toLowerCase())
    );
  

    return (
        <div>

            <Nav />
            <form>
                {/* <input type='text' placeholder='Rechercher par nom' value={recherche} onChange={RechercheChange} /> */}
                <select value={categorie_trier} onChange={CategorieChange}>

                    <option value=''> Toutes les categories </option>

                    {categorie.map(categorie => (
                        <option key={categorie.id} value={categorie.name}>
                            {categorie.name}

                        </option>

                    ))}
                </select>
                <select value={marque} onChange={MarqueChange}>

                    <option value=''> Toutes les marques </option>

                    {produits.map(produit => {
                        if (!marqueSolo.has(produit.marque)) {
                            marqueSolo.add(produit.marque);
                            return (
                                <option key={produit.id} value={produit.marque}>{produit.marque}</option>
                            );
                        }
                    })}
                </select>

                <button type="button">Envoyer</button>
            </form>
            <div>
 <input className="navBar" type="text" value={recherche} placeholder="Recherche" onChange={(event) => RechercheChange(event)} />
                {produits2_trier.map((produit) => (

                    <div key={produit.id}>

                        <span>{produit.id} | {produit.categorie_name} | {produit.name} <button onClick={() => OpenPorudits(produit.id)}>Edit</button> <button onClick={() => DeletePorudits(produit.id)}>Delete</button> <button onClick={() => EditerProduits(produit.id)}>Views</button></span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminList;
