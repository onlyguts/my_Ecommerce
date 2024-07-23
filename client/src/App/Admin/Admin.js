import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        const utilisateurConnecte = localStorage.getItem('users');
        const utilisateur = utilisateurConnecte ? JSON.parse(utilisateurConnecte) : null;
        if (!utilisateur || utilisateur.groupe !== 1) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        fetch("https://localhost:8000/categorie")
            .then(response => response.json())
            .then(data => setProduits(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const ChoisirCategorie = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            id_categorie: getData,
        }));
    };

    const ChoisirName = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            name: getData,
        }));
    };

    
    const ChoisirMarque = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            marque: getData,
        }));
    };
    
    const ChoisirPrix = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            prix: getData,
        }));
    };

    const ChoisirImage = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            image: getData,
        }));
    };

    const ChoisirFicher = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            fichier: getData,
        }));
    };

    const ChoisirStock = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            stock: getData,
        }));
    };

    const ChoisirTaille = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            taille: getData,
        }));
    };

    const ChoisirType = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            type: getData,
        }));
    };

    const ChoisirSocket = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            socket: getData,
        }));
    };

    const ChoisirCPUT = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            typec: getData,
        }));
    };

    
    const ChoisirConso = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            consomation: getData,
        }));
    };

        
    const EnvoyerAPI = () => {
        console.log('envoyer apiu')
    };


    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div>
            <h1>Admin</h1>
            {produits.length === 0 ? (
                <p>Aucun produit trouvé</p>
            ) : (
                <select onChange={ChoisirCategorie}>
                    <option value="">Sélectionnez un produit</option>
                    {produits.map(produit => (
                        <option key={produit.id} value={produit.id}>
                            {produit.name}
                        </option>
                    ))}
                </select>
            )}
             <form>
                <label>Name:</label>
                <input type='text' value={data.name} onChange={ChoisirName} />
                <label>Marque:</label>
                <input type='text' value={data.marque} onChange={ChoisirMarque} />
                <label>Prix:</label>
                <input type='text' value={data.prix} onChange={ChoisirPrix} />
                <label>Image:</label>
                <input type='text' value={data.image} onChange={ChoisirImage} />
                <label>Ficher Produits:</label>
                <input type='text' value={data.fiche} onChange={ChoisirFicher} />
                <label>Stock:</label>
                <input type='text' value={data.stock} onChange={ChoisirStock} />
                <label>taille:</label>
                <input type='text' value={data.taille} onChange={ChoisirTaille} />
                <label>Type:</label>
                <input type='text' value={data.type} onChange={ChoisirType} />
                <label>Socket:</label>
                <input type='text' value={data.socket} onChange={ChoisirSocket} />
                <label>Type CPU:</label>
                <input type='text' value={data.typec} onChange={ChoisirCPUT} />
                <label>Consomation:</label>
                <input type='text' value={data.consomation} onChange={ChoisirConso} />
                <button onClick={() => EnvoyerAPI()}>Créer le produits</button>
            </form>
        </div>
    );
}

export default Admin;
