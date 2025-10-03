import React from 'react';
import { DataCard } from '@/components/DataCard';
import { StatusIndicator } from '@/components/StatusIndicator';
import { GaugeDisplay } from '@/components/GaugeDisplay';
import { Activity, Droplet, Gauge, Wrench } from 'lucide-react';

export const KpiStrip: React.FC = () => {
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
    <div className="px-6 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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

        <DataCard title="Roll Coolant Parameters" icon={Droplet} variant="success">
          <div className="space-y-4">
            <GaugeDisplay
              label="Tank Level"
              value={systemData.coolantSystem.tankLevel}
              unit="%"
              thresholds={{ warning: 30, danger: 15 }}
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
    </div>
  );
};
