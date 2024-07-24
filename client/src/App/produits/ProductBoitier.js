import React from "react";
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

export const ProductBoitier = () => {
    return (
        <div className="product-boitier">
            <div className="div">
                {/*Product Section*/}
                <div className="prodcut-section">
                    <div className="product">
                        <p className="p">Zalman i3 Neo Black</p>
                        <div className="picture">
                            <img className="boitier" alt="photo Boitier" src={ PhotoBoitier }/>
                        </div>
                    </div>
                    <div className="stars">
                        <div className="texte-avis-client">23 avis client</div>
                        <img className="star" alt="Star" src={ StarProduit }/>
                        <img className="img" alt="Star" src={ StarProduit }/>
                        <img className="star-2" alt="Star" src={ StarProduit }/>
                        <img className="star-3" alt="Star" src={ StarProduit }/>
                        <img className="star-4" alt="Star" src={ StarProduit }/>
                    </div>
                    <p className="descripion-produits">
                        Le boîtier Zalman i3 Neo Black va pouvoir accueillir une configuration ATX,
                        Micro-ATX ou Mini-ITX avec une carte graphique de 355 mm de long.
                        Ce boîtier moyen tour avec fenêtre en verre trempé sera un achat idéal pour assembler une configuration performante,
                        axée vers le jeu et le multimédia.
                    </p>
                    <div className="button-create">
                        <p className="texte-create">CREER UN PC AVEC CE PRODUIT</p>
                        <img className="icone-create" alt="Icone create" src={ WrenchCreate }/>
                    </div>
                    <div className="marques-produits">
                        <img className="Marque_Logo1" alt="Msi removebg preview" src={ MSILogo }/>
                        <img className="Marque_Logo2" alt="Nvidia removebg" src={ NvidiaLogo }/>
                    </div>
                    <div className="price-section">
                        <div className="price-product">59.95 €</div>
                        <div className="multiple-payement">
                            <div className="overlap-group">
                                <div className="mulitple-payment">
                                    <div className="title-frais">dont 1.05€ de frais</div>
                                    <p className="prix-x-fois">
                                        <span className="span">20.3€</span>
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
                                <img className="quantity-dropdown" alt="Quantity dropdown" src={ ChevronDown }/>
                                <div className="quantity-number">1</div>
                            </div>
                            <div className="title-quantity">QUANTITE</div>
                        </div>
                        <div className="add-basket-button">
                            <img className="add-basket-icon" alt="Add basket icon" src={ BuyingCart }/>
                            <div className="add-basket-title">AJOUTER AU PANIER</div>
                        </div>
                        <div className="buy-now-button">
                            <div className="buy-now-title">ACHETER MAINTENANT</div>
                            <img className="buy-now-icon" alt="Buy now icon" src={ ChevronRight }/>
                        </div>
                        <div className="stock">
                            <div className="text-wrapper-4">EN STOCK</div>
                            {/*<div className="text-wrapper-5">OUT OF STOCK</div>*/}
                        </div>
                    </div>
                </div>
                {/* <img src={ PhotoSpecs } alt='Specs' className='specs-img'/> */}
                {/*<div className="specs">*/}
                {/*    <div className="header-specs">*/}
                {/*        <div className="avis-section">*/}
                {/*            <div className="avis-title">AVIS CLIENT</div>*/}
                {/*        </div>*/}
                {/*        <div className="produits-associ">*/}
                {/*            <div className="asso-produits-title">PRODUITS ASSOCIE</div>*/}
                {/*        </div>*/}
                {/*        <div className="fiche-technique">*/}
                {/*            <div className="fiche-tech-title">FICHE TECHNIQUE</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="specs-sections">*/}
                {/*        <div className="info-general">*/}
                {/*            <div className="title-specs">*/}
                {/*                <div className="text-wrapper-3">INFORMATIONS GÉNÉRALES</div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-category">*/}
                {/*                <div className="category-3">*/}
                {/*                    <div className="text-wrapper-2">Désignation</div>*/}
                {/*                </div>*/}
                {/*                <div className="category-2">*/}
                {/*                    <div className="text-wrapper-2">Marque</div>*/}
                {/*                </div>*/}
                {/*                <div className="category">*/}
                {/*                    <div className="text-wrapper-2">Modèle</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-description">*/}
                {/*                <div className="description-2">*/}
                {/*                    <p className="text-wrapper">Zalman i3 Neo Black</p>*/}
                {/*                </div>*/}
                {/*                <div className="div-wrapper">*/}
                {/*                    <div className="text-wrapper">Zalman</div>*/}
                {/*                </div>*/}
                {/*                <div className="description">*/}
                {/*                    <p className="text-wrapper">I3 NEO BLACK</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="info-general">*/}
                {/*            <div className="title-specs">*/}
                {/*                <div className="text-wrapper-3">INFORMATIONS GÉNÉRALES</div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-category">*/}
                {/*                <div className="category-3">*/}
                {/*                    <div className="text-wrapper-2">Désignation</div>*/}
                {/*                </div>*/}
                {/*                <div className="category-2">*/}
                {/*                    <div className="text-wrapper-2">Marque</div>*/}
                {/*                </div>*/}
                {/*                <div className="category">*/}
                {/*                    <div className="text-wrapper-2">Modèle</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-description">*/}
                {/*                <div className="description-2">*/}
                {/*                    <p className="text-wrapper">Zalman i3 Neo Black</p>*/}
                {/*                </div>*/}
                {/*                <div className="div-wrapper">*/}
                {/*                    <div className="text-wrapper">Zalman</div>*/}
                {/*                </div>*/}
                {/*                <div className="description">*/}
                {/*                    <p className="text-wrapper">I3 NEO BLACK</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="info-general">*/}
                {/*            <div className="title-specs">*/}
                {/*                <div className="text-wrapper-3">INFORMATIONS GÉNÉRALES</div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-category">*/}
                {/*                <div className="category-3">*/}
                {/*                    <div className="text-wrapper-2">Désignation</div>*/}
                {/*                </div>*/}
                {/*                <div className="category-2">*/}
                {/*                    <div className="text-wrapper-2">Marque</div>*/}
                {/*                </div>*/}
                {/*                <div className="category">*/}
                {/*                    <div className="text-wrapper-2">Modèle</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-description">*/}
                {/*                <div className="description-2">*/}
                {/*                    <p className="text-wrapper">Zalman i3 Neo Black</p>*/}
                {/*                </div>*/}
                {/*                <div className="div-wrapper">*/}
                {/*                    <div className="text-wrapper">Zalman</div>*/}
                {/*                </div>*/}
                {/*                <div className="description">*/}
                {/*                    <p className="text-wrapper">I3 NEO BLACK</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="info-general">*/}
                {/*            <div className="title-specs">*/}
                {/*                <div className="text-wrapper-3">INFORMATIONS GÉNÉRALES</div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-category">*/}
                {/*                <div className="category-3">*/}
                {/*                    <div className="text-wrapper-2">Désignation</div>*/}
                {/*                </div>*/}
                {/*                <div className="category-2">*/}
                {/*                    <div className="text-wrapper-2">Marque</div>*/}
                {/*                </div>*/}
                {/*                <div className="category">*/}
                {/*                    <div className="text-wrapper-2">Modèle</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-description">*/}
                {/*                <div className="description-2">*/}
                {/*                    <p className="text-wrapper">Zalman i3 Neo Black</p>*/}
                {/*                </div>*/}
                {/*                <div className="div-wrapper">*/}
                {/*                    <div className="text-wrapper">Zalman</div>*/}
                {/*                </div>*/}
                {/*                <div className="description">*/}
                {/*                    <p className="text-wrapper">I3 NEO BLACK</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="info-general">*/}
                {/*            <div className="title-specs">*/}
                {/*                <div className="text-wrapper-3">INFORMATIONS GÉNÉRALES</div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-category">*/}
                {/*                <div className="category-3">*/}
                {/*                    <div className="text-wrapper-2">Désignation</div>*/}
                {/*                </div>*/}
                {/*                <div className="category-2">*/}
                {/*                    <div className="text-wrapper-2">Marque</div>*/}
                {/*                </div>*/}
                {/*                <div className="category">*/}
                {/*                    <div className="text-wrapper-2">Modèle</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-description">*/}
                {/*                <div className="description-2">*/}
                {/*                    <p className="text-wrapper">Zalman i3 Neo Black</p>*/}
                {/*                </div>*/}
                {/*                <div className="div-wrapper">*/}
                {/*                    <div className="text-wrapper">Zalman</div>*/}
                {/*                </div>*/}
                {/*                <div className="description">*/}
                {/*                    <p className="text-wrapper">I3 NEO BLACK</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="info-general">*/}
                {/*            <div className="title-specs">*/}
                {/*                <div className="text-wrapper-3">INFORMATIONS GÉNÉRALES</div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-category">*/}
                {/*                <div className="category-3">*/}
                {/*                    <div className="text-wrapper-2">Désignation</div>*/}
                {/*                </div>*/}
                {/*                <div className="category-2">*/}
                {/*                    <div className="text-wrapper-2">Marque</div>*/}
                {/*                </div>*/}
                {/*                <div className="category">*/}
                {/*                    <div className="text-wrapper-2">Modèle</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="specs-description">*/}
                {/*                <div className="description-2">*/}
                {/*                    <p className="text-wrapper">Zalman i3 Neo Black</p>*/}
                {/*                </div>*/}
                {/*                <div className="div-wrapper">*/}
                {/*                    <div className="text-wrapper">Zalman</div>*/}
                {/*                </div>*/}
                {/*                <div className="description">*/}
                {/*                    <p className="text-wrapper">I3 NEO BLACK</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default ProductBoitier