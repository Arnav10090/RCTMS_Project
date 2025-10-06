import React from 'react';
import { DataCard } from '@/components/DataCard';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { format, startOfWeek, addDays, startOfMonth, getDaysInMonth } from 'date-fns';

export const OilCellarMonitor = () => {
  const areas = ['Area#1', 'Area#2', 'Area#3', 'Area#4', 'Area#5'];
  const rows = [
    { id: 'lighting', label: 'Oil Cellar Lighting' },
    { id: 'aqi', label: 'Air Quality Index' },
  ] as const;

  type RowId = typeof rows[number]['id'];

  const [lighting, setLighting] = React.useState<boolean[]>([true, true, true, false, true]);

  const rngFor = (key: string) => {
    try {
      return seeded(strHash(key));
    } catch {
      return Math.random;
    }
  };

  const [aqiValues, setAqiValues] = React.useState<number[]>(() => {
    const rng = rngFor('aqi');
    return Array.from({ length: areas.length }, () => parseFloat((15 + rng() * 80).toFixed(1)));
  });

  const setAllInRow = (row: RowId, value: boolean) => {
    if (row === 'lighting') {
      setLighting(Array.from({ length: areas.length }, () => value));
      return;
    }
    // for AQI: set to either a mid value or zero
    setAqiValues(Array.from({ length: areas.length }, () => value ? 50.0 : 0.0));
  };

  const toggleCell = (row: RowId, col: number, value: boolean) => {
    if (row === 'lighting') {
      setLighting((l) => l.map((v, i) => (i === col ? value : v)));
    }
  };

  const parameterOptions = [
    'Coil_ID','Coil_Grade','Coil_Width','Coil_Thick.','Coil_Input_Weight','Coil_Start_Time','Coil_End_Time','Coil_Total_Time','Mill_Speed','Production_Rate','Mill_Run_Hrs_Day','Mill_Run_Hrs_Month','Mill-Utilization','R.Coolant_Temp','R.Coolant_Tank_Current_Level','R.Coolant_Tank_Set_Level','R.Coolant_Tank_pH','R.Coolant_Concentration_Current Value','R.Coolant_Concentration_Set Value','Oil_Addition_volume','Water_Addition_Volume','R.Coolant_Tramp_Oil','R.Coolant_ESI_Value','R.Coolant_Saphonification_Value (SAP)','R.Coolant_Conductivity','R.Coolant_Flow','R.Coolant_Pressure','R.Coolan_Pump#1_Status','R.Coolan_Pump#1_Run_Hrs','R.Coolan_Pump#1_Load','R.Coolan_Pump#2_Status','R.Coolan_Pump#2_Run_Hrs','R.Coolan_Pump#2_Load','Agitator#1_Status','Agitator#1_Run_Hrs','Agitator#1_Load','Agitator#2_Status','Agitator#2_Run_Hrs','Agitator#2_Load','Magnetic_Separator_Status','Magnetic_Separator_Run_Hrs','Magnetic_Separator_Load','Skimmer_Status','Skimmer_Run_Hrs','Skimmer_Load','DM_Water_pH','DM_Water_Temp','DM_Water_Conductivity','DM_Water_Volume_Day','Coolant_Oil_Temp'
  ];

  type Range = 'weekly' | 'monthly' | 'yearly';
  const [selectedParam, setSelectedParam] = React.useState<string>('Production_Rate');
  const [range, setRange] = React.useState<Range>('weekly');

  const seeded = (seed: number) => {
    return function mulberry32(a: number) {
      return () => {
        a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    }(seed);
  };

  const strHash = (s: string) => Array.from(s).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) | 0, 0);

  const getRangeForParam = (param: string): { min: number; max: number; decimals?: number } => {
    const p = param.toLowerCase();
    if (p.includes('status')) return { min: 0, max: 1 };
    if (p.includes('ph')) return { min: 6, max: 9, decimals: 2 };
    if (p.includes('temp')) return { min: 15, max: 80, decimals: 1 };
    if (p.includes('pressure')) return { min: 0, max: 10, decimals: 2 };
    if (p.includes('flow')) return { min: 0, max: 120, decimals: 1 };
    if (p.includes('conductivity')) return { min: 0, max: 2000 };
    if (p.includes('concentration')) return { min: 0, max: 20, decimals: 2 };
    if (p.includes('level')) return { min: 0, max: 100, decimals: 1 };
    if (p.includes('load')) return { min: 0, max: 100, decimals: 0 };
    if (p.includes('run_hrs')) return { min: 0, max: 24, decimals: 1 };
    if (p.includes('oil') || p.includes('water') || p.includes('volume')) return { min: 0, max: 1000 };
    if (p.includes('speed') || p.includes('utilization') || p.includes('production')) return { min: 0, max: 100 };
    return { min: 0, max: 100 };
  };

  const buildXAxis = (r: Range) => {
    if (r === 'weekly') {
      const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
      return Array.from({ length: 7 }, (_, i) => format(addDays(monday, i), 'EEE'));
    }
    if (r === 'monthly') {
      const start = startOfMonth(new Date());
      const days = getDaysInMonth(start);
      return Array.from({ length: days }, (_, i) => format(addDays(start, i), 'd MMM'));
    }
    const year = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => format(new Date(year, i, 1), 'MMM'));
  };

  const data = React.useMemo(() => {
    const labels = buildXAxis(range);
    const rng = seeded(strHash(selectedParam + range));
    const { min, max, decimals } = getRangeForParam(selectedParam);
    return labels.map((label) => {
      const value = min + rng() * (max - min);
      const rounded = decimals !== undefined ? parseFloat(value.toFixed(decimals)) : Math.round(value);
      return { label, value };
    });
  }, [selectedParam, range]);

  return (
    <div className="space-y-6">
      <div className="h-1" />

      <DataCard title="HMI-04: Oil Cellar Matrix" className="overflow-x-auto" variant="primary">
        <div className="mb-3">
          <div className="text-sm text-muted-foreground">Toggle cells to mark availability/status for each area.</div>
        </div>

        <Table className="rounded-lg overflow-hidden">
          <TableCaption className="pt-4 text-xs text-muted-foreground">Interactive table — switches represent the "xxx" marks.</TableCaption>
          <TableHeader>
            <TableRow className="bg-card/60 hover:bg-card/60">
              <TableHead className="w-16 sticky left-0 bg-card z-10">SN</TableHead>
              <TableHead className="min-w-[220px] sticky left-16 bg-card z-10">Description</TableHead>
              {areas.map((a) => (
                <TableHead key={a} className="text-center">{a}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rIdx) => (
              <TableRow key={row.id} className="hover:bg-accent/40">
                <TableCell className="font-mono text-xs sticky left-0 bg-background/70 backdrop-blur z-10">{rIdx + 1}</TableCell>
                <TableCell className="font-medium sticky left-16 bg-background/70 backdrop-blur z-10">{row.label}</TableCell>
                {areas.map((_, cIdx) => (
                  <TableCell key={`${row.id}-${cIdx}`} className="text-center">
                    {row.id === 'lighting' ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Button size="sm" variant={lighting[cIdx] ? 'default' : 'outline'} onClick={() => toggleCell('lighting', cIdx, true)}>
                          ON
                        </Button>
                        <Button size="sm" variant={!lighting[cIdx] ? 'default' : 'outline'} onClick={() => toggleCell('lighting', cIdx, false)}>
                          OFF
                        </Button>
                      </div>
                    ) : row.id === 'aqi' ? (
                      <div className="font-mono">{aqiValues[cIdx].toFixed(1)}</div>
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataCard>

      <DataCard title="Trends" variant="primary">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-64">
              <Select value={selectedParam} onValueChange={setSelectedParam}>
                <SelectTrigger aria-label="Y-axis parameter">
                  <SelectValue placeholder="Select parameter" />
                </SelectTrigger>
                <SelectContent>
                  {parameterOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ChartContainer
          config={{ value: { label: selectedParam, color: 'hsl(var(--primary))' } }}
          className="w-full min-h-[340px]"
        >
          <BarChart data={data} margin={{ left: 24, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={48} />
            <ChartTooltip cursor={{ fill: 'hsl(var(--muted)/.4)' }} content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </DataCard>
    </div>
  );
};
