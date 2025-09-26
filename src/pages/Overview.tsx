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
            <div className="relative h-full bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-dashed border-border/30 flex items-center justify-center">
              {/* Interactive System Schematic */}
              <div className="text-center space-y-4">
                <div className="grid grid-cols-3 gap-8 items-center">
                  {/* Clean Tank */}
                  <div className="text-center">
                    <div className="w-16 h-20 bg-success/20 border-2 border-success rounded-lg mx-auto mb-2 relative overflow-hidden">
                      <div 
                        className="absolute bottom-0 w-full bg-gradient-success transition-all duration-1000"
                        style={{ height: `${systemData.coolantSystem.tankLevel}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Droplet className="h-6 w-6 text-success" />
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-success">Clean Tank</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {systemData.coolantSystem.tankLevel}%
                    </div>
                  </div>

                  {/* Pump System */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-full mx-auto mb-2 flex items-center justify-center">
                      <RotateCcw className="h-6 w-6 text-primary animate-spin-slow" />
                    </div>
                    <div className="text-xs font-semibold text-primary">Main Pump</div>
                    <div className="text-xs text-muted-foreground">Active</div>
                  </div>

                  {/* Dirty Tank */}
                  <div className="text-center">
                    <div className="w-16 h-20 bg-warning/20 border-2 border-warning rounded-lg mx-auto mb-2 relative overflow-hidden">
                      <div 
                        className="absolute bottom-0 w-full bg-gradient-warning transition-all duration-1000"
                        style={{ height: '45%' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-warning" />
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-warning">Dirty Tank</div>
                    <div className="text-xs text-muted-foreground font-mono">45%</div>
                  </div>
                </div>

                {/* Flow Lines */}
                <div className="flex justify-center items-center space-x-8 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-1 bg-success rounded-full" />
                    <div className="w-4 h-1 bg-success rounded-full animate-flow" />
                    <div className="w-4 h-1 bg-success rounded-full" />
                    <span className="text-xs text-success">Clean Flow</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-1 bg-warning rounded-full" />
                    <div className="w-4 h-1 bg-warning rounded-full animate-flow" />
                    <div className="w-4 h-1 bg-warning rounded-full" />
                    <span className="text-xs text-warning">Return Flow</span>
                  </div>
                </div>
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