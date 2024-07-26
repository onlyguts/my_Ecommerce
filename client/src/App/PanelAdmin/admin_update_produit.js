import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from './admin_navbar';
import localhost from '../Config';

import CSS from './Admin.css';

function AdminProduit() {
    const { id } = useParams();
    const [produit, setProduit] = useState([]);
    const navigate = useNavigate();
    const local = localhost;
    const [categorie, setCategorie] = useState([]);


    useEffect(() => {
        fetch("https://localhost:8000/categorie")
            .then(response => response.json())
            .then(data => setCategorie(data))
            .catch(error => console.error('Erreur: ', error));
    }, []);

    useEffect(() => {
        fetch("https://localhost:8000/produit/" + id)
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
        console.log(name, value)
    };

    const UpdateProduit = (e) => {

        e.preventDefault();

        fetch("https://localhost:8000/produit/update/" + produit.id, {
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

    const EditerProduits  = (id) => {
 
            navigate("/produit/" + id)
      
    }
    const EditerAvis  = (id) => {
 
        navigate("/produit/avis/" + id)
  
}
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
            <Nav/>
        <div className='main'>
       
            <form>
                <div>

                <h2>{produit.name}</h2>
            <img className='imageEdit' src={produit.image}/>
                                
            <button onClick={() => EditerProduits(produit.id)}>Fiche produit</button>
            <button onClick={() => EditerAvis(produit.id)}>Editer avis</button>
            <button onClick={(e) => UpdateProduit(e)}>Sauvegarder</button>
            <br></br>
            </div>
            <div>
            <label>Categorie :</label>
                <select name='idCategorie' value={produit.idCategorie} onChange={formChange}>
                    {categorie.map(categorie => (
                        <option key={categorie.id} value={categorie.id}>
                            [ID {categorie.id}] {categorie.name}
                        </option>
                    ))}
                </select>
                <label>Nom :</label>
                <input type="text" name='name' value={produit.name} onChange={formChange} />



                <label>Marque:</label>
                <input type="text" name='marque' value={produit.marque} onChange={formChange} />

                <label>Prix:</label>
                <input type="number" name='prix' value={produit.prix} onChange={formChange} />

                <label>Image:</label>
                
                <input type="text" name='image' value={produit.image} onChange={formChange} />

                <label>Stock:</label>
                <input type="number" name='stock' value={produit.stock} onChange={formChange} />

                <label>Taille:</label>
                <input type="text" name='taille' value={produit.taille} onChange={formChange} />

                <label>Type:</label>
                <input type="text" name='type' value={produit.type} onChange={formChange} />

                <label>Socket:</label>
                <input type="text" name='socket' value={produit.socket} onChange={formChange} />

                <label>Type CPU:</label>
                <input type="text" name='typec' value={produit.typec} onChange={formChange} />


                <label>Consommations:</label>
                <input type="text" name='consommations' value={produit.consommations} onChange={formChange} />
                <label>Promo:</label>
                <input type="text" name='promo' value={produit.promo} onChange={formChange} />
               
                </div>
            </form>
        </div>
        </div>
    );
}

export default AdminProduit;
