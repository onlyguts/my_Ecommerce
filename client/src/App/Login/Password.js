import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Password() {
  const [email, setEmail] = useState('');

  // function NouveauMDP(length) {
  //     let result = '';
  //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     const charactersLength = characters.length;
  //     let counter = 0;
  //     while (counter < length) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //       counter += 1;
  //     }
  //     return result;
  // }
  // console.log(NouveauMDP(10));
  const emailPassword = async (e) => {
    e.preventDefault();

    fetch("https://localhost:8000/email/nouveau_mdp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    .then(response => {
      console.log(response.status);
    })
    .catch(error => {
      console.error("Erreur réseau ou autre :", error);
    });
}


// console.log(email);

return (
  <div className='wrapper'>
    <div className='container'>
      <h2 className='titre'>Mots de passe oublié?</h2>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      <form onSubmit={emailPassword}>
        <input type='email' id='mail' name='mail' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Adresse e-mail' />
        <button type="submit">Envoyer</button>
      </form>
      <div className='btn'>
        <button>Accueil</button>
      </div>
    </div>
  </div>
)
}

export default Password