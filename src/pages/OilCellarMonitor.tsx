import React from 'react';
import { DataCard } from '@/components/DataCard';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const OilCellarMonitor = () => {
  const areas = ['Area#1', 'Area#2', 'Area#3', 'Area#4', 'Area#5'];
  const rows = [
    { id: 'lighting', label: 'Oil Cellar Lighting' },
    { id: 'aqi', label: 'Air Quality Index' },
  ] as const;

  type RowId = typeof rows[number]['id'];

  const [matrix, setMatrix] = React.useState<Record<RowId, boolean[]>>({
    lighting: [true, true, true, false, true],
    aqi: [true, true, true, false, false],
  });

  const setAllInRow = (row: RowId, value: boolean) =>
    setMatrix((m) => ({ ...m, [row]: Array.from({ length: areas.length }, () => value) }));

  const toggleCell = (row: RowId, col: number, value: boolean) =>
    setMatrix((m) => ({ ...m, [row]: m[row].map((v, i) => (i === col ? value : v)) }));

  return (
    <div className="space-y-6">
      <div className="h-1" />

      <DataCard title="HMI-04: Oil Cellar Matrix" className="overflow-x-auto" variant="primary">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">Toggle cells to mark availability/status for each area.</div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setAllInRow('lighting', true)}>Lighting: All On</Button>
            <Button size="sm" variant="outline" onClick={() => setAllInRow('lighting', false)}>Lighting: All Off</Button>
            <Button size="sm" variant="outline" onClick={() => setAllInRow('aqi', true)}>AQI: All On</Button>
            <Button size="sm" variant="outline" onClick={() => setAllInRow('aqi', false)}>AQI: All Off</Button>
          </div>
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
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Switch
                            checked={matrix[row.id][cIdx]}
                            onCheckedChange={(v) => toggleCell(row.id, cIdx, v)}
                            aria-label={`${row.label} ${areas[cIdx]} toggle`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{matrix[row.id][cIdx] ? 'On' : 'Off'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataCard>
    </div>
  );
};
