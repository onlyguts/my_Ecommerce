import React, { useState, useEffect } from 'react';
import AdminCss from './Admin.css'
import { useNavigate } from "react-router-dom";
import localhost from '../Config';
function Admin() {
    const [change, setChange] = useState('');
    const navigate = useNavigate();


    const handleClick = () => {
        navigate("/");
    }

    const Boitier = () => {
        setChange('boitier')
    }
    return (

        <div class="container">
            <div class="sidebar">
                <a onClick={handleClick} class="menu-home">
                    <img src="https://img.icons8.com/ios/50/null/home.png" alt="Dashboard icon" />
                </a>
                <details>
                    <summary>
                        <img src="https://img.icons8.com/ios/50/null/user.png" alt="User icon" />
                        Users
                    </summary>
                    <div class="container-div">
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/user.png" alt="Dashboard icon" />
                            List All Users

                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/user.png" alt="Dashboard icon" />
                            Group Users
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/user.png" alt="Dashboard icon" />
                            Create a User
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/user.png" alt="Dashboard icon" />
                            Delete a User
                        </a>
                    </div>
                </details>
                <details>
                    <summary>
                        <img src="https://img.icons8.com/ios/50/null/shopping-cart.png" alt="User icon" />
                        Shop

                    </summary>
                    <div class="container-div">
                        <a onClick={Boitier}>
                            <img src="https://img.icons8.com/ios/50/null/shopping-cart.png" alt="Dashboard icon" />
                            Boitier
                        </a>

                    </div>
                </details>
                <details>
                    <summary>
                        <img src="https://img.icons8.com/ios/50/null/data-configuration.png" alt="User icon" />
                        Data
                    </summary>
                    <div class="container-div">
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/data-configuration.png" alt="Dashboard icon" />
                            Change Password
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/data-configuration.png" alt="Dashboard icon" />
                            Edit Profile
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/data-configuration.png" alt="Dashboard icon" />
                            Notification Settings
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/data-configuration.png" alt="Dashboard icon" />
                            Logout
                        </a>
                    </div>
                </details>
                <details>
                    <summary>
                        <img src="https://img.icons8.com/ios/50/null/user-shield.png" alt="User icon" />
                        Admin
                    </summary>
                    <div class="container-div">
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/user-shield.png" alt="Dashboard icon" />
                            Change Password
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/user-shield.png" alt="Dashboard icon" />
                            Edit Profile
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/user-shield.png" alt="Dashboard icon" />
                            Notification Settings
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/user-shield.png" alt="Dashboard icon" />
                            Logout
                        </a>
                    </div>
                </details>
                <details>
                    <summary>
                        <img src="https://img.icons8.com/ios/50/null/log.png" alt="User icon" />
                        Log
                    </summary>
                    <div class="container-div">
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/log.png" alt="Dashboard icon" />
                            Change Password
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/log.png" alt="Dashboard icon" />
                            Edit Profile
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/log.png" alt="Dashboard icon" />
                            Notification Settings
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/log.png" alt="Dashboard icon" />
                            Logout
                        </a>
                    </div>
                </details>

                <details>
                    <summary>
                        <img src="https://img.icons8.com/ios/50/null/settings.png" alt="User icon" />
                        Settings
                    </summary>
                    <div class="container-div">
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/settings.png" alt="Dashboard icon" />
                            Change Password
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/settings.png" alt="Dashboard icon" />
                            Edit Profile
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/settings.png" alt="Dashboard icon" />
                            Notification Settings
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios/50/null/settings.png" alt="Dashboard icon" />
                            Logout
                        </a>
                    </div>
                </details>
            </div>

            <div class="main">
                {change !== 'boitier'
                ? <p>DashBoard</p>
                :   <Lisst />
                }
                {/* {change !== 'boitier'
                ? <p>DashBoard</p>
                :   <Lisst />
                } */}
            
            </div>

            <script src="script.js"></script>
        </div>

    )
}


function Lisst() {
    const [array, setArray] = useState([]);
    const local = localhost

    useEffect(() => {
        fetch('https://' + local + '/boitier')
            .then(response => response.json())
            .then(data => setArray(data))

    }, [])
    
    function Deleted(id) {
        const local = localhost
    
      
          fetch("https://"+local+"/boitier/delete/" + id)
            .then(response => response.json())
            .then(data => console.log(data))
      
 
    }

    return (
        <div>          
           <form>
            <label>designation</label>
            <input type='text'></input>
            <label>marque</label>
            <input type='text'></input>
            <label>image</label>
            <input type='text'></input>
            <button type='submit'>Ajouter</button>
           </form>
            {
                array.map((itme) => {
                    return (
                        <div  key={itme.id}>
                            <span> 
                            <p>{itme.id} | {itme.designation} | {itme.marque}</p> 
                                <button >Edit</button>
                               <button onClick={() => Deleted(itme.id)}>Supprimer</button>
                            </span>
                            {/* <img src={itme.imageUrl} alt={itme.designation} /> */}

                        </div>
                    )
                })
            }
        </div>

    )
}

export default Admin