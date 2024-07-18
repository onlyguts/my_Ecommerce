import React, { useState, useEffect } from 'react';

import localhost from './../Config';

function listBoitier() {
  const [array, setArray] = useState([]);
  const local = localhost

  useEffect(() => {
      fetch('https://'+local+'/boitier')
          .then(response => response.json())
          .then(data => setArray(data))

  }, [])
  
  return (
    <div>listBoitier</div>
  )
}

export default listBoitier