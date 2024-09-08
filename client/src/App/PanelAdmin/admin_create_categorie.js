import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './admin_navbar'

function AdminCat() {
    const navigate = useNavigate();
    const [data, setData] = useState({});


    const ChoisirName = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            name: getData,
        }));
    };

    

    const ChoisirImage = (event) => {
        const getData = event.target.value;
        setData(backData => ({
            ...backData,
            image: getData,
        }));
    };

 

        
    const EnvoyerAPI = () => {
        fetch("https://localhost:8000/categorie/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Erreur:', error);
        });
    };



    return (
        <div>
           
            <Nav />
         
             <form>
                <label>Name:</label>
                <input type='text' value={data.name} onChange={ChoisirName} />
                <label>Image:</label>
                <input type='text' value={data.image} onChange={ChoisirImage} />
                <button onClick={() => EnvoyerAPI()}>Créer la catégorie</button>
            </form>
        </div>
    );
}

export default AdminCat;
