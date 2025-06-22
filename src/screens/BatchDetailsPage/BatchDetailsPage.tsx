import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { qrDatabase } from '../../Module/qrDatabase';
import { CoalBatchData } from '../../Module/qrService';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export const BatchDetailsPage = (): JSX.Element => {
  const { batchId } = useParams<{ batchId: string }>();
  const [batch, setBatch] = useState<CoalBatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBatch = async () => {
      if (!batchId) {
        setError('No batch ID provided.');
        setLoading(false);
        return;
      }
      try {
        const data = await qrDatabase.getBatchById(batchId);
        if (data) {
          setBatch(data);
        } else {
          setError(`Batch with ID "${batchId}" not found.`);
        }
      } catch (e) {
        console.error('Error fetching batch data:', e);
        setError('Failed to fetch batch details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBatch();
  }, [batchId]);

  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'premium': return 'bg-green-500 bg-opacity-20 text-green-400';
      case 'standard': return 'bg-blue-500 bg-opacity-20 text-blue-400';
      case 'low': return 'bg-yellow-500 bg-opacity-20 text-yellow-400';
      default: return 'bg-gray-500 bg-opacity-20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#1e1e1e] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <p className="ml-4 text-lg">Loading Batch Details...</p>
      </div>
    );
  }
  
  if (error || !batch) {
    return (
      <div className="w-full h-screen bg-[#1e1e1e] text-white flex flex-col items-center justify-center p-4 text-center">
        <img src="/material-symbols-exclamation-rounded.svg" alt="Error" className="w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-red-400 mb-2">Verification Failed</h1>
        <p className="text-gray-400 max-w-md">{error || 'The requested batch could not be found.'}</p>
      </div>
    );
  }
  
  return (
    <div className="w-full min-h-screen bg-[#131313] text-white p-4 sm:p-8">
      <header className="max-w-4xl mx-auto mb-8 flex items-center gap-4">
        <img src="/LOGO.png" alt="MineGuard Logo" className="w-12 h-12" />
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">MineGuard</h1>
            <p className="text-[#ff6b00]">Coal Batch Verification</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <Card className="bg-[#2c2c2c] border border-gray-700 p-6 sm:p-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 text-center md:text-left">
              <div className="bg-white p-2 rounded-lg inline-block">
                <img src={batch.qrCode} alt={`QR Code for ${batch.id}`} className="w-40 h-40" />
              </div>
              <p className="text-gray-400 font-mono text-xs mt-2">{batch.id}</p>
            </div>

            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-white mb-4">Batch Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#1e1e1e] rounded-lg">
                  <span className="text-gray-400">Quality Grade:</span>
                  <Badge className={getQualityColor(batch.quality)}>
                    {batch.quality}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e1e1e] rounded-lg">
                  <span className="text-gray-400">Weight:</span>
                  <span className="text-white font-medium">{batch.weight.toLocaleString()} tons</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e1e1e] rounded-lg">
                  <span className="text-gray-400">Mine Location:</span>
                  <span className="text-white font-medium">{batch.mineLocation}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#1e1e1e] rounded-lg">
                  <span className="text-gray-400">Dispatch Time:</span>
                  <span className="text-white font-medium">{batch.dispatchTime.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-green-400">
                <img src="/material-symbols-person-check-rounded.svg" alt="Verified" className="w-6 h-6" />
                <span className="font-semibold">Verified by MineGuard System</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
                This information is recorded on our secure internal database.
            </p>
          </div>
        </Card>
      </main>
      
      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MineGuard. All rights reserved.</p>
      </footer>
    </div>
  );
}; 