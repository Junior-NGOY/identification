import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { RegistrationType } from '../types';

export const generatePDF = async (registrations: RegistrationType[]): Promise<void> => {
  try {
    // Generate HTML content
    const htmlContent = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            h1 {
              color: #333;
            }
          </style>
        </head>
        <body>
          <h1>Registrations Report</h1>
          <table>
            <tr>
              <th>Driver Name</th>
              <th>Association</th>
              <th>Vehicle Type</th>
              <th>Vehicle Model</th>
              <th>Vehicle Matricule</th>
              <th>Owner Name</th>
              <th>Registration Date</th>
            </tr>
            ${registrations.map(reg => `
              <tr>
                <td>${reg.driver.firstName} ${reg.driver.lastName}</td>
                <td>${reg.driver.association || ''}</td>
                <td>${reg.vehicle.type}</td>
                <td>${reg.vehicle.model}</td>
                <td>${reg.vehicle.matricule}</td>
                <td>${reg.owner.firstName} ${reg.owner.lastName}</td>
                <td>${new Date(reg.timestamp).toLocaleDateString()}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    // Generate PDF from HTML
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false
    });

    // Check if sharing is available
    const isSharingAvailable = await Sharing.isAvailableAsync();

    if (isSharingAvailable) {
      // Share the file
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Registrations PDF File'
      });
    } else {
      console.log('Sharing is not available');
      // You might want to implement an alternative way to save or view the file here
    }
  } catch (error) {
    console.error('Error generating PDF file:', error);
    throw error;
  }
};

