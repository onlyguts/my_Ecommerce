import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExcelGenerator = () => {
  const [pourcent, setArrayPourcent] = useState([]);

  useEffect(() => {
    fetch("https://localhost:8000/produits/get/vendu")
      .then(response => response.json())
      .then(data => {
        const totalVentes = data.reduce((total, produit) => total + produit.vendu, 0);
        const produitsAvecPourcentage = data.map(produit => {
          const pourcentageVentes = (produit.vendu / totalVentes) * 100;
          return { ...produit, pourcentageVentes: pourcentageVentes.toFixed(2) };
        });
        setArrayPourcent(produitsAvecPourcentage);
      })
      .catch(error => console.error('Erreur: ', error));
  }, []);

  const generateExcel = () => {
    const excelData = pourcent.map(produit => ({
      name: produit.name,
      pourcentageVentes: produit.pourcentageVentes + '%'
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(dataBlob, 'ventes_pourcentages.xlsx');
  };

  return (
    <div>
      <button onClick={generateExcel}>Générer Excel (Pourcentage des Ventes)</button>
    </div>
  );
};

export default ExcelGenerator;
