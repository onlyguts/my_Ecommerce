import React, { useState, useEffect } from 'react';
import Nav from './../Nav';

function Algo() {
  const [produits, setProduits] = useState([]);
  const [boitiers, setBoitiers] = useState([]);
  const [carte, setCarte] = useState([]);

  const [panierWait, setPanierWait] = useState([]);
  const [step, setStep] = useState(1);

  const [taille, setTaille] = useState('');

  useEffect(() => {
    fetch("https://localhost:8000/produits")
      .then(response => response.json())
      .then(data => {
        const filteBoitiers = data.filter(element => element.id_categorie === 1);
        setBoitiers(filteBoitiers);
      })
      .catch(error => console.error('Erreur: ', error));
  }, []);

    const NextStep = (tailles) => {
      fetch("https://localhost:8000/produits")
        .then(response => response.json())
        .then(data => {
          const filteBoitiers = data.filter(element => element.id_categorie === 2 && element.taille === tailles);
          setCarte(filteBoitiers);
        })
        .catch(error => console.error('Erreur: ', error));
    }

  const Choose = (e) => {
    const porduitAdd = JSON.parse(e.target.value)
    setPanierWait({
      ...panierWait,
      [e.target.name]: porduitAdd
    });
    setTaille(porduitAdd.taille)
    setStep(2)
    NextStep(porduitAdd.taille)
  }

  return (
    <div>
      <Nav />
      <div>
        {step === 1 && (
          <ul>
            <h2>Liste des Boîtiers Disponibles :</h2>
            {boitiers.map((boitier, index) => (
              <li key={index}>
                {boitier.name} (Format: {boitier.taille}) <button value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose(e)}>+</button>
              </li>
            ))}
          </ul>
        )}
         {step === 2 && (
          <ul>
            <h2>Liste des Boîtiers Disponibles :</h2>
            {carte.map((boitier, index) => (
              <li key={index}>
                {boitier.name} (Format: {boitier.taille}) <button value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose(e)}>+</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Algo;
