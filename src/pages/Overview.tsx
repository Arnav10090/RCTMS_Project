import React from 'react';
import { DataCard } from '@/components/DataCard';
import { StatusIndicator } from '@/components/StatusIndicator';
import { GaugeDisplay } from '@/components/GaugeDisplay';
import {
  Activity,
  Droplet,
  Thermometer,
  Gauge,
  Wrench,
  AlertCircle,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import PidDiagram from '@/components/PidDiagram';

export const Overview = () => {
  // Mock real-time data - in production this would come from your API
  const systemData = {
    coilData: {
      id: 'RC-2024-001',
      width: 1250.5,
      thickness: 2.85,
      grade: 'AISI 304'
    },
    coolantSystem: {
      tankLevel: 87.3,
      temperature: 18.5,
      concentration: 5.2
    },
    mainHydraulic: {
      pressure: 145.8,
      temperature: 42.1,
      status: 'Running',
      contamination: 0.85,
      waterSaturation: 2.1
    },
    auxiliaryHydraulic: {
      pressure: 142.3,
      temperature: 39.8,
      status: 'Standby',
      syncStatus: 'Synchronized'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Running Coil Data */}
        <DataCard title="Running Coil Data" icon={Activity} variant="primary">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground">Coil ID</div>
              <div className="text-lg font-mono font-bold text-primary">
                {systemData.coilData.id}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Width</div>
                <div className="font-mono font-semibold">
                  {systemData.coilData.width} mm
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Thickness</div>
                <div className="font-mono font-semibold">
                  {systemData.coilData.thickness} mm
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Grade</div>
              <div className="text-sm font-semibold text-secondary">
                {systemData.coilData.grade}
              </div>
            </div>
          </div>
        </DataCard>

        {/* Roll Coolant Parameters */}
        <DataCard title="Roll Coolant Parameters" icon={Droplet} variant="success">
          <div className="space-y-4">
            <GaugeDisplay
              label="Tank Level"
              value={systemData.coolantSystem.tankLevel}
              unit="%"
              thresholds={{
                warning: 30,
                danger: 15
              }}
            />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Temperature</div>
                <div className="font-mono font-semibold text-success">
                  {systemData.coolantSystem.temperature}°C
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Concentration</div>
                <div className="font-mono font-semibold text-success">
                  {systemData.coolantSystem.concentration}%
                </div>
              </div>
            </div>
          </div>
        </DataCard>

        {/* Main Hydraulic System */}
        <DataCard title="Main Hydraulic System" icon={Gauge}>
          <div className="space-y-3">
            <StatusIndicator 
              status="active" 
              label="System Status" 
              value={systemData.mainHydraulic.status}
            />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Pressure</div>
                <div className="font-mono font-semibold">
                  {systemData.mainHydraulic.pressure} bar
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Temperature</div>
                <div className="font-mono font-semibold">
                  {systemData.mainHydraulic.temperature}°C
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Contamination</div>
                <div className="font-mono font-semibold">
                  {systemData.mainHydraulic.contamination} mg/L
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Water Sat.</div>
                <div className="font-mono font-semibold">
                  {systemData.mainHydraulic.waterSaturation}%
                </div>
              </div>
            </div>
          </div>
        </DataCard>

        {/* Auxiliary Hydraulic System */}
        <DataCard title="Auxiliary Hydraulic System" icon={Wrench}>
          <div className="space-y-3">
            <StatusIndicator 
              status="warning" 
              label="System Status" 
              value={systemData.auxiliaryHydraulic.status}
            />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Pressure</div>
                <div className="font-mono font-semibold">
                  {systemData.auxiliaryHydraulic.pressure} bar
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Temperature</div>
                <div className="font-mono font-semibold">
                  {systemData.auxiliaryHydraulic.temperature}°C
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Sync Status</div>
              <div className="text-sm font-semibold text-success">
                {systemData.auxiliaryHydraulic.syncStatus}
              </div>
            </div>
          </div>
        </DataCard>
      </div>

      {/* Central System Visualization */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* P&ID Diagram */}
        <div className="xl:col-span-8">
          <DataCard title="System P&ID Diagram" className="h-96">
            <div className="h-full w-full">
              {/* Interactive, editable SVG diagram component */}
              <div className="p-2 h-full">
                <PidDiagram />
              </div>
            </div>
          </DataCard>
        </div>

        {/* System Status Panel */}
        <div className="xl:col-span-4 space-y-4">
          <DataCard title="System Trends" icon={TrendingUp}>
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">Last 24 Hours</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Temperature</span>
                  <span className="text-sm font-mono text-success">↗ +2.1°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pressure</span>
                  <span className="text-sm font-mono text-success">↗ +5.3 bar</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Flow Rate</span>
                  <span className="text-sm font-mono text-warning">↘ -0.8 L/min</span>
                </div>
              </div>
            </div>
          </DataCard>

          <DataCard title="Lubrication System" icon={Thermometer}>
            <div className="space-y-3">
              <StatusIndicator 
                status="active" 
                label="Gear Lubrication" 
                value="Normal"
              />
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Pump #1</span>
                  <span className="font-mono text-success">Running</span>
                </div>
                <div className="flex justify-between">
                  <span>Pump #2</span>
                  <span className="font-mono text-muted-foreground">Standby</span>
                </div>
                <div className="flex justify-between">
                  <span>Oil Distribution</span>
                  <span className="font-mono text-success">Optimal</span>
                </div>
              </div>
            </div>
          </DataCard>
        </div>
      </div>
    </div>
  );
};
