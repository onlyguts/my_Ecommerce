

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './Admin/Admin'
import Homes from './App/Homes'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homes />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
            
            </Routes>
        </BrowserRouter>
    )
}

export default App
