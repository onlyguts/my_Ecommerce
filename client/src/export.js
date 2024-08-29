import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { use } from 'react';

const ExcelGenerator = () => {

  const [commandes, setCommandes] = useState([])

  
  const data = [
    {
      id: 1,
      id_commande: 101,
      name: "John",
      lastName: "Doe",
      commande: [
        { produit: "RTX 4090" },
        { produit: "Ryzen 9" },
      ],
    },

  ];

  useEffect(() => {
    fetch("https://localhost:8000/exel")
      .then(response => response.json())
      .then(data => setCommandes(data))
      .catch(error => console.error('Erreur: ', error));
  }, []);


  commandes.forEach(element => {
    const produits = JSON.parse(element.produits)
    console.log(produits) // array des produits de chaque commande 
  });

  const generateExcel = () => {
    const excelData = [];
    data.forEach((item) => {
      item.commande.forEach((produit, index) => {
        if (index === 0) {
          excelData.push({
            id: item.id,
            id_commande: item.id_commande,
            name: item.name,
            lastName: item.lastName,
            produit: produit.produit,
          });
        } else {
          excelData.push({
            id: '',
            id_commande: '',
            name: '',
            lastName: '',
            produit: produit.produit,
          });
        }
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });


    saveAs(dataBlob, 'commande_format.xlsx');
  };
  return (
    <div>
      <button onClick={generateExcel}>Générer Excel</button>
    </div>
  );
};

export default ExcelGenerator;