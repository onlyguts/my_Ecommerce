

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './App/PanelAdmin/admin_create_produits'
import AdminList from './App/PanelAdmin/admin_liste_produits'
import AdminListC from './App/PanelAdmin/admin_liste_categroie'
import AdminCat from './App/PanelAdmin/admin_create_categorie'
import AdminListId from './App/PanelAdmin/admin_update_produit'
import AdminListIdAvis from './App/PanelAdmin/admin_avis_produits'
import AdminListIdC from './App/PanelAdmin/admin_update_categorie'
import Homes from './App/Homes'
import ProduitsList from './App/produits/liste_porduits'

import Build from './App/produits/Algo'

import ProduitList from './App/produits/page_produit'

import ProduitsAll from './App/produits/recherche_produits'

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
                <Route path="/admin/list/produit/avis/:id" element={<AdminListIdAvis />}></Route>
                <Route path="/admin/listc/categorie/:id" element={<AdminListIdC />}></Route>
        
               
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
