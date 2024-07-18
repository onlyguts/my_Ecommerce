import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://localhost:8000/users/get/' + email, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
         
        });
      console.log(response)
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
         navigate("/");
    } else if (response.status === 500) {
        setError("Deja la ");
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
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Register</button>
            </form>
    </div>
  )
}

export default Login