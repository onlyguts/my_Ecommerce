import React from 'react'
import AdminCss from './Admin.css'
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
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
                    <a href="#">
                        <img src="https://img.icons8.com/ios/50/null/shopping-cart.png" alt="Dashboard icon" />
                        Change Password
                    </a>
                    <a href="#">
                        <img src="https://img.icons8.com/ios/50/null/shopping-cart.png" alt="Dashboard icon" />
                        Edit Profile
                    </a>
                    <a href="#">
                        <img src="https://img.icons8.com/ios/50/null/shopping-cart.png" alt="Dashboard icon" />
                        Notification Settings
                    </a>
                    <a href="#">
                        <img src="https://img.icons8.com/ios/50/null/shopping-cart.png" alt="Dashboard icon" />
                        Logout
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
            <h1>Dashboard</h1>

            <div class="buttons-container">
                <button class="button">Button 1</button>
                <button class="button">Button 2</button>
                <button class="button">Button 3</button>

            </div>

            <div class="graph-container">
                <h2>Graphique 1</h2>
                <canvas id="graph1"></canvas>
            </div>

            <div class="graph-container">
                <h2>Graphique 2</h2>
                <canvas id="graph2"></canvas>
            </div>

            <div class="graph-container">
                <h2>Graphique 3</h2>
                <canvas id="graph3"></canvas>
            </div>

            <div class="version-list">
                <h2>Historique des versions</h2>
                <ul>
                    <li>Version 1.0 - Date de sortie: 01/01/2022</li>
                    <li>Version 1.1 - Date de sortie: 15/02/2022</li>
                    <li>Version 1.2 - Date de sortie: 31/03/2022</li>
                    <li>Version 1.3 - Date de sortie: 15/05/2022</li>
                    <li>Version 1.4 - Date de sortie: 30/06/2022</li>
                </ul>
            </div>

        </div>

        <script src="script.js"></script>
    </div>

  )
}

export default Admin