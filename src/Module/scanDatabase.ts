import { ScanResult } from './geminiService';

export interface ScanSession {
  id: string;
  timestamp: Date;
  workerName?: string;
  results: ScanResult[];
  overallPassed: boolean;
  imageData?: string;
}

class ScanDatabase {
  private readonly STORAGE_KEY = 'mineguard_scans';
  private readonly MAX_SCANS = 100; // Keep only last 100 scans

  private getStoredScans(): ScanSession[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const scans = JSON.parse(stored);
      // Convert string dates back to Date objects
      return scans.map((scan: any) => ({
        ...scan,
        timestamp: new Date(scan.timestamp),
        results: scan.results.map((result: any) => ({
          ...result,
          timestamp: new Date(result.timestamp)
        }))
      }));
    } catch (error) {
      console.error('Error loading scans from localStorage:', error);
      return [];
    }
  }

  private saveScans(scans: ScanSession[]): void {
    try {
      // Keep only the most recent scans
      const recentScans = scans.slice(-this.MAX_SCANS);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recentScans));
    } catch (error) {
      console.error('Error saving scans to localStorage:', error);
    }
  }

  async saveScanSession(session: ScanSession): Promise<void> {
    const scans = this.getStoredScans();
    scans.push(session);
    this.saveScans(scans);
  }

  async getRecentScans(limit: number = 10): Promise<ScanSession[]> {
    const scans = this.getStoredScans();
    return scans.slice(-limit).reverse(); // Most recent first
  }

  async getScanById(id: string): Promise<ScanSession | null> {
    const scans = this.getStoredScans();
    return scans.find(scan => scan.id === id) || null;
  }

  async deleteScan(id: string): Promise<void> {
    const scans = this.getStoredScans();
    const filteredScans = scans.filter(scan => scan.id !== id);
    this.saveScans(filteredScans);
  }

  async clearAllScans(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  async getScanStats(): Promise<{
    totalScans: number;
    passedScans: number;
    failedScans: number;
    successRate: number;
  }> {
    const scans = this.getStoredScans();
    const totalScans = scans.length;
    const passedScans = scans.filter(scan => scan.overallPassed).length;
    const failedScans = totalScans - passedScans;
    const successRate = totalScans > 0 ? (passedScans / totalScans) * 100 : 0;

    return {
      totalScans,
      passedScans,
      failedScans,
      successRate
    };
  }

  async getEquipmentStats(): Promise<Record<string, { passed: number; failed: number; total: number }>> {
    const scans = this.getStoredScans();
    const stats: Record<string, { passed: number; failed: number; total: number }> = {};

    scans.forEach(scan => {
      scan.results.forEach(result => {
        if (!stats[result.equipmentName]) {
          stats[result.equipmentName] = { passed: 0, failed: 0, total: 0 };
        }
        
        stats[result.equipmentName].total++;
        if (result.isPresent) {
          stats[result.equipmentName].passed++;
        } else {
          stats[result.equipmentName].failed++;
        }
      });
    });

    return stats;
  }
}

export const scanDatabase = new ScanDatabase(); 