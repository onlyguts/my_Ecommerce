import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import localhost from '../Config';

function Admin() {
    const [produits, setProduits] = useState([]);


    const [produitActuel, setProduitActuel] = useState(null);


    const [formulaire, setFormulaire] = useState({
        designation: '',
        marque: '',
        image: ''
    });

    const [typeProduit, setTypeProduit] = useState('boitier');

    const navigate = useNavigate();


    useEffect(() => {
        const utilisateurConnecte = localStorage.getItem('users');
        const utilisateur = utilisateurConnecte ? JSON.parse(utilisateurConnecte) : null;
        if (!utilisateur || utilisateur.groupe !== 1) {

            navigate("/");

        }

    }, [navigate]);





    useEffect(() => {
        fetchProduits();

    }, [typeProduit]);



    const fetchProduits = () => {

        fetch(`https://${localhost}/${typeProduit}`)
            .then(response => response.json())
            .then(data => setProduits(data))

            .catch(error => console.error('Erreur fetch', error));
    };

    const handleInputChange = (e) => {

        const { name, value } = e.target;


        setFormulaire({
            ...formulaire,
            [name]: value
        });
    };

    const handleProductTypeChange = (e) => {
        setTypeProduit(e.target.value);
        setProduitActuel(null);


        setFormulaire({ designation: '', marque: '', image: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const method = produitActuel ? 'PUT' : 'POST';
        const url = produitActuel ? `https://${localhost}/${typeProduit}/update/${produitActuel.id}` : `https://${localhost}/${typeProduit}/add`;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formulaire)
        })
   
            .then(response => response.json())
            .then(updatedProduit => {
                if (produitActuel) {
                    setProduits(produits.map(produit => produit.id === updatedProduit.id ? updatedProduit : produit));
                
                } else {
                    setProduits([...produits, updatedProduit]);
                

                }
                resetForm();


            })
            .catch(error => console.error('Erreur update', error));
            
    };

    const handleEdit = (produit) => {
        setProduitActuel(produit);
        setFormulaire({
            designation: produit.designation,
            marque: produit.marque,
            image: produit.image
        });
    };

    const handleDelete = (id) => {


        fetch(`https://${localhost}/${typeProduit}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {

                    throw new Error('Erreur delete 1');
                }
                setProduits(produits.filter(produit => produit.id !== id));

            })


            .catch(error => console.error('Erreur delete', error));
    };



    const resetForm = () => {
        setProduitActuel(null);
        setFormulaire({ designation: '', marque: '', image: '' });

    };

    return (
        <div>
            <h1>Pannel Admin</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Type de produit :
                    <select value={typeProduit} onChange={handleProductTypeChange}>
                        <option value="boitier">Boitier</option>
                        <option value="aio">AIO</option>
                    </select>
                </label>
    
                {typeProduit === 'boitier' && (
                    <>
                        <label>
                            Designation : <input type='text' name='designation' value={formulaire.designation} onChange={handleInputChange} />
                        </label>
                        <label>
                            Marque : <input type='text' name='marque' value={formulaire.marque} onChange={handleInputChange} />
                        </label>
                        <label>
                            Image URL : <input type='text' name='image' value={formulaire.image} onChange={handleInputChange} />
                        </label>
                        <label>
                            Taille : <input type='text' name='taille' value={formulaire.taille || ''} onChange={handleInputChange} />
                        </label>
                        <label>
                            Poids : <input type='text' name='poids' value={formulaire.poids || ''} onChange={handleInputChange} />
                        </label>
                    </>
                )}
    
                {typeProduit === 'aio' && (
                    <>
                        <label>
                            Désignation: <input type='text' name='designation' value={formulaire.designation} onChange={handleInputChange} />
                        </label>
                        <label>
                            Marque: <input type='text' name='marque' value={formulaire.marque} onChange={handleInputChange} />
                        </label>
                        <label>
                            Image: <input type='text' name='image' value={formulaire.image} onChange={handleInputChange} />
                        </label>
                    </>
                )}
    
                <button type='submit'>{produitActuel ? 'Mettre à jour' : 'Ajouter'}</button>
                {produitActuel && <button type='button' onClick={resetForm}>Annuler</button>}
            </form>
            <ul>
                {produits.map(produit => (
                    <li key={produit.id}>
                        {produit.designation} | {produit.marque} | <img src={produit.image} alt={produit.designation} />
                        <button onClick={() => handleEdit(produit)}>Éditer</button>
                        <button onClick={() => handleDelete(produit.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
    
}

export default Admin;
