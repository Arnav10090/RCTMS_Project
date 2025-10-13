import React from 'react';
import { DataCard } from '@/components/DataCard';
import { HydraulicSchematic } from '@/components/HydraulicSchematic';

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
          <DataCard title="HMI-02: Hydraulic System Schematic" className="h-[700px]">
            <div className="relative h-full rounded-lg border border-border/50 bg-background">
              {/* SVG-built schematic using public svgs */}
              <HydraulicSchematic className="absolute inset-0" />
            </div>
          </DataCard>
        </div>
      </div>
    </div>
  );
};
