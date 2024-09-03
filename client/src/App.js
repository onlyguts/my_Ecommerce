

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './App/PanelAdmin/admin_create_produits'
import AdminList from './App/PanelAdmin/admin_liste_produits'
import AdminListC from './App/PanelAdmin/admin_liste_categroie'
import AdminListP from './App/PanelAdmin/admin_liste_promo'
import AdminListPF from './App/PanelAdmin/admin_liste_pays'

import AdminCat from './App/PanelAdmin/admin_create_categorie'
import AdminPromo from './App/PanelAdmin/admin_create_promo'
import AdminListId from './App/PanelAdmin/admin_update_produit'
import AdminListIdP from './App/PanelAdmin/admin_update_promo'
import Adminupdatepays from './App/PanelAdmin/admin_update_pays'
import AdminListIdAvis from './App/PanelAdmin/admin_avis_produits'
import AdminListIdC from './App/PanelAdmin/admin_update_categorie'
import Adminemail from './App/PanelAdmin/admin_email'
import Admindash from './App/PanelAdmin/admin_dashboard'

// import Pro from './App/produits/produits'
import Homes from './App/Homes'
import ProduitsList from './App/produits/liste_porduits'

import Build from './App/produits/Algo'
import Panier from './App/user/Panier'
import Profil from './App/user/Profil'
import ProduitList from './App/produits/page_produit'

import Conf from './App/user/Confirmation'

import Commande from './App/user/Commande'

import Nv from './App/produits/nouveauter_produits'

import ProduitsAll from './App/produits/recherche_produits'
import Promo from './App/produits/promotions_produits'
import Login from './App/Login/Login'
import Register from './App/Login/Register'
import Password from './App/Login/Password'
import NewPassword from './App/Login/NewPassword'




function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homes />}></Route>
                {/* <Route path="/test/:id" element={<Pro />}></Route> */}
                <Route path="/nouveauter" element={<Nv />}></Route>

                <Route path="/promotions" element={<Promo />}></Route>
                <Route path="/panier" element={<Panier />}></Route>
                <Route path="/build" element={<Build />}></Route>
              

                <Route path="/admin" element={<Admindash />}></Route>
                <Route path="/admin/add" element={<Admin />}></Route>
                <Route path="/admin/list" element={<AdminList />}></Route>
                <Route path="/admin/email" element={<Adminemail />}></Route>
                
                <Route path="/admin/listc" element={<AdminListC />}></Route>
                <Route path="/admin/listp" element={<AdminListP />}></Route>
                <Route path="/admin/listpf" element={<AdminListPF />}></Route>
                <Route path="/admin/addc" element={<AdminCat />}></Route>
                <Route path="/admin/addp" element={<AdminPromo />}></Route>
                <Route path="/admin/list/produit/:id" element={<AdminListId />}></Route>
                <Route path="/admin/listp/promo/:id" element={<AdminListIdP />}></Route>
                <Route path="/admin/list/produit/avis/:id" element={<AdminListIdAvis />}></Route>
                <Route path="/admin/listc/categorie/:id" element={<AdminListIdC />}></Route>
               
                <Route path="/admin/listpf/pays/:id" element={<Adminupdatepays />}></Route>

                <Route path="/produits/all/:id" element={<ProduitsAll />}></Route>
                <Route path="/produits/:id" element={<ProduitsList />}></Route>
                <Route path="/produit/:id" element={<ProduitList />}></Route>
             
                <Route path="/password" element={<Password />}></Route>
                <Route path="/confirmation/:token" element={<Conf />}></Route>
                <Route path="/changepassword/:token" element={<NewPassword />}></Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/Register" element={<Register />}></Route>

                <Route path="/profil" element={<Profil />}></Route>
                <Route path="/profil/commande/:id/:commande" element={<Commande />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
