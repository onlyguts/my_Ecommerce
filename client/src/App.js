

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './App/Admin/Admin'
import Homes from './App/Homes'
import Boitier from './App/produits/Boitier'
import BoitierId from './App/produits/BoitierId'

import Login from './App/Login/Login'
import Register from './App/Login/Register'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homes />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/boitier" element={<Boitier />}></Route>
                <Route path="/boitier/:id" element={<BoitierId />}></Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/Register" element={<Register />}></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App
