import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExcelGenerator = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    fetch("https://localhost:8000/exel")
      .then(response => response.json())
      .then(data => setCommandes(data))
      .catch(error => console.error('Erreur: ', error));
  }, []);

  const generateExcel = () => {
    const excelData = [];

 
    commandes.forEach((item) => {
      const produits = JSON.parse(item.produits); 

      produits.forEach((produit, index) => {
        if (index === 0) {
          excelData.push({
            id_commande: '#' + item.id_commande,
            id: item.id_user,
            name: item.name,
            adresse:  item.code + ' ' + item.adresse,

            produit: produit.name,
          });
        } else {

          excelData.push({
            id: '',
            id_commande: '',
            name: '',
            adresse: '',
            produit: produit.name, 
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
      <button onClick={generateExcel}>Générer Excel ( Toute les commandes )</button>
    </div>
  );
};

export default ExcelGenerator;