import React, { useState } from 'react';
import { DataCard } from '@/components/DataCard';
import { StatusIndicator } from '@/components/StatusIndicator';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Square, 
  Settings,
  RotateCcw,
  Clock,
  TrendingUp,
  Zap
} from 'lucide-react';

interface Equipment {
  id: string;
  serialNumber: string;
  description: string;
  operationStatus: 'idle' | 'start' | 'stop';
  mode: 'auto' | 'manual';
  monthlyHours: number;
  cumulativeHours: number;
  monthlyUtilization: number;
  cumulativeUtilization: number;
  group: string;
}

export const PumpOperations = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: 'RCP001',
      serialNumber: 'RCP-2024-001',
      description: 'Roll Coolant Pump#1',
      operationStatus: 'start',
      mode: 'auto',
      monthlyHours: 542.3,
      cumulativeHours: 12847.5,
      monthlyUtilization: 87.2,
      cumulativeUtilization: 92.1,
      group: 'coolant'
    },
    {
      id: 'RCP002',
      serialNumber: 'RCP-2024-002',
      description: 'Roll Coolant Pump#2',
      operationStatus: 'idle',
      mode: 'auto',
      monthlyHours: 156.7,
      cumulativeHours: 8934.2,
      monthlyUtilization: 25.2,
      cumulativeUtilization: 78.4,
      group: 'coolant'
    },
    {
      id: 'RCA001',
      serialNumber: 'RCA-CT-001',
      description: 'Roll Coolant Agitator (CT)',
      operationStatus: 'start',
      mode: 'auto',
      monthlyHours: 523.1,
      cumulativeHours: 15623.8,
      monthlyUtilization: 84.1,
      cumulativeUtilization: 89.7,
      group: 'coolant'
    },
    {
      id: 'RCA002',
      serialNumber: 'RCA-DT-001',
      description: 'Roll Coolant Agitator (DT)',
      operationStatus: 'start',
      mode: 'manual',
      monthlyHours: 487.9,
      cumulativeHours: 13456.3,
      monthlyUtilization: 78.5,
      cumulativeUtilization: 86.2,
      group: 'coolant'
    },
    {
      id: 'RCA003',
      serialNumber: 'RCA-OT-001',
      description: 'Roll Coolant Agitator (OT)',
      operationStatus: 'idle',
      mode: 'auto',
      monthlyHours: 234.6,
      cumulativeHours: 9876.4,
      monthlyUtilization: 37.7,
      cumulativeUtilization: 71.3,
      group: 'coolant'
    },
    {
      id: 'MS001',
      serialNumber: 'MS-2024-001',
      description: 'Magnetic Separator',
      operationStatus: 'start',
      mode: 'auto',
      monthlyHours: 598.7,
      cumulativeHours: 18234.9,
      monthlyUtilization: 96.3,
      cumulativeUtilization: 94.8,
      group: 'coolant'
    },
    {
      id: 'MH001',
      serialNumber: 'MH-PRI-001',
      description: 'Main Hyd #1',
      operationStatus: 'start',
      mode: 'auto',
      monthlyHours: 612.4,
      cumulativeHours: 16789.2,
      monthlyUtilization: 98.5,
      cumulativeUtilization: 91.3,
      group: 'main-hydraulic'
    },
    {
      id: 'MH002',
      serialNumber: 'MH-SEC-001',
      description: 'Main Hyd#2',
      operationStatus: 'idle',
      mode: 'auto',
      monthlyHours: 45.3,
      cumulativeHours: 7234.1,
      monthlyUtilization: 7.3,
      cumulativeUtilization: 68.7,
      group: 'main-hydraulic'
    },
    {
      id: 'MHC001',
      serialNumber: 'MHC-001',
      description: 'Main Hyd. Cooling Pump',
      operationStatus: 'start',
      mode: 'auto',
      monthlyHours: 589.2,
      cumulativeHours: 15234.7,
      monthlyUtilization: 94.8,
      cumulativeUtilization: 88.9,
      group: 'main-hydraulic'
    },
    {
      id: 'AH001',
      serialNumber: 'AH-001',
      description: 'Aux. Hyd Pump#1',
      operationStatus: 'start',
      mode: 'auto',
      monthlyHours: 456.8,
      cumulativeHours: 11987.3,
      monthlyUtilization: 73.5,
      cumulativeUtilization: 83.2,
      group: 'aux-hydraulic'
    },
    {
      id: 'AH002',
      serialNumber: 'AH-002',
      description: 'Aux. Hyd Pump#2',
      operationStatus: 'idle',
      mode: 'auto',
      monthlyHours: 123.4,
      cumulativeHours: 6789.5,
      monthlyUtilization: 19.9,
      cumulativeUtilization: 65.4,
      group: 'aux-hydraulic'
    },
    {
      id: 'AH003',
      serialNumber: 'AH-003',
      description: 'Aux. Hyd Pump#3',
      operationStatus: 'stop',
      mode: 'manual',
      monthlyHours: 0,
      cumulativeHours: 4523.2,
      monthlyUtilization: 0,
      cumulativeUtilization: 52.1,
      group: 'aux-hydraulic'
    },
    {
      id: 'AHC001',
      serialNumber: 'AHC-001',
      description: 'Aux Hyd. Cooling Pump',
      operationStatus: 'start',
      mode: 'auto',
      monthlyHours: 434.7,
      cumulativeHours: 10234.8,
      monthlyUtilization: 69.9,
      cumulativeUtilization: 79.6,
      group: 'aux-hydraulic'
    },
    {
      id: 'GL001',
      serialNumber: 'GL-001',
      description: 'Gear Lubn Pump#1',
      operationStatus: 'start',
      mode: 'auto',
      monthlyHours: 578.3,
      cumulativeHours: 14567.9,
      monthlyUtilization: 93.0,
      cumulativeUtilization: 90.4,
      group: 'lubrication'
    },
    {
      id: 'GL002',
      serialNumber: 'GL-002',
      description: 'Gear Lubn Pump#2',
      operationStatus: 'idle',
      mode: 'auto',
      monthlyHours: 67.2,
      cumulativeHours: 5432.1,
      monthlyUtilization: 10.8,
      cumulativeUtilization: 61.8,
      group: 'lubrication'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'start': return 'active';
      case 'stop': return 'danger';
      case 'idle': return 'warning';
      default: return 'idle';
    }
  };

  const getGroupSummary = (group: string) => {
    const groupEquipment = equipment.filter(e => e.group === group);
    const running = groupEquipment.filter(e => e.operationStatus === 'start').length;
    const total = groupEquipment.length;
    const avgUtilization = groupEquipment.reduce((sum, e) => sum + e.monthlyUtilization, 0) / total;
    
    return { running, total, avgUtilization };
  };

  return (
    <div className="space-y-6">
          {/* Equipment Operations Table */}
      <DataCard title="Equipment Operations Matrix" className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-12 gap-2 pb-3 mb-4 border-b border-border text-xs font-semibold text-muted-foreground">
            <div className="col-span-1">NO.</div>
            <div className="col-span-2">SERIAL NUMBER</div>
            <div className="col-span-2">PUMP DESCRIPTION</div>
            <div className="col-span-1">STATUS</div>
            <div className="col-span-1">MODE</div>
            <div className="col-span-1">MONTHLY HRS</div>
            <div className="col-span-1">CUMULATIVE HRS</div>
            <div className="col-span-1">MONTHLY %</div>
            <div className="col-span-1">CUMULATIVE %</div>
            <div className="col-span-1">ACTIONS</div>
          </div>

          {equipment.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 py-3 border-b border-border/50 text-sm hover:bg-muted/20 transition-colors">
              <div className="col-span-1 font-mono">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              
              <div className="col-span-2 font-mono text-xs">
                {item.serialNumber}
              </div>
              
              <div className="col-span-2 font-medium">
                {item.description}
              </div>
              
              <div className="col-span-1">
                <StatusIndicator 
                  status={getStatusColor(item.operationStatus) as any}
                  label=""
                  animate={item.operationStatus === 'start'}
                />
              </div>
              
              <div className="col-span-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.mode === 'auto' 
                    ? 'bg-success/20 text-success' 
                    : 'bg-warning/20 text-warning'
                }`}>
                  {item.mode.toUpperCase()}
                </span>
              </div>
              
              <div className="col-span-1 font-mono">
                {item.monthlyHours.toFixed(1)}
              </div>
              
              <div className="col-span-1 font-mono">
                {item.cumulativeHours.toLocaleString()}
              </div>
              
              <div className="col-span-1 font-mono">
                {item.monthlyUtilization.toFixed(1)}%
              </div>
              
              <div className="col-span-1 font-mono">
                {item.cumulativeUtilization.toFixed(1)}%
              </div>
              
              <div className="col-span-1 flex space-x-1">
                {item.operationStatus !== 'start' && (
                  <Button variant="outline" size="sm" className="p-1">
                    <Play className="h-3 w-3" />
                  </Button>
                )}
                {item.operationStatus === 'start' && (
                  <Button variant="outline" size="sm" className="p-1">
                    <Square className="h-3 w-3" />
                  </Button>
                )}
                <Button variant="outline" size="sm" className="p-1">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DataCard>

    </div>
  );
};
