import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// Registra los componentes necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Chart() {
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: isDarkMode ? '#e2e8f0' : '#1a202c',
                },
            },
            title: {
                display: true,
                text: 'Adopciones por Mes',
                color: isDarkMode ? '#e2e8f0' : '#1a202c',
            },
        },
        scales: {
            y: {
                ticks: {
                    color: isDarkMode ? '#e2e8f0' : '#1a202c',
                },
                grid: {
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
            },
            x: {
                ticks: {
                    color: isDarkMode ? '#e2e8f0' : '#1a202c',
                },
                grid: {
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
            },
        },
    };

    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Perros',
                data: [56, 55, 60, 70, 75, 80],
                backgroundColor: 'rgba(37, 99, 235, 0.7)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Gatos',
                data: [35, 40, 45, 50, 55, 60],
                backgroundColor: 'rgba(22, 163, 74, 0.7)',
                borderColor: 'rgba(22, 163, 74, 1)',
                borderWidth: 1,
            },
            {
                label: 'Otros',
                data: [15, 18, 20, 22, 25, 28],
                backgroundColor: 'rgba(124, 58, 237, 0.7)',
                borderColor: 'rgba(124, 58, 237, 1)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
