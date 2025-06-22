import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/button';
import { Card } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Badge } from '../../../../components/ui/badge';
import { qrService, CoalBatchData, QRGenerationRequest } from '../../../../Module/qrService';
import { qrDatabase } from '../../../../Module/qrDatabase';
import { config } from '../../../../config/environment';
import { QRScanner } from '../../../../components/QRScanner';

export const QRTrackingPage = (): JSX.Element => {
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [showQRForm, setShowQRForm] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedBatch, setScannedBatch] = useState<CoalBatchData | null>(null);
  const [newlyGeneratedBatch, setNewlyGeneratedBatch] = useState<CoalBatchData | null>(null);
  const [coalBatches, setCoalBatches] = useState<CoalBatchData[]>([]);
  const [batchStats, setBatchStats] = useState({
    totalBatches: 0,
    totalWeight: 0,
    qualityDistribution: {} as Record<string, number>,
    locationDistribution: {} as Record<string, number>,
    averageWeight: 0
  });
  const [formData, setFormData] = useState({
    weight: '',
    quality: '',
    mineLocation: '',
    dispatchTime: new Date().toISOString().slice(0, 16)
  });

  useEffect(() => {
    loadBatches();
    loadStats();
  }, []);

  const loadBatches = async () => {
    try {
      const batches = await qrDatabase.getRecentBatches(20);
      setCoalBatches(batches);
    } catch (error) {
      console.error('Error loading batches:', error);
    }
  };

  const loadStats = async () => {
    try {
      const stats = await qrDatabase.getBatchStats();
      setBatchStats(stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateQRCode = async () => {
    if (!formData.weight || !formData.quality || !formData.mineLocation || !formData.dispatchTime) {
      alert('Please fill in all fields');
      return;
    }

    setIsGeneratingQR(true);
    
    try {
      const request: QRGenerationRequest = {
        weight: parseFloat(formData.weight),
        quality: formData.quality,
        mineLocation: formData.mineLocation,
        dispatchTime: new Date(formData.dispatchTime)
      };

      // Validate the data
      const validation = await qrService.validateBatchData(request);
      if (!validation.isValid) {
        alert(`Validation errors:\n${validation.errors.join('\n')}`);
        return;
      }

      // Create the coal batch
      const newBatch = await qrService.createCoalBatch(request);
      
      // Save to database
      await qrDatabase.saveCoalBatch(newBatch);
      
      // Update UI
      setCoalBatches(prev => [newBatch, ...prev]);
      setFormData({
        weight: '',
        quality: '',
        mineLocation: '',
        dispatchTime: new Date().toISOString().slice(0, 16)
      });
      setShowQRForm(false);
      
      // Reload stats
      await loadStats();
      
      // Show the newly generated QR code in a popup
      setNewlyGeneratedBatch(newBatch);
      
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code. Please try again.');
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const downloadQRCode = async (batch: CoalBatchData) => {
    try {
      await qrService.downloadQRCode(batch.qrCode, batch.id);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Failed to download QR code');
    }
  };

  const downloadPDF = async (batch: CoalBatchData) => {
    try {
      await qrService.generateAndDownloadPDF(batch);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to generate or download PDF');
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'premium': return 'bg-green-500 bg-opacity-20 text-green-400';
      case 'standard': return 'bg-blue-500 bg-opacity-20 text-blue-400';
      case 'low': return 'bg-yellow-500 bg-opacity-20 text-yellow-400';
      default: return 'bg-gray-500 bg-opacity-20 text-gray-400';
    }
  };

  const qualityOptions = qrService.getQualityOptions();
  const mineLocationOptions = qrService.getMineLocationOptions();

  const handleQRScan = async (scannedData: any) => {
    try {
      // Try to find the batch in our database
      const batch = await qrDatabase.getBatchById(scannedData.id);
      if (batch) {
        setScannedBatch(batch);
        setShowQRScanner(false);
      } else {
        alert('Batch not found in database. Please check the QR code.');
      }
    } catch (error) {
      console.error('Error processing scanned QR:', error);
      alert('Error processing QR code. Please try again.');
    }
  };

  return (
    <div className="flex-1 p-6 bg-[#1e1e1e] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">QR Batch Tracking</h1>
          <p className="text-gray-400">Generate QR codes for coal batches with detailed production reports</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Batches</p>
                <p className="text-2xl font-bold text-white mt-1">{batchStats.totalBatches}</p>
              </div>
              <div className="w-12 h-12 bg-[#ff6b00] bg-opacity-20 rounded-lg flex items-center justify-center">
                <img src="/mingcute-link-fill.svg" alt="Batches" className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Weight</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {batchStats.totalWeight.toLocaleString()} tons
                </p>
              </div>
              <div className="w-12 h-12 bg-[#ff6b00] bg-opacity-20 rounded-lg flex items-center justify-center">
                <img src="/production.svg" alt="Weight" className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Premium Quality</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {batchStats.qualityDistribution['Premium'] || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#ff6b00] bg-opacity-20 rounded-lg flex items-center justify-center">
                <img src="/material-symbols-exclamation-rounded.svg" alt="Quality" className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Avg Weight</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {Math.round(batchStats.averageWeight).toLocaleString()} tons
                </p>
              </div>
              <div className="w-12 h-12 bg-[#ff6b00] bg-opacity-20 rounded-lg flex items-center justify-center">
                <img src="/tabler-chart-pie-filled.svg" alt="Average" className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Generate QR Button */}
        <div className="mb-8 flex gap-4">
          <Button
            onClick={() => setShowQRForm(true)}
            className="bg-[#ff6b00] hover:bg-[#e55a00] text-white px-6 py-3 rounded-lg font-medium"
          >
            Generate New QR Code
          </Button>
          <Button
            onClick={() => setShowQRScanner(true)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-[#3c3c3c] px-6 py-3 rounded-lg font-medium"
          >
            Scan QR Code
          </Button>
        </div>

        {/* QR Generation Form */}
        {showQRForm && (
          <Card className="mb-8 p-6 bg-[#2c2c2c] border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Generate QR Code for Coal Batch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Weight (tons)</label>
                <Input
                  type="number"
                  placeholder="Enter weight in tons"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="bg-[#1e1e1e] border-gray-600 text-white"
                  max={config.qrTracking.maxWeight}
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Quality Grade</label>
                <select
                  value={formData.quality}
                  onChange={(e) => handleInputChange('quality', e.target.value)}
                  className="w-full p-3 bg-[#1e1e1e] border border-gray-600 rounded-lg text-white"
                >
                  <option value="">Select quality</option>
                  {qualityOptions.map(quality => (
                    <option key={quality} value={quality}>{quality}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mine Location</label>
                <select
                  value={formData.mineLocation}
                  onChange={(e) => handleInputChange('mineLocation', e.target.value)}
                  className="w-full p-3 bg-[#1e1e1e] border border-gray-600 rounded-lg text-white"
                >
                  <option value="">Select mine location</option>
                  {mineLocationOptions.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Dispatch Time</label>
                <Input
                  type="datetime-local"
                  value={formData.dispatchTime}
                  onChange={(e) => handleInputChange('dispatchTime', e.target.value)}
                  className="bg-[#1e1e1e] border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={generateQRCode}
                disabled={isGeneratingQR}
                className="bg-[#ff6b00] hover:bg-[#e55a00] text-white px-6 py-2 rounded-lg"
              >
                {isGeneratingQR ? 'Generating...' : 'Generate QR & PDF'}
              </Button>
              <Button
                onClick={() => setShowQRForm(false)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-[#3c3c3c]"
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Coal Batches List */}
        <div className="bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Coal Batches</h2>
          {coalBatches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No coal batches found. Generate your first QR code!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {coalBatches.map((batch) => (
                <div key={batch.id} className="bg-[#1e1e1e] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                        <img src={batch.qrCode} alt={`QR Code for ${batch.id}`} className="w-12 h-12" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{batch.id}</h3>
                        <p className="text-gray-400 text-sm">{batch.mineLocation}</p>
                      </div>
                    </div>
                    <Badge className={getQualityColor(batch.quality)}>
                      {batch.quality}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-gray-400 text-sm">Weight:</span>
                      <p className="text-white font-medium">{batch.weight.toLocaleString()} tons</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Dispatch Time:</span>
                      <p className="text-white font-medium">
                        {batch.dispatchTime.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Status:</span>
                      <p className="text-green-400 font-medium">Active</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">PDF Generated:</span>
                      <p className="text-green-400 font-medium">Ready</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={() => downloadQRCode(batch)}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-[#3c3c3c]"
                    >
                      Download QR
                    </Button>
                    <Button
                      onClick={() => downloadPDF(batch)}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-[#3c3c3c]"
                    >
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-[#3c3c3c]"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-[#2c2c2c] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">How QR Tracking Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b00] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#ff6b00] text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Generate QR Code</h3>
              <p className="text-gray-400 text-sm">Create unique QR codes for each coal batch with production details</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b00] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#ff6b00] text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Attach to Batch</h3>
              <p className="text-gray-400 text-sm">Print and attach QR codes to coal batches for easy identification</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b00] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#ff6b00] text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Scan & Access</h3>
              <p className="text-gray-400 text-sm">Receivers scan QR codes to access detailed PDF reports instantly</p>
            </div>
          </div>
        </div>

        {/* Scanned Batch Details */}
        {scannedBatch && (
          <Card className="mb-8 p-6 bg-[#2c2c2c] border border-[#ff6b00]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Scanned Batch Details</h2>
              <Button
                onClick={() => setScannedBatch(null)}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-[#3c3c3c]"
              >
                Close
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-white mb-2">Batch Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Batch ID:</span>
                    <span className="text-white font-medium">{scannedBatch.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weight:</span>
                    <span className="text-white font-medium">{scannedBatch.weight.toLocaleString()} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quality:</span>
                    <Badge className={getQualityColor(scannedBatch.quality)}>
                      {scannedBatch.quality}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white font-medium">{scannedBatch.mineLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dispatch Time:</span>
                    <span className="text-white font-medium">
                      {scannedBatch.dispatchTime.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-2">Actions</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => downloadPDF(scannedBatch)}
                    className="w-full bg-[#ff6b00] hover:bg-[#e55a00] text-white"
                  >
                    Download PDF Report
                  </Button>
                  <Button
                    onClick={() => downloadQRCode(scannedBatch)}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-[#3c3c3c]"
                  >
                    Download QR Code
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* QR Scanner Modal */}
        <QRScanner
          isOpen={showQRScanner}
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />

        {/* Newly Generated QR Code Popup */}
        {newlyGeneratedBatch && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <Card className="bg-[#2c2c2c] border border-gray-700 p-8 max-w-sm w-full mx-4 text-center">
              <h2 className="text-xl font-semibold text-white mb-4">QR Code Generated!</h2>
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                <img 
                  src={newlyGeneratedBatch.qrCode} 
                  alt={`QR Code for ${newlyGeneratedBatch.id}`} 
                  className="w-48 h-48" 
                />
              </div>
              <p className="text-gray-300 font-mono text-sm mb-6">{newlyGeneratedBatch.id}</p>
              
              <div className="space-y-3">
                <Button
                  onClick={() => downloadQRCode(newlyGeneratedBatch)}
                  className="w-full bg-[#ff6b00] hover:bg-[#e55a00] text-white"
                >
                  Download QR Code
                </Button>
                <Button
                  onClick={() => setNewlyGeneratedBatch(null)}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-[#3c3c3c]"
                >
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}; 