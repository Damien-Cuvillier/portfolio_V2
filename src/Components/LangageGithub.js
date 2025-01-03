import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LangageGithub = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <p className="text-white"> </p>;
  }

  

  const chartData = {
    labels: data.map(entry => entry.name),
    datasets: [
      {
        label: 'Pourcentage d\'utilisation',
        data: data.map(entry => entry.value),
        backgroundColor: ['#FF8042', '#0088FE', '#00C49F', '#FFBB28'],
      },
    ],
  };

  const options = {
    indexAxis: 'y', // rend le graphique horizontal
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        barThickness: 1, // Ajuste l'épaisseur des barres
        maxBarThickness: 1, // Assure que l'épaisseur des barres ne dépasse pas 8px
        categoryPercentage: 0.1, // Ajuste l'épaisseur des barres
        barPercentage: 0.5, // Ajuste l'épaisseur des barres
        ticks: {
          font: {
            size: 12,
            family: 'Arial, sans-serif',
            weight: 'bold',
            color: '#333',
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#000',
        titleFont: {
          size: 14,
          family: 'Arial, sans-serif',
          weight: 'bold',
          color: '#FFF',
        },
        bodyFont: {
          size: 12,
          family: 'Arial, sans-serif',
          color: '#FFF',
        },
        footerFont: {
          size: 10,
          family: 'Arial, sans-serif',
          color: '#FFF',
        },
      },
    },
    layout: {
      padding: 0,
    },
    maintainAspectRatio: false, // Assure que le graphique s'ajuste à son conteneur
  };

  return (
    <div className="w-full flex justify-center ">
      <Bar data={chartData} options={options} style={{ backgroundColor: 'transparent' }} />
    </div>
  );
};

export default LangageGithub;
