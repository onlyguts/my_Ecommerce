import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import localhost from './../Config';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const local = localhost

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

        const response = await fetch('https://'+local+'/users/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({formData}),
        });
        console.log(formData);
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            navigate("/");
        } else if (response.status === 500) {
            setError("Deja la ");
        } else {
            setError("Error");
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Username:</label>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;