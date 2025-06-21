export interface LogbookEntry {
  id: string;
  type: string; // e.g. "Equipment Maintenance", "Safety Inspection", "Incident Report", "OCR Document"
  date: Date;
  operator: string;
  filename?: string;
  note?: string;
}

class LogbookDatabase {
  private readonly STORAGE_KEY = 'mineguard_logbook_entries';
  private readonly MAX_ENTRIES = 200;

  private getStoredEntries(): LogbookEntry[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      const entries = JSON.parse(stored);
      return entries.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date),
      }));
    } catch (error) {
      console.error('Error loading logbook entries from localStorage:', error);
      return [];
    }
  }

  private saveEntries(entries: LogbookEntry[]): void {
    try {
      const recentEntries = entries.slice(-this.MAX_ENTRIES);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recentEntries));
    } catch (error) {
      console.error('Error saving logbook entries to localStorage:', error);
    }
  }

  async saveLogEntry(entry: LogbookEntry): Promise<void> {
    const entries = this.getStoredEntries();
    entries.push(entry);
    this.saveEntries(entries);
  }

  async getRecentLogEntries(limit: number = 50): Promise<LogbookEntry[]> {
    const entries = this.getStoredEntries();
    return entries.slice(-limit).reverse(); // most recent first
  }
}

export const logbookDatabase = new LogbookDatabase(); 