
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Nav from './../Nav';
// import localhost from './../Config';

// function BoitierId() {
//   const { id } = useParams()
//   const [arrayId, setArrayId] = useState([]);
//   const local = localhost
//   useEffect(() => {

//     fetch("https://"+local+"/boitier/" + id)
//       .then(response => response.json())
//       .then(data => setArrayId(data))

//   }, [])

//   return (
//     <div>
//       <Nav />
//       {
//         arrayId.map((itme) => {
//           return (
//             <div className="item" key={itme.id} >
//               <span> {itme.designation} </span>
//               <img src={itme.imageUrl} alt={itme.designation} />
//               <span> {itme.price}$</span>
//             </div>
//           )
//         })
//       }
//     </div>
//   )
// }

// export default BoitierId