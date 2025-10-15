import React, { useMemo } from 'react';
import { DataCard } from '@/components/DataCard';
import { GaugeDisplay } from '@/components/GaugeDisplay';
import { Activity, Droplet, CheckCircle, Shield } from 'lucide-react';

export const KpiStripOilCellar: React.FC = () => {
  const randomGrade = useMemo(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const len = 8;
    let s = '';
    for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
    return `G-${s}`;
  }, []);

  const systemData = {
    coilData: {
      id: 'RC-2024-001',
      width: 1250.5,
      thickness: 2.85,
      grade: randomGrade
    },
    coolantSystem: {
      tankLevel: 87.3,
      temperature: 18.5,
      concentration: 5.2
    },
    safety: {
      withoutPPE: 0,
      totalEntered: 3,
      averageAQI: 42,
      humidity: 65.2,
      temperature: 23.8,
      status: 'Normal'
    },
    accessControl: {
      status: 'Authorized',
      fireExtSystem: 'Active',
      unsafeActs: 0
    }
  };

  return (
    <div className="mt-6 px-6 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Running Coil Data */}
        <DataCard title="Running Coil Data" icon={Activity} variant="primary">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground">Coil ID</div>
              <div className="text-lg font-mono font-bold text-primary">{systemData.coilData.id}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Width</div>
                <div className="font-mono font-semibold">{systemData.coilData.width} mm</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Thickness</div>
                <div className="font-mono font-semibold">{systemData.coilData.thickness} mm</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Grade</div>
              <div className="text-sm font-semibold text-secondary dark:text-white">{systemData.coilData.grade}</div>
            </div>
          </div>
        </DataCard>

        {/* Roll Coolant Parameters */}
        <DataCard title="Roll Coolant Parameters" icon={Droplet} variant="success">
          <div className="space-y-4">
            <GaugeDisplay label="Tank Level" value={systemData.coolantSystem.tankLevel} unit="%" thresholds={{ warning: 30, danger: 15 }} />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Coolant Temperature</div>
                <div className="font-mono font-semibold text-success">{systemData.coolantSystem.temperature}°C</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Coolant Concentration</div>
                <div className="font-mono font-semibold text-success">{systemData.coolantSystem.concentration}%</div>
              </div>
            </div>
          </div>
        </DataCard>

        {/* Oil Cellar Status (replace with Main Hydraulic) */}
        <DataCard title="Main Hydraulic System" icon={CheckCircle} variant="primary">
          <div className="space-y-3">
            <GaugeDisplay label="Tank Level" value={systemData.coolantSystem.tankLevel} unit="%" thresholds={{ warning: 30, danger: 15 }} />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Oil Temperature</div>
                <div className="font-mono font-semibold">{systemData.safety.temperature}°C</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">System Pressure</div>
                <div className="font-mono font-semibold">--</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Solid Contamination</div>
                <div className="font-mono font-semibold">--</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Water Saturation</div>
                <div className="font-mono font-semibold">--</div>
              </div>
            </div>
          </div>
        </DataCard>

        {/* Access Control (replace with Auxiliary Hydraulic) */}
        <DataCard title="Auxiliary Hydraulic System" icon={Shield} variant="success">
          <div className="space-y-3">
            <GaugeDisplay label="Tank Level" value={systemData.coolantSystem.tankLevel} unit="%" thresholds={{ warning: 30, danger: 15 }} />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Oil Temperature</div>
                <div className="font-mono font-semibold">--</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">System Pressure</div>
                <div className="font-mono font-semibold">--</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Solid Contamination</div>
                <div className="font-mono font-semibold">--</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Water Saturation</div>
                <div className="font-mono font-semibold">--</div>
              </div>
            </div>
          </div>
        </DataCard>
      </div>
    </div>
  );
};
