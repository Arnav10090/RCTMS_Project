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



      {/* Main Monitoring Dashboard */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Floor Plan and Personnel Tracking */}
        <div className="xl:col-span-2">
          <DataCard title="Oil Cellar Floor Plan & Personnel Tracking" className="h-96">
            <div className="relative h-full bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-dashed border-border/30">
              <div className="absolute inset-4">
                {/* Floor Plan Grid */}
                <div className="grid grid-cols-4 grid-rows-3 gap-2 h-full">
                  {/* Area Labels and Personnel */}
                  {[1, 2, 3, 4].map(area => {
                    const areaData = safetyData.airQuality.find(a => a.area === `Area#${area}`);
                    const lightData = safetyData.lighting.find(l => l.area === `Area#${area}`);
                    const personnel = safetyData.personnel_tracking.filter(p => p.location === `Area#${area}`);
                    
                    return (
                      <div key={area} className={`
                        border-2 rounded-lg p-2 relative
                        ${getAQIStatus(areaData?.aqi || 0) === 'success' ? 'border-success bg-success/5' : 
                          getAQIStatus(areaData?.aqi || 0) === 'warning' ? 'border-warning bg-warning/5' : 
                          'border-danger bg-danger/5'}
                      `}>
                        <div className="text-xs font-semibold mb-1">Area #{area}</div>
                        
                        {/* Lighting Indicator */}
                        <div className="flex items-center space-x-1 mb-1">
                          <Lightbulb className={`h-3 w-3 ${
                            getLightingStatus(lightData?.illumination || 0) === 'success' ? 'text-success' :
                            getLightingStatus(lightData?.illumination || 0) === 'warning' ? 'text-warning' :
                            'text-danger'
                          }`} />
                          <span className="text-xs">{lightData?.illumination} lux</span>
                        </div>

                        {/* AQI Indicator */}
                        <div className="flex items-center space-x-1 mb-2">
                          <Wind className={`h-3 w-3 ${
                            getAQIStatus(areaData?.aqi || 0) === 'success' ? 'text-success' :
                            getAQIStatus(areaData?.aqi || 0) === 'warning' ? 'text-warning' :
                            'text-danger'
                          }`} />
                          <span className="text-xs">AQI: {areaData?.aqi}</span>
                        </div>

                        {/* Personnel Icons */}
                        {personnel.map((person, idx) => (
                          <div key={person.id} className={`
                            absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                            ${person.ppe ? 'bg-success text-success-foreground' : 'bg-danger text-danger-foreground'}
                            ${idx === 0 ? 'top-8 right-2' : 'bottom-2 left-2'}
                          `}>
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        ))}
                      </div>
                    );
                  })}

                  {/* Emergency Equipment */}
                  <div className="col-span-4 flex justify-around items-center pt-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-danger rounded-full flex items-center justify-center">
                        <Shield className="h-2 w-2 text-white" />
                      </div>
                      <span className="text-xs">Fire Extinguisher</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <Users className="h-2 w-2 text-white" />
                      </div>
                      <span className="text-xs">Emergency Exit</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                        <Thermometer className="h-2 w-2 text-white" />
                      </div>
                      <span className="text-xs">Safety Shower</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DataCard>
        </div>

        {/* Personnel Management Panel */}
        <div className="space-y-4">
          <DataCard title="Personnel Tracking">
            <div className="space-y-3">
              {safetyData.personnel_tracking.map((person) => (
                <div key={person.id} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      person.ppe ? 'bg-success text-success-foreground' : 'bg-danger text-danger-foreground'
                    }`}>
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{person.name}</div>
                      <div className="text-xs text-muted-foreground">{person.id}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{person.location}</div>
                    <div className="text-xs text-muted-foreground">Entry: {person.entryTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </DataCard>

          <DataCard title="Environmental Monitoring">
            <div className="space-y-3">
              {safetyData.airQuality.map((area) => (
                <div key={area.area} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{area.area}</span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      getAQIStatus(area.aqi) === 'success' ? 'bg-success/20 text-success' :
                      getAQIStatus(area.aqi) === 'warning' ? 'bg-warning/20 text-warning' :
                      'bg-danger/20 text-danger'
                    }`}>
                      AQI: {area.aqi}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="text-muted-foreground">PM2.5</div>
                      <div className="font-mono">{area.pm25} µg/m³</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">VOC</div>
                      <div className="font-mono">{area.voc} ppm</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">O₂</div>
                      <div className="font-mono">{area.oxygen}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DataCard>

          <DataCard title="Safety Alerts" variant="warning">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm">Area#4 lighting below minimum</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm">High humidity in Area#2</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Last updated: 2 minutes ago
              </div>
            </div>
          </DataCard>
        </div>
      </div>
    </div>
  );
};
