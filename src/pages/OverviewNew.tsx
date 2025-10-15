import React from 'react';
import { DataCard } from '@/components/DataCard';
import { GaugeDisplay } from '@/components/GaugeDisplay';
import { Activity, Droplet, Gauge, Wrench } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { OverviewOld } from './Overview';

export const Overview = () => {
  const systemData = {
    coilData: {
      id: 'RC-2024-001',
      width: 1250.5,
      thickness: 2.85,
      grade: 'AISI 304L-01'
    },
    coolantSystem: {
      tankLevel: 87.3,
      temperature: 18.5,
      concentration: 5.2
    },
    mainHydraulic: {
      pressure: 145.8,
      temperature: 42.1,
      contamination: 0.85,
      waterSaturation: 2.1
    },
    auxiliaryHydraulic: {
      pressure: 142.3,
      temperature: 39.8,
      contamination: 0.92,
      waterSaturation: 1.8
    }
  };

  return (
    <div className="space-y-6">
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
              thresholds={{
                warning: 30,
                danger: 15
              }}
            />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Coolant Temperature</div>
                <div className="font-mono font-semibold text-success">
                  {systemData.coolantSystem.temperature}°C
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Coolant Concentration</div>
                <div className="font-mono font-semibold text-success">
                  {systemData.coolantSystem.concentration}%
                </div>
              </div>
            </div>
          </div>
        </DataCard>

        <DataCard title="Main Hydraulic System" icon={Gauge}>
          <div className="space-y-3">
            <GaugeDisplay
              label="Tank Level"
              value={systemData.coolantSystem.tankLevel}
              unit="%"
              thresholds={{ warning: 30, danger: 15 }}
            />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Oil Temperature</div>
                <div className="font-mono font-semibold">
                  {systemData.mainHydraulic.temperature}°C
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">System Pressure</div>
                <div className="font-mono font-semibold">
                  {systemData.mainHydraulic.pressure} bar
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Solid Contamination</div>
                <div className="font-mono font-semibold">
                  {systemData.mainHydraulic.contamination} mg/L
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Water Saturation</div>
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

      <DataCard>
        <Tabs defaultValue="pickling" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pickling">Pickling Tank</TabsTrigger>
            <TabsTrigger value="mill-hydraulic">Mill Hydraulic System</TabsTrigger>
            <TabsTrigger value="aux-hydraulic">Auxiliary Hydraulic System</TabsTrigger>
            <TabsTrigger value="gear-lube">Gear Lubrication System</TabsTrigger>
            <TabsTrigger value="legend">Legend</TabsTrigger>
          </TabsList>
          <TabsContent value="pickling">
            <div className="space-y-6 py-6">
              <OverviewOld hideKpiCards />
            </div>
          </TabsContent>
          <TabsContent value="mill-hydraulic">
            <div className="py-6 flex items-center justify-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F8aaafd4b37d74bc7b32792409b6f68c2%2F7d1759f7773d4bcaa1be021d3028f561?format=webp&width=800"
                alt="Mill Hydraulic System schematic"
                className="max-w-full h-auto rounded-md border border-border/50 shadow-sm"
              />
            </div>
          </TabsContent>
          <TabsContent value="aux-hydraulic">
            <div className="py-6 flex items-center justify-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F8aaafd4b37d74bc7b32792409b6f68c2%2F2f4b722553614692a7cf2c13ffca8422?format=webp&width=800"
                alt="Auxiliary Hydraulic System schematic"
                className="max-w-full h-auto rounded-md border border-border/50 shadow-sm"
              />
            </div>
          </TabsContent>
          <TabsContent value="gear-lube">
            <div className="py-6 flex items-center justify-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F8aaafd4b37d74bc7b32792409b6f68c2%2F521536ed759d4f4ca4e90ade701858e8?format=webp&width=800"
                alt="Gear Lubrication System schematic"
                className="max-w-full h-auto rounded-md border border-border/50 shadow-sm"
              />
            </div>
          </TabsContent>
          <TabsContent value="legend">
            <div className="py-6 flex items-center justify-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F8aaafd4b37d74bc7b32792409b6f68c2%2F01eeeeb78c5a42398acaf1a7a4797d6f?format=webp&width=800"
                alt="Schematic Legend"
                className="max-w-full h-auto rounded-md border border-border/50 shadow-sm"
              />
            </div>
          </TabsContent>
        </Tabs>
      </DataCard>
    </div>
  );
};

export default Overview;
