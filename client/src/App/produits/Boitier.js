import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './../Nav';
import localhost from './../Config';

function Boitier() {
    const [array, setArray] = useState([]);
    const local = localhost
    useEffect(() => {
        fetch('https://'+local+'/boitier')
            .then(response => response.json())
            .then(data => setArray(data))

    }, [])
    const navigate = useNavigate();

    const ShowProduct = (id) => {
        navigate("/boitier/" + id);
    };

    return (

        <div>
            <Nav />
            {
                array.map((itme) => {
                    return (
                        <div className="item" key={itme.id} onClick={() => ShowProduct(itme.id)}>
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