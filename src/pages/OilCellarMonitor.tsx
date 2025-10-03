import React from 'react';
import { DataCard } from '@/components/DataCard';
import { StatusIndicator } from '@/components/StatusIndicator';
import { GaugeDisplay } from '@/components/GaugeDisplay';
import { 
  Shield, 
  Users, 
  Thermometer, 
  Wind, 
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const OilCellarMonitor = () => {
  const safetyData = {
    personnel: {
      withoutPPE: 0,
      totalEntered: 3,
      averageAQI: 42,
      humidity: 65.2,
      temperature: 23.8
    },
    accessControl: {
      status: 'authorized',
      fireExtSystem: 'active',
      unsafeActs: 2
    },
    lighting: [
      { area: 'Area#1', status: 'active', illumination: 450 },
      { area: 'Area#2', status: 'active', illumination: 420 },
      { area: 'Area#3', status: 'active', illumination: 380 },
      { area: 'Area#4', status: 'warning', illumination: 280 },
      { area: 'Area#5', status: 'active', illumination: 440 }
    ],
    airQuality: [
      { area: 'Area#1', aqi: 38, pm25: 12, voc: 0.3, oxygen: 20.9 },
      { area: 'Area#2', aqi: 45, pm25: 18, voc: 0.4, oxygen: 20.8 },
      { area: 'Area#3', aqi: 41, pm25: 14, voc: 0.2, oxygen: 21.0 },
      { area: 'Area#4', aqi: 52, pm25: 22, voc: 0.6, oxygen: 20.7 }
    ],
    personnel_tracking: [
      { id: 'EMP001', name: 'John Smith', location: 'Area#1', ppe: true, entryTime: '09:15' },
      { id: 'EMP002', name: 'Maria Garcia', location: 'Area#2', ppe: true, entryTime: '09:32' },
      { id: 'EMP003', name: 'David Chen', location: 'Area#3', ppe: true, entryTime: '10:45' }
    ]
  };

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return 'success';
    if (aqi <= 100) return 'warning';
    return 'danger';
  };

  const getLightingStatus = (illumination: number) => {
    if (illumination >= 400) return 'success';
    if (illumination >= 300) return 'warning';
    return 'danger';
  };

  return (
    <div className="space-y-6">
      {/* KPI header provided by Layout; duplicates removed on this page */}
      <div className="h-4" />



      {/* Main Monitoring Dashboard removed per request */}
      <div />
    </div>
  );
};
