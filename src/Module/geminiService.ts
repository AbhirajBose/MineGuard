export interface ScanResult {
  id: string;
  timestamp: Date;
  equipmentName: string;
  isPresent: boolean;
  confidence: number;
  imageData?: string;
  analysis: string;
  workerName?: string;
}

export interface EquipmentItem {
  name: string;
  required: boolean;
  description: string;
  searchTerm: string; // What to actually search for in the image
}

export const REQUIRED_EQUIPMENT: EquipmentItem[] = [
  { name: "Safety Helmet", required: true, description: "Hard hat or safety helmet", searchTerm: "cap or hat on head" },
  { name: "Safety Jacket", required: true, description: "High visibility safety jacket or vest", searchTerm: "shirt or jacket on body" },
  { name: "Safety Goggles", required: true, description: "Eye protection goggles", searchTerm: "glasses or sunglasses on face" },
  { name: "Ear Protection", required: true, description: "Earplugs or earmuffs", searchTerm: "earbuds or headphones on ears" },
  { name: "Respirator", required: true, description: "Respiratory protection mask", searchTerm: "mask covering mouth or nose" },
  { name: "Safety Gloves", required: true, description: "Work gloves for hand protection", searchTerm: "gloves on hands" },
  { name: "Safety Boots", required: true, description: "Steel toe or safety boots", searchTerm: "shoes or boots on feet" },
];

class GeminiService {
  private apiKey: string;

  constructor() {
    this.apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
  }

  private async makeApiRequest(imageData: string, equipment: EquipmentItem): Promise<any> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not found. Please check your .env file.');
    }

    const base64Data = imageData.split(',')[1];
    
    const requestBody = {
      contents: [{
        parts: [
          {
            text: `Analyze this image carefully. Look for a full body view of a person and check if they are wearing ${equipment.searchTerm}.

Equipment to verify: ${equipment.name}
What to look for: ${equipment.searchTerm}

Please respond in this exact format:
PRESENT: YES/NO
CONFIDENCE: 0-100
EXPLANATION: Brief description of what you see

Focus on identifying if the person is wearing ${equipment.searchTerm}. If you cannot see the full body or the relevant body part, respond with NO.`
          },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: base64Data
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 150
      }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    return await response.json();
  }

  async analyzeEquipment(imageData: string, equipment: EquipmentItem): Promise<ScanResult> {
    try {
      const data = await this.makeApiRequest(imageData, equipment);
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Unexpected response format from Gemini API');
      }

      const result = data.candidates[0].content.parts[0].text;
      
      // Parse the response
      const presentMatch = result.match(/PRESENT:\s*(YES|NO)/i);
      const confidenceMatch = result.match(/CONFIDENCE:\s*(\d+)/i);
      const explanationMatch = result.match(/EXPLANATION:\s*(.+)/i);

      const isPresent = presentMatch?.[1]?.toUpperCase() === 'YES';
      const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 50;
      const explanation = explanationMatch?.[1] || 'Analysis completed';

      return {
        id: `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        equipmentName: equipment.name,
        isPresent,
        confidence,
        imageData,
        analysis: explanation,
      };
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async analyzeAllEquipment(imageData: string): Promise<ScanResult[]> {
    const results: ScanResult[] = [];
    
    for (const equipment of REQUIRED_EQUIPMENT) {
      try {
        const result = await this.analyzeEquipment(imageData, equipment);
        results.push(result);
        // Add a small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error analyzing ${equipment.name}:`, error);
        // Add a failed result
        results.push({
          id: `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
          equipmentName: equipment.name,
          isPresent: false,
          confidence: 0,
          analysis: `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }
    
    return results;
  }
}

export const geminiService = new GeminiService(); 