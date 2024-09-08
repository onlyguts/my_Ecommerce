import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import localhost from './../Config';
import css from './formulaire.css'

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const local = localhost

    function Login() {
        navigate('/Login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailPattern.test(email)) {
            setError("Email is invalid");
            return;
        }
        const formData = {
            email: email,
            username: username,
            password: password,
        };

        console.log(email, password)

        const response = await fetch('https://localhost:8000/users/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({formData}),
        });
        console.log(formData);
        if (response.status === 200) {
            const data = await response.json();
            console.log(data)
         
            navigate("/login");
        } else if (response.status === 500) {
            setError("Deja la ");
        } else {
            setError("Error");
        }
    };

    return (
        <div className='wrapper'>
        <div className='container'>
            <h2 className='titre'>Inscription</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                    <input type='email' name="mail" id="mail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Adresse e-mail' />
                    <input type='text' name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
                    <input type='password' name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe'/>
                <button type="submit">S'inscrire</button>
            </form>
            <div className='btn'>
            <button>Accueil</button>
            <button onClick={() => Login()}>Se connecter</button>
            </div>
        </div>
    </div>
    );
}

export default Register;