

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './App/Admin/Admin'
import AdminList from './App/Admin/AdminList'
import AdminListC from './App/Admin/AdminListC'
import AdminCat from './App/Admin/AdminCat'
import AdminListId from './App/Admin/AdminProduit'
import AdminListIdC from './App/Admin/AdminProduitC'
import Homes from './App/Homes'
import ProduitsList from './App/produits/ProduitsList'
import Build from './App/produits/Algo'
import ProduitList from './App/produits/ProduitList'
import Produits from './App/produits/Produits'
import ProduitsAll from './App/produits/ProduitsAll'

import Login from './App/Login/Login'
import Register from './App/Login/Register'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homes />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/build" element={<Build />}></Route>
                <Route path="/admin/list" element={<AdminList />}></Route>
                <Route path="/admin/listc" element={<AdminListC />}></Route>
                <Route path="/admin/addc" element={<AdminCat />}></Route>
                <Route path="/admin/list/produit/:id" element={<AdminListId />}></Route>
                <Route path="/admin/listc/categorie/:id" element={<AdminListIdC />}></Route>
                <Route path="/produits" element={<Produits />}></Route>
                
                <Route path="/produits/all/:id" element={<ProduitsAll />}></Route>
                <Route path="/produits/:id" element={<ProduitsList />}></Route>
                <Route path="/produit/:id" element={<ProduitList />}></Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/Register" element={<Register />}></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App
