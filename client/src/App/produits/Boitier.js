import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import Nav from './../Nav';

function Boitier() {
    const [array, setArray] = useState([]);



    useEffect(() => {
        fetch("https://localhost:8000/boitier")
            .then(response => response.json())
            .then(data => setArray(data))
    }, [])


    return (

        <div>
            <Nav />
            {
                array.map((itme) => {
                    return (
                        <div className="item" key={itme.id}>
                            <span> {itme.designation} </span>
                            <img src={itme.imageUrl} alt={itme.designation} />
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Boitier