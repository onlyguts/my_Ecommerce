import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./productBoitier.css";
import Nav from "../Nav";
import PhotoBoitier from '../assets/boitie.png'
import StarProduit from '../assets/star-produit.svg'
import WrenchCreate from '../assets/wrench-create.svg'
import MSILogo from '../assets/MSI-removebg-preview.png'
import NvidiaLogo from '../assets/nvidia-removebg-preview.png'
import ChevronDown from '../assets/chevron_down.svg'
import BuyingCart from '../assets/cart.svg'
import ChevronRight from '../assets/chevron-right.svg'
import PhotoSpecs from '../assets/Specs.png'

import Header from '../Nav';


function ProduitDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const Categorie = localStorage.getItem('categorie');
  const Login = localStorage.getItem('users');
  const loginUser = JSON.parse(Login);
  const [avis, setAvis] = useState([]);
  const [avissend, setAvisSend] = useState([]);
  const [moyenne, setMoyenne] = useState(0);
  const [nbavis, setNbAvis] = useState(0);
  const [email, setEmail] = useState();
  useEffect(() => {
    fetch(`https://localhost:8000/produit/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduit(data);
        setLoad(true);
      })
      .catch(error => console.error('Erreur:', error));
  }, [id]);

  useEffect(() => {
    fetch(`https://localhost:8000/avis/${id}`)
      .then(response => response.json())
      .then(data => {
        setAvis(data)
        const totalavis = data.reduce((sum, avis) => sum + avis.rate, 0);
        const moyenne = data.length > 0 ? totalavis / data.length : 0;
        setMoyenne(moyenne);
        setNbAvis(data.length)
      })
      .catch(error => console.error('Erreur:', error));
  }, [id]);

  useEffect(() => {
    if (load) {
      fetch(`https://localhost:8000/produit/updateView/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ views: 1 }),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erreur:', error));
    }
  }, [id, load]);

  const Debut = () => {
    navigate("/")
  }


  const Mid = (id) => {
    navigate("/produits/" + id)
  }
  const End = (id) => {
    navigate("/produit/" + id)
  }

  const EditerProduits = (id) => {
    navigate("../admin/list/produit/" + id)
  }


  const AvisSet = (e) => {
    const users = localStorage.getItem('users');
    const id_user = JSON.parse(users)

    setAvisSend(backData => ({
      ...backData,
      id_user: id_user.id,
      id_produit: id,
      rate: e.target.value,
    }));

  }

  const AvisSet_2 = (e) => {
    const users = localStorage.getItem('users');
    const id_user = JSON.parse(users)
    setAvisSend(backData => ({
      ...backData,
      id_user: id_user.id,
      id_produit: id,
      description: e.target.value,
    }));

  }

  const EnvoyerAvis = () => {
    console.log('envhyer')
    fetch("https://localhost:8000/avis/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avissend),
    })

      .then(response => {
        response.json();
        alert('Produit Ajouter');
        ;
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
  }

  const writeEmail = (e) => {
    setEmail(e.target.value)
  }

  const sendAlert = () => {
    const userInfos = {
      id_produit: produit.id,
      email: email,
    };
    fetch("https://localhost:8000/email/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfos),
    })

      .then(response => {
        response.json();
        alert('Email ajoutée');
        console.log(userInfos);
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
  }

  return (
    // <div>   
    //   {produit ? (
    //     <div>
    //  <h1><button onClick={() => Debut()}>Categorie</button>/<button onClick={() => Mid(produit.idCategorie)}>{Categorie}</button>/<button onClick={() => End(produit.id)}>{produit.name}</button></h1>
    //       <h2>{produit.name}</h2>
    //       <p>Nom du produits: {produit.name}</p>
    //       <p>Vue : {produit.views}</p>
    //       {produit.stock === 0 ? (
    //         <p>Rupture de stock</p>
    //       ) : (
    //         <p>Disponnible : {produit.stock}</p>
    //       )}
    //     </div>
    // ) : (
    //   <p>Produit non trouvé</p>
    // )}
    // </div>
    <div>
      <Header />
      <div className="product-boitier">
        {produit ? (
          <div className="div">
            <h1><button onClick={() => Debut()}>Home</button>/<button onClick={() => Mid(produit.idCategorie)}>{Categorie}</button>/<button onClick={() => End(produit.id)}>{produit.name}</button></h1>

            {/*Product Section*/}
            <div className="prodcut-section">
              {loginUser && (
                loginUser.groupe === 1 ? (
                  <button className="menu-btn" onClick={() => EditerProduits(produit.id)}>Editer le produit</button>
                ) : (
                  <p></p>
                )
              )}
              <div className="product">
                <p className="p">{produit.name}</p>
                <div className="picture">
                  <img className="boitier" alt="photo Boitier" src={produit.image} />
                </div>
              </div>
              <div className="stars">
                <div className="texte-avis-client">{nbavis} avis client</div>

                {moyenne >= 0 && (
                  <>
                    <img className="star" alt="Star" src={StarProduit} />
                  </>
                )}


                {moyenne >= 2 && (
                  <>
                    <img className="star" alt="Star" src={StarProduit} />
                    <img className="img" alt="Star" src={StarProduit} />
                  </>
                )}

                {moyenne >= 3 && (
                  <>
                    <img className="star" alt="Star" src={StarProduit} />
                    <img className="img" alt="Star" src={StarProduit} />
                    <img className="star-2" alt="Star" src={StarProduit} />
                  </>
                )}


                {moyenne >= 4 && (
                  <>
                    <img className="star" alt="Star" src={StarProduit} />
                    <img className="img" alt="Star" src={StarProduit} />
                    <img className="star-2" alt="Star" src={StarProduit} />
                    <img className="star-3" alt="Star" src={StarProduit} />
                  </>
                )}



                {moyenne >= 5 && (
                  <>
                    <img className="star" alt="Star" src={StarProduit} />
                    <img className="img" alt="Star" src={StarProduit} />
                    <img className="star-2" alt="Star" src={StarProduit} />
                    <img className="star-3" alt="Star" src={StarProduit} />
                    <img className="star-4" alt="Star" src={StarProduit} />
                  </>
                )}
              </div>
              <p className="descripion-produits">
                vue sur le produit: {produit.views}
              </p>
              <div className="button-create">
                <p className="texte-create">CREER UN PC AVEC CE PRODUIT</p>
                <img className="icone-create" alt="Icone create" src={WrenchCreate} />
              </div>
              <div className="marques-produits">
                <img className="Marque_Logo1" alt="Msi removebg preview" src={MSILogo} />
                <img className="Marque_Logo2" alt="Nvidia removebg" src={NvidiaLogo} />
              </div>
              <div className="price-section">
                {produit.promo != 0
                  ? <div className="price-product">En promo : {produit.prix * (1 - produit.promo / 100)} €</div>
                  : <div className="price-product">{produit.prix} €</div>
                }
                <div className="multiple-payement">
                  <div className="overlap-group">
                    <div className="mulitple-payment">
                      <div className="title-frais">dont 1.05€ de frais</div>
                      <p className="prix-x-fois">
                        <span className="span">{Math.round(produit.prix / 3) + 1.05}€</span>
                        <span className="text-wrapper-6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="text-wrapper-7">X 3</span>
                      </p>
                    </div>
                    <div className="multiple-payment">
                      <div className="multiple-payment-2">Multiple Payment</div>
                    </div>
                  </div>
                </div>
                <div className="quantity">
                  <div className="quantity-selector">
                    <img className="quantity-dropdown" alt="Quantity dropdown" src={ChevronDown} />
                    <div className="quantity-number">1</div>
                  </div>
                  <div className="title-quantity">QUANTITE</div>
                </div>
                <div className="add-basket-button">
                  <img className="add-basket-icon" alt="Add basket icon" src={BuyingCart} />
                  <div className="add-basket-title">AJOUTER AU PANIER</div>
                </div>
                <div className="buy-now-button">
                  <div className="buy-now-title">ACHETER MAINTENANT</div>
                  <img className="buy-now-icon" alt="Buy now icon" src={ChevronRight} />
                </div>
                <div className="stock">
                  {produit.stock === 0 ? (
                    <div><div className="text-wrapper-5">OUT OF STOCK</div>
                      <form>
                        <input type="email" placeholder='votre adresse e-mail' onChange={(e) => writeEmail(e)}></input>
                      </form>
                      <button type="submit" onClick={() => sendAlert()}>Envoyer</button>
                    </div>
                  ) : (
                    <div className="text-wrapper-4">EN STOCK<br />Disponnible : {produit.stock}</div>
                  )}
                </div>

              </div>
            </div>
            <div>


            </div>

          </div>

        ) : (
          <p>Produit non trouvé</p>
        )}
        <form>
          <input type='text' onChange={(e) => AvisSet_2(e)}></input>
          <input type='number' max='5' onChange={(e) => AvisSet(e)}></input>
          <button type='submit' onClick={() => EnvoyerAvis()}>envoyer</button>
        </form>
        {avis.map((produit) => (

          <div key={produit.id}>

            <span>{produit.username} | {produit.rate} | {produit.description} </span>
          </div>

        ))}
      </div>
    </div>
  );
}

export default ProduitDetail;
