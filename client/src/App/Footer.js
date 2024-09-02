import React from 'react';
import './Homes.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>QUI SOMMES NOUS ?</h3>
        <ul>
          <li>Notre Histoire</li>
          <li>CGV / Avis clients</li>
          <li>Données personnelles et Cookies</li>
          <li>Gérer mes cookies</li>
          <li>Mentions légales</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>NOUS REJOINDRE</h3>
        <ul>
          <li>Vendez sur BYP</li>
          <li>Recrutement</li>
          <li>L’École BYP</li>
          <li>Marketplace</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>BESOIN D'AIDE ?</h3>
        <ul>
          <li>Questions fréquentes</li>
          <li>Modes de livraison</li>
          <li>Modes de règlement</li>
          <li>Garanties et Pack Confort</li>
          <li>Demander un retour</li>
        </ul>
      </div>
      <div className="footer-section footer-contact">
        <h3>NOUS CONTACTER :</h3>
        <p>📞 04 27 46 60 11</p>
        <p>Appel non surtaxé</p>
        <p>Élu Service Client de l'Année 2024</p>
      </div>
      <div className="footer-bottom">
        <div>3x PAIEMENT EN 3 FOIS</div>
        <div>LIVRAISON DOM-TOM</div>
        <div>LIVRAISON EXPRESS</div>
      </div>
    </footer>
  );
}

export default Footer;