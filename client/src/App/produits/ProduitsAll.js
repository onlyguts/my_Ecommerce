import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProduitsAll() {
    const { id } = useParams();
    const [produits, setProduits] = useState([]);
    const [categorie_trier, setcategorie_trier] = useState('');
    const [recherche, setRechercheNom] = useState('');
    const [categorie, setCategorie] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    if (id !== 'null') {
        setRechercheNom(id)
    }
}, []);
    useEffect(() => {
        fetch("https://localhost:8000/produits")
            .then(response => response.json())
            .then(data => setProduits(data))
            .catch(error => console.error('Erreur: ', error));
    }, []);


    useEffect(() => {
        fetch("https://localhost:8000/categorie")
            .then(response => response.json())
            .then(data => setCategorie(data))
            .catch(error => console.error('Erreur: ', error));
    }, []);

    const CategorieChange = (e) => {
        setcategorie_trier(e.target.value);
    };

    const RechercheChange = (e) => {
        setRechercheNom(e.target.value);
    };

    const OpenProduit = (id) => {
        navigate("/produit/" + id);
    };

    const produits_trier = produits.filter(produit =>
        (categorie_trier == '' || produit.categorie_name === categorie_trier || produit.marque === categorie_trier) &&
        produit.name.toLowerCase().includes(recherche.toLowerCase())
    );

    return (
        <div>ProduitsAll
            <form>
                <input type='text' placeholder='Rechercher par nom' value={recherche} onChange={RechercheChange} />
                <select value={categorie_trier} onChange={CategorieChange}>

                    <option value=''> Toutes les categories </option>

                    {categorie.map(categorie => (
                        <option key={categorie.id} value={categorie.name}>
                            {categorie.name}

                        </option>

                    ))}
                </select>
                <select value={categorie_trier} onChange={CategorieChange}>

                    <option value=''> Toutes les marques </option>

                    {produits.map(marque => (
                        <option key={marque.id} value={marque.marque}>
                            {marque.marque}

                        </option>

                    ))}
                </select>

                <button type="button">Envoyer</button>
            </form>
            <div>
                {produits_trier.map(produit => (
                    <ul key={produit.id} onClick={() => OpenProduit(produit.id)} >
                        <li>{produit.name}</li>
                        <li>{produit.categorie_name}</li>
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default ProduitsAll;
