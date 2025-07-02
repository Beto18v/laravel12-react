import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Definimos explícitamente los tipos de datos que esperamos para mayor seguridad
interface Donation {
    id: number;
    donor_name: string;
    amount: string;
    created_at: string;
    shelter?: {
        name: string;
    };
}

interface User {
    name: string;
    role: 'cliente' | 'aliado' | 'admin';
    shelter?: {
        name: string;
    };
}

// La función principal que crea y descarga el PDF
export const generateDonationsReport = (donations: Donation[], user: User) => {
    const doc = new jsPDF();
    const tableColumns: string[] = [];
    const tableRows: string[][] = [];
    let reportTitle = 'Reporte de Donaciones';

    // --- Definir Título y Columnas según el Rol ---
    if (user.role === 'cliente') {
        reportTitle = `Reporte de Mis Donaciones - ${user.name}`;
        tableColumns.push('Fundación', 'Monto', 'Fecha');
        donations.forEach((donation) => {
            const donationData = [
                donation.shelter?.name ?? 'N/A',
                `$${parseFloat(donation.amount).toLocaleString('es-CO')}`,
                new Date(donation.created_at).toLocaleDateString(),
            ];
            tableRows.push(donationData);
        });
    } else if (user.role === 'aliado') {
        reportTitle = `Reporte de Donaciones Recibidas - ${user.shelter?.name}`;
        tableColumns.push('Donante', 'Monto', 'Fecha');
        donations.forEach((donation) => {
            const donationData = [
                donation.donor_name,
                `$${parseFloat(donation.amount).toLocaleString('es-CO')}`,
                new Date(donation.created_at).toLocaleDateString(),
            ];
            tableRows.push(donationData);
        });
    } else {
        // admin
        reportTitle = 'Reporte General de Donaciones';
        tableColumns.push('Donante', 'Fundación', 'Monto', 'Fecha');
        donations.forEach((donation) => {
            const donationData = [
                donation.donor_name,
                donation.shelter?.name ?? 'N/A',
                `$${parseFloat(donation.amount).toLocaleString('es-CO')}`,
                new Date(donation.created_at).toLocaleDateString(),
            ];
            tableRows.push(donationData);
        });
    }

    // --- Crear el PDF ---
    doc.setFontSize(18);
    doc.text(reportTitle, 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, 29);

    autoTable(doc, {
        startY: 35,
        head: [tableColumns],
        body: tableRows,
    });

    doc.save('reporte_donaciones.pdf');
};
