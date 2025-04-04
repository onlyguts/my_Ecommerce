import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './admin_navbar'

import CSS from './Admin.css';
function Admin() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [datax, setDatax] = useState({});
    const [produits, setProduits] = useState([]);

    const [checked, setChecked] = useState(false)


    useEffect(() => {
        fetch("https://localhost:8000/categorie")
            .then(response => response.json())
            .then(data => setProduits(data))
            .catch(error => console.error('Erreur: ', error));
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


    const ChoisirDescription = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            description: getData,
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


    const ChoisirPromo = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            promo: getData,
        }));
    };

    const ChoisirSuggestion = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            suggestion: getData,
        }));
    };


    const Choisirlength = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            length: getData,
        }));
    };

    const Choisirheight = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            height: getData,
        }));
    };

    const Choisirwidth = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            width: getData,
        }));
    };

    const Choisirweight = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            weight: getData,
        }));
    };


    const EnvoyerAPI = () => {

        fetch("https://localhost:8000/produits/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

            .then(response => {
                response.json();
                // alert('Produit Ajouter');
                // navigate('/admin');
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    };


    useEffect(() => {
        console.log(data);
    }, [data]);


    const PapierCado = (e) => {
        setChecked(e.target.checked)
    }

    const form2Change = (e) => {
        const { name, value } = e.target;
       console.log(datax)
        setDatax(prevState => ({
            ...prevState, 
            [name]: value
        }));

    };



    return (
        <div>

            <Nav />
            <div className='main'>

                <form className='form'>
                    <div>
                        <img className='imageEdit' src={data.image}></img>
                    </div>
                    <div>
                        {produits.length === 0 ? (
                            <p>Aucun produit trouvé</p>
                        ) : (
                            <select onChange={ChoisirCategorie}>
                                <option value="">Sélectionnez une categorie</option>
                                {produits.map(produit => (
                                    <option key={produit.id} value={produit.id}>
                                        [ID {produit.id}] {produit.name}
                                    </option>
                                ))}
                            </select>
                        )}
                        <label>Name:</label>
                        <input type='text' name='name' value={data.name} onChange={ChoisirName} />
                        <label>Marque:</label>
                        <input type='text' name='marque' value={data.marque} onChange={ChoisirMarque} />
                        <label>Prix:</label>
                        <input type='number' name='prix' value={data.prix} onChange={ChoisirPrix} />
                        <label>Image:</label>
                        <input type='text' name='image' value={data.image} onChange={ChoisirImage} />
                        {/* <label>Ficher Produits:</label>
                <input type='text' value={data.fiche} onChange={ChoisirFicher} /> */}
                        <label>Stock:</label>
                        <input type='number' name='stock' value={data.stock} onChange={ChoisirStock} />
                        <label>Description:</label>
                        <input type='text' name='description' value={data.description} onChange={ChoisirDescription} />
                        <label>Taille:</label>
                        <input type='text' name='taille' value={data.taille} onChange={ChoisirTaille} />
                        <label>Type:</label>
                        <input type='text' name='type' value={data.type} onChange={ChoisirType} />
                        <label>Socket:</label>
                        <input type='text' name='socket' value={data.socket} onChange={ChoisirSocket} />
                        <label>Type CPU:</label>
                        <input type='text' name='typec' value={data.typec} onChange={ChoisirCPUT} />
                        <label>Consomation:</label>
                        <input type='number' name='consomation' value={data.consomation} onChange={ChoisirConso} />

                        <label>Promo:</label>
                        <input type='number' name='promo' value={data.promo} onChange={ChoisirPromo} />

                        <label>Recommandé:</label>
                        <input type='number' name='suggestion' value={data.suggestion} onChange={ChoisirSuggestion} />

                        <label>Longueur:</label>
                        <input type='number' name='length' value={data.length} onChange={Choisirlength} />

                        <label>Hauteur:</label>
                        <input type='number' name='height' value={data.height} onChange={Choisirheight} />

                        <label>Largeur:</label>
                        <input type='number' name='width' value={data.width} onChange={Choisirwidth} />

                        <label>Poids:</label>
                        <input type='number' name='weight' value={data.weight} onChange={Choisirweight} />

                        <button onClick={() => EnvoyerAPI()}>Créer le produit</button>
                    </div>
                </form>

            </div>
        </div>

    );
}

export default Admin;
