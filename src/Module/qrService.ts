import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';

// Extend jsPDF with the autoTable plugin
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

export interface CoalBatchData {
  id: string;
  weight: number; // in tons
  quality: string;
  mineLocation: string;
  dispatchTime: Date;
  qrCode: string; // This will be a base64 data URL
}

export interface QRGenerationRequest {
  weight: number; // in tons
  quality: string;
  mineLocation: string;
  dispatchTime: Date;
}

class QRService {
  private generateBatchId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `CB-${timestamp}-${random}`;
  }

  async generateQRCode(batchData: Omit<CoalBatchData, 'qrCode'>): Promise<string> {
    const qrData = JSON.stringify({
      id: batchData.id,
      weight: batchData.weight,
      quality: batchData.quality,
      location: batchData.mineLocation,
      timestamp: batchData.dispatchTime.toISOString(),
      url: `${window.location.origin}/batch/${batchData.id}`
    });

    try {
      // Generate QR code as a data URL
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.9,
        margin: 1,
        width: 150,
      });
      return qrCodeDataUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw error;
    }
  }

  async createCoalBatch(request: QRGenerationRequest): Promise<CoalBatchData> {
    const batchId = this.generateBatchId();
    
    const partialBatchData: Omit<CoalBatchData, 'qrCode'> = {
      id: batchId,
      weight: request.weight,
      quality: request.quality,
      mineLocation: request.mineLocation,
      dispatchTime: request.dispatchTime,
    };

    // Generate QR code
    const qrCode = await this.generateQRCode(partialBatchData);

    const batchData: CoalBatchData = {
      ...partialBatchData,
      qrCode,
    };

    return batchData;
  }

  async generateAndDownloadPDF(batchData: CoalBatchData): Promise<void> {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('MineGuard - Coal Batch Report', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // QR Code
    if (batchData.qrCode) {
      doc.addImage(batchData.qrCode, 'PNG', 15, 30, 50, 50);
    }
    
    // Batch Info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Batch ID:`, 70, 40);
    doc.setFont('helvetica', 'bold');
    doc.text(`${batchData.id}`, 95, 40);

    doc.setFont('helvetica', 'normal');
    doc.text(`Dispatch Time:`, 70, 50);
    doc.setFont('helvetica', 'bold');
    doc.text(`${batchData.dispatchTime.toLocaleString()}`, 95, 50);


    // Batch Details Table
    autoTable(doc, {
      startY: 90,
      head: [['Parameter', 'Value']],
      body: [
        ['Weight', `${batchData.weight.toLocaleString()} tons`],
        ['Quality Grade', batchData.quality],
        ['Mine Location', batchData.mineLocation],
        ['Status', 'Dispatched'],
        ['Verification', 'Verified by MineGuard System'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [255, 107, 0] }, // #ff6b00
    });
    
    // Footer
    const pageCount = doc.internal.pages.length;
    doc.setFontSize(10);
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() / 2, 287, { align: 'center' });
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 287);
    }

    doc.save(`Batch-Report-${batchData.id}.pdf`);
  }


  async validateBatchData(data: QRGenerationRequest): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (!data.weight || data.weight <= 0) {
      errors.push("Weight must be greater than 0");
    }

    if (data.weight > 1000) { // Max 1000 tons
      errors.push("Weight cannot exceed 1000 tons");
    }

    if (!data.quality || data.quality.trim() === "") {
      errors.push("Quality grade is required");
    }

    if (!data.mineLocation || data.mineLocation.trim() === "") {
      errors.push("Mine location is required");
    }

    if (!data.dispatchTime) {
      errors.push("Dispatch time is required");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  getQualityOptions(): string[] {
    return ["Premium", "Standard", "Low"];
  }

  getMineLocationOptions(): string[] {
    return [
      "East Pit",
      "West Pit", 
      "North Mine Section",
      "South Mine Section",
      "Shaft A",
      "Shaft B",
      "Level A",
      "Level B",
      "Level C",
      "Underground Section 1",
      "Underground Section 2",
      "Surface Mining Area"
    ];
  }

  async downloadQRCode(qrCodeData: string, batchId: string): Promise<void> {
    if (!qrCodeData || !qrCodeData.startsWith('data:image/png')) {
      console.error('Invalid QR code data provided for download.');
      return;
    }
    const link = document.createElement('a');
    link.href = qrCodeData;
    link.download = `QR-${batchId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const qrService = new QRService(); 