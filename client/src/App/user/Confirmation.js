import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Nav from './../Nav'

function Confirmation() {
    const { token } = useParams();
    const [error, setError] = useState("");
    const [good, setGood] = useState("");
    const Api = async () => {
        try {
            const response = await fetch(`https://localhost:8000/users/token/${token}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);


                const updateResponse = await fetch(`https://localhost:8000/users/updateverif/${token}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ verification: 1 }),
                });

                if (updateResponse.ok) {
                    const updateData = await updateResponse.json();
                    console.log(updateData);
                    setGood('Email verifié'); 
                } else {
                    setError("Erreur : lien invalide");
                   
                }
            } else {
                setError("Erreur : lien invalide");
              
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError("Erreur : lien invalide");
         
        }
    }

    useEffect(() => {
        Api();
    }, []);

    return (
        <div>
            {good != '' && error != '' ? (
                <p>{good}</p>
            ): (
            <p> {error} {good}</p>
            )}
      
        </div>
    );
}

export default Confirmation;
