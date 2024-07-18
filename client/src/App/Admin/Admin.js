import React from 'react'
import AdminCss from './Admin.css'
import AdminnAV from './NavAdmin'
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();

    const change = true

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
            {change 
            ?   <AdminnAV />
            :   <p>trefe</p>

            }
        
        </div>

        <script src="script.js"></script>
    </div>

  )
}

export default Admin