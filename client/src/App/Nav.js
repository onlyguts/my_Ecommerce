import React from 'react'
import { useNavigate } from "react-router-dom";
function Nav() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/admin");
    }
    return (
        <nav>
            <ul>
                <li><a href="test">Tout Nos Produits</a></li>
                <li><a href="test">Carte graphique</a></li>
                <li><a href="test">Processeur</a></li>
                <li><a href="test">Carte Mère</a></li>
                <li><a href="test">Barrette RAM</a></li>
                <li><a href="test">Stockage</a></li>
                <li><a href="test">Boîtier</a></li>
                <li><a onClick={handleClick}>Panel Admin</a></li>
            </ul>
        </nav>
    );
}

export default Nav