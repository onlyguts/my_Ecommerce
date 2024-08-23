import React, { useState, useEffect } from 'react';
import Nav from './../Nav';

function Algo() {
  const [produits, setProduits] = useState([]);
  const [boitiers, setBoitiers] = useState([]);
  const [carte, setCarte] = useState([]);
  const [cpu, setCPU] = useState([]);

  const [panierWait, setPanierWait] = useState([]);
  const [step, setStep] = useState(1);

  const [taille, setTaille] = useState('');
  const [type, setType] = useState('');

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

    const NextStepCPU = (type) => {
      fetch("https://localhost:8000/produits")
        .then(response => response.json())
        .then(data => {
          const filteBoitiers = data.filter(element => element.id_categorie === 4 && element.typec === type);
          setCPU(filteBoitiers);
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

  const Choose2 = (e) => {
    const porduitAdd = JSON.parse(e.target.value)
    setPanierWait({
      ...panierWait,
      [e.target.name]: porduitAdd
    });
    setType(porduitAdd.typec)
    setStep(3)
    NextStepCPU(porduitAdd.typec)
  }
console.log(panierWait)

  return (
    <div>
      <Nav />
      <div>
         {Object.values(panierWait).map((boitier, index) => (
              <li key={index}>
                {boitier.name} 
              </li>
            ))}
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
            <h2>Liste des Carte Mere Disponibles :</h2>
            {carte.map((boitier, index) => (
              <li key={index}>
                {boitier.name} (Format: {boitier.typec}) <button value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose2(e)}>+</button>
              </li>
            ))}
          </ul>
        )}
         {step === 3 && (
          <ul>
            <h2>Liste des CPU Disponibles :</h2>
            {cpu.map((boitier, index) => (
              <li key={index}>
                {boitier.name} (Format: {boitier.type}) <button value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose2(e)}>+</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Algo;
