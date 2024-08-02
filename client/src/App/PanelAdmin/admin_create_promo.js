import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './admin_navbar'

function AdminPromo() {
    const navigate = useNavigate();
    const [data, setData] = useState({});


    const promoChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
      console.log(data)
    };
 

        
    const EnvoyerAPI = () => {
        fetch("https://localhost:8000/code/add", {
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
                <label>Nom code:</label>
                <input type='text' value={data.name}  name='code' onChange={promoChange} />
                <label>Réduction:</label>
                <input type='number' value={data.image}  name='promotion' onChange={promoChange} />
                <label>Nombre Utilisation:</label>
                <input type='number' value={data.image} name='utilisations' onChange={promoChange} />
                <button onClick={() => EnvoyerAPI()}>Créer le code</button>
            </form>
        </div>
    );
}

export default AdminPromo;
