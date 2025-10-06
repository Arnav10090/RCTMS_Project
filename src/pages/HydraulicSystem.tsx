import React from 'react';
import { DataCard } from '@/components/DataCard';
import { StatusIndicator } from '@/components/StatusIndicator';
import { GaugeDisplay } from '@/components/GaugeDisplay';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Play, 
  Square, 
  RotateCcw,
  Droplets,
  Thermometer,
  Filter
} from 'lucide-react';

export const HydraulicSystem = () => {
  const systemData = {
    dmWater: {
      flowRate: 45.2,
      pressure: 3.2,
      conductivity: 0.8,
      pH: 6.8,
      temperature: 22.1
    },
    heatExchanger: {
      inletTemp: 42.1,
      outletTemp: 25.8,
      efficiency: 94.2,
      bypassPosition: 15
    },
    filtrationSystem: {
      pressureDiff: 1.2,
      replacementDue: 72,
      backwashStatus: 'Idle',
      bypassFlow: 0
    },
    pumps: [
      { id: 'P001', name: 'Main Circulation', status: 'running', speed: 87, power: 12.5 },
      { id: 'P002', name: 'Backup Circulation', status: 'standby', speed: 0, power: 0 },
      { id: 'P003', name: 'Filtration Pump', status: 'running', speed: 92, power: 8.3 },
      { id: 'P004', name: 'Cooling Pump', status: 'running', speed: 78, power: 6.2 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Main Control Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* System Schematic */}
        <div className="xl:col-span-3">
          <DataCard title="Hydraulic System Schematic" className="h-96">
            <div className="relative h-full bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-dashed border-border/30">
              <div className="absolute inset-4 flex flex-col justify-between">
                {/* Top Row - Heat Exchangers */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-warning/20 border-2 border-warning rounded-lg flex items-center justify-center">
                      <Thermometer className="h-6 w-6 text-warning" />
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold">Heat Exchanger</div>
                      <div className="text-muted-foreground">Inlet: {systemData.heatExchanger.inletTemp}°C</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-xs text-right">
                      <div className="font-semibold">Cooling Tower</div>
                      <div className="text-muted-foreground">Fan: Active</div>
                    </div>
                    <div className="w-16 h-12 bg-success/20 border-2 border-success rounded-lg flex items-center justify-center">
                      <RotateCcw className="h-6 w-6 text-success animate-spin-slow" />
                    </div>
                  </div>
                </div>

                {/* Middle Row - Tanks */}
                <div className="flex justify-center items-center space-x-12">
                  <div className="text-center">
                    <div className="w-20 h-24 bg-primary/20 border-2 border-primary rounded-lg mb-2 relative overflow-hidden">
                      <div className="absolute bottom-0 w-full bg-gradient-primary h-3/4" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Droplets className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-xs font-semibold">Oil Tank</div>
                    <div className="text-xs text-muted-foreground">Level: 78%</div>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-24 bg-success/20 border-2 border-success rounded-lg mb-2 relative overflow-hidden">
                      <div className="absolute bottom-0 w-full bg-gradient-success h-4/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Droplets className="h-8 w-8 text-success" />
                      </div>
                    </div>
                    <div className="text-xs font-semibold">Clean Tank</div>
                    <div className="text-xs text-muted-foreground">Level: 87%</div>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-24 bg-warning/20 border-2 border-warning rounded-lg mb-2 relative overflow-hidden">
                      <div className="absolute bottom-0 w-full bg-gradient-warning h-2/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Droplets className="h-8 w-8 text-warning" />
                      </div>
                    </div>
                    <div className="text-xs font-semibold">Dirty Tank</div>
                    <div className="text-xs text-muted-foreground">Level: 45%</div>
                  </div>
                </div>

                {/* Bottom Row - Pumps */}
                <div className="flex justify-between items-center">
                  {systemData.pumps.slice(0, 2).map((pump) => (
                    <div key={pump.id} className="flex items-center space-x-3">
                      <div className={`w-12 h-12 border-2 rounded-full flex items-center justify-center ${
                        pump.status === 'running'
                          ? 'bg-success/20 border-success'
                          : 'bg-muted/20 border-muted-foreground'
                      }`}>
                        <RotateCcw className={`h-6 w-6 ${
                          pump.status === 'running'
                            ? 'text-success animate-spin-slow'
                            : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="text-xs">
                        <div className="font-semibold">{pump.name}</div>
                        <div className="text-muted-foreground">
                          {pump.status === 'running' ? `${pump.speed}%` : 'Standby'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DataCard>
        </div>
      </div>
    </div>
  );
};
