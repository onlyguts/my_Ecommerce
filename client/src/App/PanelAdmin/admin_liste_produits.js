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

    const ApiProduit = () => {
        fetch("https://localhost:8000/produits/")
            .then(reponse => reponse.json())
            .then(data => setProduits(data))
            .catch(erreur => console.error('Erreur: ', erreur));

    }

    useEffect(() => {
        ApiProduit()
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
            .then(response =>  ApiProduit())
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

    const GoProduit = (id) => {
        navigate('/produit/' + id)
    }

const Gocate = (id, name) => {
    navigate('/produits/' + id)
    localStorage.setItem('categorie', name);
}
    return (
        <div>

            <Nav />

            <div className='body'>
                <table>
                    <caption>
                        <form>
                            <input className="recherchebar" type="text" value={recherche} placeholder="Recherche" onChange={(event) => RechercheChange(event)} />
                            {/* <input type='text' placeholder='Rechercher par nom' value={recherche} onChange={RechercheChange} /> */}
                            <select className="inputbar" value={categorie_trier} onChange={CategorieChange}>

                                <option value=''> Toutes les categories </option>

                                {categorie.map(categorie => (
                                    <option key={categorie.id} value={categorie.name}>
                                        {categorie.name}

                                    </option>

                                ))}
                            </select>
                            <select className="inputbar" value={marque} onChange={MarqueChange}>

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


                        </form>
                    </caption>
                
           
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nom produit</th>
                            <th scope="col">Nom de la Catégorie</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Vendu</th>
                            <th scope="col">Views</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produits2_trier.map((produit) => (
                            <tr key={produit.id}>
                                <td>{produit.id}</td>
                                <td className='gop' onClick={() => GoProduit(produit.id)}>{produit.name}</td>
                                <td className='gop' onClick={() => Gocate(produit.id_categorie, produit.categorie_name)}>{produit.categorie_name}</td>
                                <td>{produit.stock}</td>
                                <td>{produit.vendu}</td>
                                <td>{produit.views}</td>
                                <td><button className='edit' onClick={() => OpenPorudits(produit.id)}>Edit</button> <button className='delete' onClick={() => DeletePorudits(produit.id)}>Delete</button> <button className='view' onClick={() => EditerProduits(produit.id)}>Page</button></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
               
            </div>
        </div>
    );
}

export default AdminList;
