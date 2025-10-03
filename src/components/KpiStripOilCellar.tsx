import React from 'react';
import { DataCard } from '@/components/DataCard';
import { StatusIndicator } from '@/components/StatusIndicator';
import { GaugeDisplay } from '@/components/GaugeDisplay';
import { Activity, Droplet, CheckCircle, Shield } from 'lucide-react';

export const KpiStripOilCellar: React.FC = () => {
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
    safety: {
      withoutPPE: 0,
      totalEntered: 3
    },
    accessControl: {
      status: 'Authorized',
      fireExtSystem: 'Active',
      unsafeActs: 0
    }
  };

  return (
    <div className="px-6 pb-4">
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
              <div className="text-sm font-semibold text-secondary">{systemData.coilData.grade}</div>
            </div>
          </div>
        </DataCard>

        {/* Roll Coolant Parameters */}
        <DataCard title="Roll Coolant Parameters" icon={Droplet} variant="success">
          <div className="space-y-4">
            <GaugeDisplay label="Tank Level" value={systemData.coolantSystem.tankLevel} unit="%" thresholds={{ warning: 30, danger: 15 }} />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Temperature</div>
                <div className="font-mono font-semibold text-success">{systemData.coolantSystem.temperature}°C</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Concentration</div>
                <div className="font-mono font-semibold text-success">{systemData.coolantSystem.concentration}%</div>
              </div>
            </div>
          </div>
        </DataCard>

        {/* Safety Snapshot (replaces Main Hydraulic) */}
        <DataCard title="Safety Snapshot" icon={CheckCircle} variant="primary">
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Without PPE</div>
            <div className={`text-2xl font-mono font-bold ${systemData.safety.withoutPPE === 0 ? 'text-success' : 'text-danger'}`}>{systemData.safety.withoutPPE}</div>

            <div className="mt-2 text-xs text-muted-foreground">Total Entered</div>
            <div className="text-lg font-mono font-semibold text-primary">{systemData.safety.totalEntered}</div>

            <div className="flex items-center space-x-3 mt-3">
              <div className={`w-3 h-3 rounded-full ${systemData.safety.withoutPPE === 0 ? 'bg-success' : 'bg-danger'}`}></div>
              <div className="text-sm font-medium">PPE Compliance</div>
              <div className={`ml-auto text-lg font-mono font-bold ${systemData.safety.withoutPPE === 0 ? 'text-success' : 'text-danger'}`}>{systemData.safety.withoutPPE === 0 ? 'Compliant' : 'Violation'}</div>
            </div>
          </div>
        </DataCard>

        {/* Access Control (replaces Auxiliary Hydraulic) */}
        <DataCard title="Access Control" icon={Shield} variant="success">
          <div className="space-y-3">
            <StatusIndicator status="active" label="Access Status" value={systemData.accessControl.status} />
            <StatusIndicator status="active" label="Fire Ext. System" value={systemData.accessControl.fireExtSystem} />
            <div className="flex justify-between items-center">
              <span className="text-sm">Unsafe Acts Today</span>
              <span className={`font-mono font-bold ${systemData.accessControl.unsafeActs === 0 ? 'text-success' : 'text-warning'}`}>{systemData.accessControl.unsafeActs}</span>
            </div>
          </div>
        </DataCard>
      </div>
    </div>
  );
};
