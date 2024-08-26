import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import localhost from './../Config';
import css from './formulaire.css'
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const local = localhost
    const navigate = useNavigate();

    function Register() {
        navigate('/register')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://localhost:8000/users/get/' + email, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        });
        // console.log(response)
        if (response.status === 200) {
            const data = await response.json();
            console.log(data)
            if (data[0].email) {
                if (data[0].password === password) {
                    navigate("/");
                    const userData = {
                        id:  data[0].id,
                        email: data[0].email,
                        groupe: data[0].groupe,
                        token: data[0].token,
                        image: data[0].image,
                        username: data[0].username,
                        verification: data[0].verification
                    };
                    localStorage.setItem('users', JSON.stringify(userData));
                    const storedUser = localStorage.getItem('users');
                    console.log(storedUser);
                } else {
                    setError("pas le bon mdp");
                }
            }
        } else if (response.status === 500) {
            setError("Erreur");
        } else {
            setError("Error");
        }
    }


    const PasswordReset = () => {
        navigate('/password')
    }
    return (
        <div className='wrapper'>
            <div className='container'>
                <h2 className='titre'>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <input type='email' id='mail' name='mail' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Adresse e-mail' />
                    <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe' />
                    <p className='pass' onClick={() => PasswordReset()}>Mot de passe oublié?</p>
                    <button type="submit">Se connecter</button>
                </form>
                <div className='btn'>
                    <button>Accueil</button>
                    <button onClick={() => Register()}>Inscription</button>
                </div>
            </div>
        </div>
    )
}

export default Login