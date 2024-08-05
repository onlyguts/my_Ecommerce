import React, { useState, useRef, useEffect } from "react";

import { useNavigate, useParams } from 'react-router-dom';
import "./Tabs.css";
import PhotoSpecs from '../assets/Specs.png';
import StarProduit from '../assets/star-produit.svg';
const Tabs = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const tab1Ref = useRef(null);
    const tab2Ref = useRef(null);
    const { id } = useParams();
    const tab3Ref = useRef(null);
    const [avis, setAvis] = useState([]);
    const [avissend, setAvisSend] = useState([]);
    const [moyenne, setMoyenne] = useState(0);



    const [text, setText] = useState('');
    const [rate, setRate] = useState('');

    const Api = () => {
        fetch(`https://localhost:8000/avis/${id}`)
            .then(response => response.json())
            .then(data => {
                setAvis(data)
                console.log(data)
                const totalavis = data.reduce((sum, avis) => sum + avis.rate, 0);
                const moyenne = data.length > 0 ? totalavis / data.length : 0;
                setMoyenne(data.rate);
    
            })
            .catch(error => console.error('Erreur:', error));
    }


    
    useEffect(() => {
        Api()
    }, []);


    const AvisSet = (e) => {
        const users = localStorage.getItem('users');
        const id_user = JSON.parse(users)
        setRate(e.target.value)
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
        setText(e.target.value)

    }

    const EnvoyerAvis = () => {

        fetch("https://localhost:8000/avis/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(avissend),
        })

            .then(response => {
                response.json();
                Api(id);
                setText('')
                setRate('')

            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const scrollToTab = (tab) => {
        if (tab === 'tab1') {
            tab1Ref.current.scrollIntoView({ behavior: 'smooth' });
        } else if (tab === 'tab2') {
            tab2Ref.current.scrollIntoView({ behavior: 'smooth' });
        } else if (tab === 'tab3') {
            tab3Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const renderStars = (count) => {
        return Array(count).fill().map((_, index) => (
            <img key={index} className="star-rate2" alt="Star" src={StarProduit} />
        ));
    };

    return (
        <div className="tabs">
            <div className="tab-tabs">
                <button className={activeTab === 'tab1' ? 'active' : ''} onClick={() => handleTabChange('tab1')}>
                    FICHE TECHNIQUE
                </button>
                <button className={activeTab === 'tab2' ? 'active' : ''} onClick={() => handleTabChange('tab2')}>
                    AVIS CLIENT
                </button>
                <button className={activeTab === 'tab3' ? 'active' : ''} onClick={() => handleTabChange('tab3')}>
                    AUTRES
                </button>
            </div>
            <div className="tab-content">
                <div ref={tab1Ref} className={`tab-panel ${activeTab === 'tab1' ? 'active' : ''}`}>
                    <img src={PhotoSpecs} alt="Image Fiche Technique" />
                </div>
                <div ref={tab2Ref} className={`tab-panel ${activeTab === 'tab2' ? 'active' : ''}`}>
                    <input type='number' max='5' value={rate} onChange={(e) => AvisSet(e)}></input>
                    <textarea className="avis-input" value={text} placeholder="Votre avis ici" onChange={(e) => AvisSet_2(e)}></textarea>
                    <button className="avis-button" onClick={() => EnvoyerAvis()}>Envoyer</button>
                    <section className="avis-list">
                        {avis.map((produit) => (

                            <article className="avis" key={produit.id}>
                                 <div className="star-stat2">
                                        {produit.rate === 0 && <p>Aucune évaluation</p>}
                                        {produit.rate >= 1 && produit.rate < 2 && renderStars(1)}
                                        {produit.rate >= 2 && produit.rate < 3 && renderStars(2)}
                                        {produit.rate >= 3 && produit.rate < 4 && renderStars(3)}
                                        {produit.rate >= 4 && produit.rate < 5 && renderStars(4)}
                                        {produit.rate >= 5 && renderStars(5)}
                                    </div>
                               <br/> <h2>{produit.username} </h2>
                                <p> Commentaire :  <br/>  {produit.description} </p>
                            </article>

                        ))}

                    </section>
                </div>
                <div ref={tab3Ref} className={`tab-panel ${activeTab === 'tab3' ? 'active' : ''}`}>
                    SOON ......
                </div>
            </div>
        </div>
    );
};

export default Tabs;