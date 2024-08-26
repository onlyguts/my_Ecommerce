import React, { useState, useEffect } from 'react';
import Nav from './../Nav';

function Algo() {
  const [produits, setProduits] = useState([]);
  const [boitiers, setBoitiers] = useState([]);
  const [carte, setCarte] = useState([]);
  const [cpu, setCPU] = useState([]);
  const [ram, setRAM] = useState([]);
  const [ssd, setSSD] = useState([]);
  const [gpu, setGPU] = useState([]);
  const [aio, setAIO] = useState([]);
  const [alim, setALIM] = useState([]);

  const [finish, setFinish] = useState('')

  const [panierWait, setPanierWait] = useState([]);
  const [step, setStep] = useState(0);

  const [taille, setTaille] = useState('');
  const [type, setType] = useState('');
  const [ramType, setRamType] = useState('');

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

  const NextStepRAM = (socket) => {
    fetch("https://localhost:8000/produits")
      .then(response => response.json())
      .then(data => {
        const filteBoitiers = data.filter(element => element.id_categorie === 5 && element.socket === ramType);
        setRAM(filteBoitiers);
      })
      .catch(error => console.error('Erreur: ', error));
  }


  const NextStepSSD = () => {
    fetch("https://localhost:8000/produits")
      .then(response => response.json())
      .then(data => {
        const filteBoitiers = data.filter(element => element.id_categorie === 7);
        setSSD(filteBoitiers);
      })
      .catch(error => console.error('Erreur: ', error));
  }

  const NextStepGPU = () => {
    fetch("https://localhost:8000/produits")
      .then(response => response.json())
      .then(data => {
        const filteBoitiers = data.filter(element => element.id_categorie === 3);
        setGPU(filteBoitiers);
      })
      .catch(error => console.error('Erreur: ', error));
  }

  const NextStepAIO = () => {
    fetch("https://localhost:8000/produits")
      .then(response => response.json())
      .then(data => {
        const filteBoitiers = data.filter(element => element.id_categorie === 10);
        setAIO(filteBoitiers);
      })
      .catch(error => console.error('Erreur: ', error));
  }

  const NextStepAlim = () => {
    fetch("https://localhost:8000/produits")
      .then(response => response.json())
      .then(data => {
        const filteBoitiers = data.filter(element => element.id_categorie === 6);
        setALIM(filteBoitiers);
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
    setRamType(porduitAdd.socket)
    setStep(3)
    NextStepCPU(porduitAdd.typec)

  }

  const Choose3 = (e) => {
    const porduitAdd = JSON.parse(e.target.value)
    setPanierWait({
      ...panierWait,
      [e.target.name]: porduitAdd
    });

    setStep(4)
    NextStepRAM(porduitAdd.socket)
  }

  const Choose4 = (e) => {
    const porduitAdd = JSON.parse(e.target.value)
    setPanierWait({
      ...panierWait,
      [e.target.name]: porduitAdd
    });
    setStep(5)
    NextStepSSD()
  }

  const Choose5 = (e) => {
    const porduitAdd = JSON.parse(e.target.value)
    setPanierWait({
      ...panierWait,
      [e.target.name]: porduitAdd
    });
    setStep(6)
    NextStepGPU()
  }

  const Choose6 = (e) => {
    const porduitAdd = JSON.parse(e.target.value)
    setPanierWait({
      ...panierWait,
      [e.target.name]: porduitAdd
    });
    setStep(7)
    NextStepAIO()
  }

  const Choose7 = (e) => {
    const porduitAdd = JSON.parse(e.target.value)
    setPanierWait({
      ...panierWait,
      [e.target.name]: porduitAdd
    });
    setStep(8)
    NextStepAlim()
  }

  const ChooseFinish = () => {
    setFinish('PCfini')
    setStep(9)
  }

  const StartPc = () => {
    setStep(1)
  }

  return (
    <div>
      <Nav />
      <div>
        {Object.values(panierWait).map((boitier, index) => (
          <li key={index}>
            {boitier.name}
          </li>
        ))}
        {step === 0 && (
          <button onClick={() => StartPc()}>Commencer</button>
        )}
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
                {boitier.name} (Format: {boitier.type}) <button value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose3(e)}>+</button>
              </li>
            ))}
          </ul>
        )}
        {step === 4 && (
          <ul>
            <h2>Liste des CPU Disponibles :</h2>
            {ram.map((boitier, index) => (
              <li key={index}>
                {boitier.name} (Format: {boitier.type}) <button value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose4(e)}>+</button>
              </li>
            ))}
          </ul>
        )}

        {step === 5 && (
          <ul>
            <h2>Liste des CPU Disponibles :</h2>
            {ssd.map((boitier, index) => (
              <li key={index}>
                {boitier.name} (Format: {boitier.type}) <button value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose5(e)}>+</button>
              </li>
            ))}
          </ul>
        )}

        {step === 6 && (
          <ul>
            <h2>Liste des CPU Disponibles :</h2>
            {gpu.map((boitier, index) => (
              <li key={index}>
                {boitier.name} (Format: {boitier.type}) <button value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose6(e)}>+</button>
              </li>
            ))}
          </ul>
        )}

        {step === 7 && (
          <ul>
            <h2>Liste des CPU Disponibles :</h2>
            {aio.map((boitier, index) => (
              <li key={index}>
                {boitier.name} (Format: {boitier.type}) <button value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose7(e)}>+</button>
              </li>
            ))}
          </ul>
        )}
        {step === 8 && (
          <ul>
            <h2>Liste des CPU Disponibles :</h2>
            {alim.map((boitier, index) => (
              <li key={index}>
                {boitier.name} (Format: {boitier.type}) <button value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => ChooseFinish(e)}>+</button>
              </li>
            ))}
          </ul>
        )}
         {step === 9 && (
          <div>
          {finish}
          </div>
        )}
      </div>
    </div>
  );
}

export default Algo;
