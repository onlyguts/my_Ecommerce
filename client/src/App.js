

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './Admin/Admin'
import Homes from './App/Homes'
import Boitier from './App/produits/Boitier'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homes />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/boitier" element={<Boitier />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
