import React, { useState, useEffect } from 'react';
import Nav from './../Nav';
import './Algo.css';

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

  const ChooseFinish = (e) => {
    const porduitAdd = JSON.parse(e.target.value)
    setPanierWait({
      ...panierWait,
      [e.target.name]: porduitAdd
    });
    setFinish('PCfini')
    setStep(9)
  }

  const StartPc = () => {
    setStep(1)
  }

  const AjouterPanier = () => {
    console.log(panierWait)
    const Login = localStorage.getItem('users');
    const UserAccount = localStorage.getItem('user_no_account');
    const loginUser = JSON.parse(Login);

    for (const id in panierWait) {
      if (panierWait.hasOwnProperty(id)) {
        console.log(panierWait[id].image);
        let userInfos = {}

        if (!loginUser) {
          userInfos = {
            id_produit: id,
            id_user: UserAccount,
            price_type: 0,
            image_type: panierWait[id].image,
            info: 'null',
          };
        } else {
          userInfos = {
            id_produit: id,
            id_user: loginUser.id,
            price_type: 0,
            image_type: panierWait[id].image,
            info: 'null',
          };
        }


        console.log(userInfos);

        fetch("https://localhost:8000/panier/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfos),
        })

          .then(response => {
            response.json();
            window.location.reload()
          })
          .catch(error => {
            console.error('Erreur:', error);
          });
      }
    }

  }

  return (
    <div>
      <Nav />
      <div className="algo-container">

        <div className="algo-steps">
          <div className="panier-section">
            <h2 className="panier-title">Votre Sélection :</h2>
            {Object.values(panierWait).length > 0 ? (
              <ul className="panier-list">
                {Object.values(panierWait).map((boitier, index) => (
                  <li className="panier-item" key={index}>
                    <img src={boitier.image} alt={boitier.name} className="panier-image" />
                    {boitier.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="panier-empty">Aucun élément sélectionné.</p>
            )}
          </div>
          <div className="produits-section">
            {step === 0 && (
              <button className="start-button" onClick={() => StartPc()}>Commencer</button>
            )}
            {step === 1 && (
              <div className="step-content">
                <h2 className="step-title">Liste des Boîtiers Disponibles :</h2>
                <ul className="item-list">
                  {boitiers.map((boitier, index) => (
                    <li className="item" key={index}>
                      <img src={boitier.image} alt={boitier.name} className="item-image" />
                      {boitier.name} (Format: {boitier.taille})
                      <button className="item-button" value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose(e)}>+</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {step === 2 && (
              <div className="step-content">
                <h2 className="step-title">Liste des Cartes Mères Disponibles :</h2>
                <ul className="item-list">
                  {carte.map((boitier, index) => (
                    <li className="item" key={index}>
                      <img src={boitier.image} alt={boitier.name} className="item-image" />
                      {boitier.name} (Format: {boitier.typec})
                      <button className="item-button" value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose2(e)}>+</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {step === 3 && (
              <div className="step-content">
                <h2 className="step-title">Liste des CPU Disponibles :</h2>
                <ul className="item-list">
                  {cpu.map((boitier, index) => (
                    <li className="item" key={index}>
                      <img src={boitier.image} alt={boitier.name} className="item-image" />
                      {boitier.name} (Format: {boitier.type})
                      <button className="item-button" value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose3(e)}>+</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {step === 4 && (
              <div className="step-content">
                <h2 className="step-title">Liste des RAM Disponibles :</h2>
                <ul className="item-list">
                  {ram.map((boitier, index) => (
                    <li className="item" key={index}>
                      <img src={boitier.image} alt={boitier.name} className="item-image" />
                      {boitier.name} (Format: {boitier.type})
                      <button className="item-button" value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose4(e)}>+</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {step === 5 && (
              <div className="step-content">
                <h2 className="step-title">Liste des SSD Disponibles :</h2>
                <ul className="item-list">
                  {ssd.map((boitier, index) => (
                    <li className="item" key={index}>
                      <img src={boitier.image} alt={boitier.name} className="item-image" />
                      {boitier.name} (Format: {boitier.type})
                      <button className="item-button" value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose5(e)}>+</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {step === 6 && (
              <div className="step-content">
                <h2 className="step-title">Liste des GPU Disponibles :</h2>
                <ul className="item-list">
                  {gpu.map((boitier, index) => (
                    <li className="item" key={index}>
                      <img src={boitier.image} alt={boitier.name} className="item-image" />
                      {boitier.name} (Format: {boitier.type})
                      <button className="item-button" value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose6(e)}>+</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {step === 7 && (
              <div className="step-content">
                <h2 className="step-title">Liste des AIO Disponibles :</h2>
                <ul className="item-list">
                  {aio.map((boitier, index) => (
                    <li className="item" key={index}>
                      <img src={boitier.image} alt={boitier.name} className="item-image" />
                      {boitier.name} (Format: {boitier.type})
                      <button className="item-button" value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => Choose7(e)}>+</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {step === 8 && (
              <div className="step-content">
                <h2 className="step-title">Liste des Alimentations Disponibles :</h2>
                <ul className="item-list">
                  {alim.map((boitier, index) => (
                    <li className="item" key={index}>
                      <img src={boitier.image} alt={boitier.name} className="item-image" />
                      {boitier.name} (Format: {boitier.type})
                      <button className="item-button" value={JSON.stringify(boitier)} name={boitier.id} onClick={(e) => ChooseFinish(e)}>+</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {step === 9 && (
              <div className="finish-message">
                <button onClick={() => AjouterPanier()}> Ajouter au panier</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



export default Algo;