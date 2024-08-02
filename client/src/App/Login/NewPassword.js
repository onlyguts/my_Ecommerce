import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

function NewPassword() {
    const { token } = useParams();
    const [paswword, setPassword] = useState('')
    const [paswword2, setPassword2] = useState('')
    const [message, setMessage] = useState('')

    function NouveauMDP(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
    
  const Envoyer = () => {
    console.log(paswword, paswword2, token)
    if (paswword != paswword2) {
        setMessage('pas le bon')
    } else {
        fetch("https://localhost:8000/users/update/password/" + token, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password:paswword})
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setMessage('Mot de passe mis à jour');
            })
            .catch(error => console.error('Erreur :', error));
    
    }
  }


  return (
    <div className='wrapper'>
    <div className='container'>
        <h2 className='titre'>Mots de passe oublié?</h2>
        <form >
            {message}
             <input type='text' id='paswword' name='paswword'  value={paswword} onChange={(e) => setPassword(e.target.value)} placeholder='Nouveau mots de passe' />
            <input type='text' id='paswword2' name='paswword2'  value={paswword2} onChange={(e) => setPassword2(e.target.value)} placeholder='retaper le ' />
            <span className='bouton' onClick={() => Envoyer()}>Envoyer</span>
        </form>
        <div className='btn'>
            <button>Accueil</button>
        </div>
    </div>
</div>
  )
}

export default NewPassword