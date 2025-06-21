export interface OcrScan {
  id: string;
  filename: string;
  timestamp: Date;
  extractedText: string;
  imageData?: string; // a thumbnail
  note?: string;
}

class OcrDatabase {
  private readonly STORAGE_KEY = 'mineguard_ocr_scans';
  private readonly MAX_SCANS = 50;

  private getStoredScans(): OcrScan[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      const scans = JSON.parse(stored);
      return scans.map((scan: any) => ({
        ...scan,
        timestamp: new Date(scan.timestamp),
      }));
    } catch (error) {
      console.error('Error loading OCR scans from localStorage:', error);
      return [];
    }
  }

  private saveScans(scans: OcrScan[]): void {
    try {
      const recentScans = scans.slice(-this.MAX_SCANS);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recentScans));
    } catch (error) {
      console.error('Error saving OCR scans to localStorage:', error);
    }
  }
  
  async saveOcrScan(scanData: OcrScan): Promise<void> {
    const scans = this.getStoredScans();
    scans.push(scanData);
    this.saveScans(scans);
  }
  
  async getRecentOcrScans(limit: number = 10): Promise<OcrScan[]> {
    const scans = this.getStoredScans();
    return scans.slice(-limit).reverse(); // most recent first
  }
}

export const ocrDatabase = new OcrDatabase(); 