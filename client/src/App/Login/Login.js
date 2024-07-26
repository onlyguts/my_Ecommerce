import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import localhost from './../Config';

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
        
            if (data[0].email) {
                if (data[0].password === password) {
                    navigate("/");
                    const userData = {
                        id:  data[0].id,
                        email: data[0].email,
                        groupe: data[0].groupe
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
    return (
        <div>Login
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            <button onClick={() => Register()}>Register</button>
        </div>
    )
}

export default Login