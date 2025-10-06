import React from 'react';
import { DataCard } from '@/components/DataCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '@/components/ui/pagination';

// Utilities
function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function withinRange(dateStr: string, from?: string, to?: string) {
  if (!from && !to) return true;
  const t = new Date(dateStr).getTime();
  if (from && t < new Date(from).getTime()) return false;
  if (to && t > new Date(to).getTime()) return false;
  return true;
}

function usePager<T>(items: T[], initialSize = 10) {
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(initialSize);
  const pages = Math.max(1, Math.ceil(items.length / size));
  React.useEffect(() => {
    if (page > pages) setPage(1);
  }, [items.length, size, page, pages]);
  const slice = items.slice((page - 1) * size, (page - 1) * size + size);
  return { page, setPage, size, setSize, pages, slice };
}

// 1) Coolant Report
type CoolantRow = {
  id: number;
  date: string;
  oilConc: number; // %
  conductivity: number; // uS/cm
  pH: number;
  tempC: number;
  esi: number;
  tramp: number; // %
  saponification: number; // mmKOH/GM
  tankLvl: number; // kL
};

function genCoolant(n = 48): CoolantRow[] {
  const today = new Date();
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    date: toISODate(new Date(today.getTime() - i * 86400000)),
    oilConc: +(3 + Math.random() * 2).toFixed(2),
    conductivity: Math.round(800 + Math.random() * 600),
    pH: +(7 + Math.random()).toFixed(2),
    tempC: Math.round(20 + Math.random() * 10),
    esi: Math.round(40 + Math.random() * 20),
    tramp: +(0.5 + Math.random() * 1.5).toFixed(2),
    saponification: +(0.5 + Math.random() * 1.2).toFixed(2),
    tankLvl: +(4 + Math.random() * 3).toFixed(2),
  }));
}

// 2) Oil Cellar Report
type OilCellarRow = {
  id: number;
  date: string;
  tempC: number;
  humidity: number; // %
  aqi1: number; aqi2: number; aqi3: number;
  access: 'Normal' | 'Restricted';
  personsInside: number;
  noPpe: number;
  unsafeWelding: number; unsafeCutting: number; unsafeOthers: number;
  illumA1: number; illumA2: number; illumA3: number; illumA4: number; illumA5: number;
  fireStatus: 'OK' | 'Due';
  fireNextDue: string;
};

function genOilCellar(n = 36): OilCellarRow[] {
  const today = new Date();
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    date: toISODate(new Date(today.getTime() - i * 86400000)),
    tempC: Math.round(22 + Math.random() * 6),
    humidity: Math.round(40 + Math.random() * 30),
    aqi1: Math.round(20 + Math.random() * 30),
    aqi2: Math.round(20 + Math.random() * 30),
    aqi3: Math.round(20 + Math.random() * 30),
    access: Math.random() > 0.9 ? 'Restricted' : 'Normal',
    personsInside: Math.round(3 + Math.random() * 6),
    noPpe: Math.round(Math.random() * 2),
    unsafeWelding: Math.round(Math.random() * 1),
    unsafeCutting: Math.round(Math.random() * 1),
    unsafeOthers: Math.round(Math.random() * 1),
    illumA1: Math.round(120 + Math.random() * 60),
    illumA2: Math.round(120 + Math.random() * 60),
    illumA3: Math.round(120 + Math.random() * 60),
    illumA4: Math.round(120 + Math.random() * 60),
    illumA5: Math.round(120 + Math.random() * 60),
    fireStatus: Math.random() > 0.8 ? 'Due' : 'OK',
    fireNextDue: toISODate(new Date(today.getTime() + (15 + Math.random() * 60) * 86400000)),
  }));
}

// 3) Roll Coolant Pump Status
type PumpRow = {
  id: number;
  date: string;
  pumpNo: '#1' | '#2';
  status: 'Run' | 'Stand-by';
  runHrs: number;
  avgLoad: number; // %
  avgPressure: number; // bar
};

function genPumps(n = 30): PumpRow[] {
  const today = new Date();
  return Array.from({ length: n }, (_, i) => (['#1', '#2'] as const).map((p, j) => ({
    id: i * 2 + j + 1,
    date: toISODate(new Date(today.getTime() - i * 86400000)),
    pumpNo: p,
    status: Math.random() > 0.2 ? 'Run' : 'Stand-by',
    runHrs: +(2 + Math.random() * 8).toFixed(1),
    avgLoad: Math.round(40 + Math.random() * 50),
    avgPressure: +(4 + Math.random() * 4).toFixed(1),
  }))).flat();
}

// 4) HP Pump Status
type HpPumpRow = {
  id: number;
  date: string;
  pumpNo: '#1' | '#2';
  status: 'Run' | 'Stand-by';
  runHrs: number;
  avgLoad: number;
  avgSystemPressure: number;
  avgTankLevel: number;
  avgOilTemp: number;
  oilCleanliness: string;
  waterSaturation: number;
};

function genHpPumps(n = 30): HpPumpRow[] {
  const today = new Date();
  const oilClasses = ['ISO 18/16/13', 'ISO 17/15/12', 'ISO 19/17/14'];
  return Array.from({ length: n }, (_, i) => (['#1', '#2'] as const).map((p, j) => ({
    id: i * 2 + j + 1,
    date: toISODate(new Date(today.getTime() - i * 86400000)),
    pumpNo: p,
    status: Math.random() > 0.2 ? 'Run' : 'Stand-by',
    runHrs: +(2 + Math.random() * 8).toFixed(1),
    avgLoad: Math.round(40 + Math.random() * 50),
    avgSystemPressure: +(90 + Math.random() * 40).toFixed(1),
    avgTankLevel: +(40 + Math.random() * 40).toFixed(1),
    avgOilTemp: Math.round(35 + Math.random() * 10),
    oilCleanliness: oilClasses[Math.floor(Math.random() * oilClasses.length)],
    waterSaturation: Math.round(20 + Math.random() * 50),
  }))).flat();
}

export const Reports = () => {
  // Filters shared pattern: search + date range + page size
  const [search, setSearch] = React.useState('');
  const [from, setFrom] = React.useState<string | undefined>();
  const [to, setTo] = React.useState<string | undefined>();

  // Data
  const [coolant] = React.useState(() => genCoolant());
  const [cellar] = React.useState(() => genOilCellar());
  const [pumps] = React.useState(() => genPumps());
  const [hp] = React.useState(() => genHpPumps());

  const searcher = (row: Record<string, any>) =>
    search.trim() === '' || Object.values(row).some((v) => String(v).toLowerCase().includes(search.toLowerCase()));

  const coolFilt = coolant.filter((r) => withinRange(r.date, from, to) && searcher(r));
  const cellarFilt = cellar.filter((r) => withinRange(r.date, from, to) && searcher(r));
  const pumpsFilt = pumps.filter((r) => withinRange(r.date, from, to) && searcher(r));
  const hpFilt = hp.filter((r) => withinRange(r.date, from, to) && searcher(r));

  const coolPg = usePager(coolFilt, 10);
  const cellarPg = usePager(cellarFilt, 10);
  const pumpsPg = usePager(pumpsFilt, 10);
  const hpPg = usePager(hpFilt, 10);

  const Filters = (
    <div className="flex flex-wrap items-center gap-3 mb-3">
      <div className="flex items-center space-x-2 w-64">
        <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <div>
          <label className="text-xs text-muted-foreground">From</label>
          <Input type="date" value={from || ''} onChange={(e) => setFrom(e.target.value || undefined)} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">To</label>
          <Input type="date" value={to || ''} onChange={(e) => setTo(e.target.value || undefined)} />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Rows</span>
        <Select value={String(coolPg.size)} onValueChange={(v) => {
          coolPg.setSize(Number(v));
          cellarPg.setSize(Number(v));
          pumpsPg.setSize(Number(v));
          hpPg.setSize(Number(v));
        }}>
          <SelectTrigger className="h-9 w-24"><SelectValue placeholder="10" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={() => { setSearch(''); setFrom(undefined); setTo(undefined); }}>Reset</Button>
      </div>
    </div>
  );

  const Pager = (pg: ReturnType<typeof usePager<any>>) => (
    <Pagination className="mt-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); pg.setPage(Math.max(1, pg.page - 1)); }} />
        </PaginationItem>
        {Array.from({ length: pg.pages }).slice(0, 5).map((_, i) => {
          const p = i + 1; // show first 5 for simplicity
          return (
            <PaginationItem key={p}>
              <PaginationLink href="#" isActive={pg.page === p} onClick={(e) => { e.preventDefault(); pg.setPage(p); }}>
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext href="#" onClick={(e) => { e.preventDefault(); pg.setPage(Math.min(pg.pages, pg.page + 1)); }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  return (
    <div className="space-y-8">
      {/* Global filters control all tables for simplicity */}
      <DataCard title="Filters">
        {Filters}
      </DataCard>

      {/* Coolant Report */}
      <DataCard title={`Coolant Report (${coolFilt.length})`} className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-10 gap-2 pb-3 mb-3 border-b border-border text-xs font-semibold text-muted-foreground">
            <div>SN</div>
            <div>Date</div>
            <div>Oil Conc. %</div>
            <div>Conductivity μS/cm</div>
            <div>pH</div>
            <div>Temp Deg.C</div>
            <div>ESI</div>
            <div>Tramp %</div>
            <div>Saponification (mmKOH/GM)</div>
            <div>Tank Lvl kL</div>
          </div>
          {coolPg.slice.map((r, idx) => (
            <div key={r.id} className="grid grid-cols-10 gap-2 py-2 border-b border-border/50 text-sm">
              <div>{(coolPg.page - 1) * coolPg.size + idx + 1}</div>
              <div className="font-mono text-xs">{r.date}</div>
              <div>{r.oilConc}</div>
              <div>{r.conductivity}</div>
              <div>{r.pH}</div>
              <div>{r.tempC}</div>
              <div>{r.esi}</div>
              <div>{r.tramp}</div>
              <div>{r.saponification}</div>
              <div>{r.tankLvl}</div>
            </div>
          ))}
        </div>
        {Pager(coolPg)}
      </DataCard>

      {/* Oil Cellar Report */}
      <DataCard title={`Oil Cellar Report (${cellarFilt.length})`} className="overflow-x-auto">
        <div className="min-w-[1300px]">
          <div className="grid grid-cols-18 gap-2 pb-3 mb-3 border-b border-border text-xs font-semibold text-muted-foreground">
            <div>SN</div>
            <div>Date</div>
            <div>Temp °C</div>
            <div>Humidity %</div>
            <div>AQI A1</div>
            <div>AQI A2</div>
            <div>AQI A3</div>
            <div>Access</div>
            <div>Persons</div>
            <div>No PPE</div>
            <div>Welding</div>
            <div>Cutting</div>
            <div>Others</div>
            <div>Ill A1</div>
            <div>Ill A2</div>
            <div>Ill A3</div>
            <div>Ill A4</div>
            <div>Ill A5</div>
            <div>Fire</div>
            <div>Next Due</div>
          </div>
          {cellarPg.slice.map((r, idx) => (
            <div key={r.id} className="grid grid-cols-18 gap-2 py-2 border-b border-border/50 text-sm">
              <div>{(cellarPg.page - 1) * cellarPg.size + idx + 1}</div>
              <div className="font-mono text-xs">{r.date}</div>
              <div>{r.tempC}</div>
              <div>{r.humidity}</div>
              <div>{r.aqi1}</div>
              <div>{r.aqi2}</div>
              <div>{r.aqi3}</div>
              <div>{r.access}</div>
              <div>{r.personsInside}</div>
              <div>{r.noPpe}</div>
              <div>{r.unsafeWelding}</div>
              <div>{r.unsafeCutting}</div>
              <div>{r.unsafeOthers}</div>
              <div>{r.illumA1}</div>
              <div>{r.illumA2}</div>
              <div>{r.illumA3}</div>
              <div>{r.illumA4}</div>
              <div>{r.illumA5}</div>
              <div>{r.fireStatus}</div>
              <div className="font-mono text-xs">{r.fireNextDue}</div>
            </div>
          ))}
        </div>
        {Pager(cellarPg)}
      </DataCard>

      {/* Roll Coolant Pump Status */}
      <DataCard title={`Roll Coolant Pump Status (${pumpsFilt.length})`} className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-8 gap-2 pb-3 mb-3 border-b border-border text-xs font-semibold text-muted-foreground">
            <div>SN</div>
            <div>Date</div>
            <div>Pump No</div>
            <div>Status</div>
            <div>Run Hrs</div>
            <div>Avg Load %</div>
            <div>Avg Pressure</div>
            <div></div>
          </div>
          {pumpsPg.slice.map((r, idx) => (
            <div key={r.id} className="grid grid-cols-8 gap-2 py-2 border-b border-border/50 text-sm items-center">
              <div>{(pumpsPg.page - 1) * pumpsPg.size + idx + 1}</div>
              <div className="font-mono text-xs">{r.date}</div>
              <div>{r.pumpNo}</div>
              <div>
                <span className={`px-2 py-0.5 rounded text-xs border ${r.status === 'Run' ? 'text-success border-success' : 'text-muted-foreground border-border'}`}>{r.status}</span>
              </div>
              <div>{r.runHrs}</div>
              <div>{r.avgLoad}</div>
              <div>{r.avgPressure}</div>
              <div />
            </div>
          ))}
        </div>
        {Pager(pumpsPg)}
      </DataCard>

      {/* HP Pump Status */}
      <DataCard title={`HP Pump Status (${hpFilt.length})`} className="overflow-x-auto">
        <div className="min-w-[1200px]">
          <div className="grid grid-cols-12 gap-2 pb-3 mb-3 border-b border-border text-xs font-semibold text-muted-foreground">
            <div>SN</div>
            <div>Date</div>
            <div>Pump No</div>
            <div>Status</div>
            <div>Run Hrs</div>
            <div>Avg Load</div>
            <div>Avg System Pressure</div>
            <div>Avg Tank Level</div>
            <div>Avg Oil Temp</div>
            <div>Oil Cleanliness</div>
            <div>Water Saturation</div>
            <div></div>
          </div>
          {hpPg.slice.map((r, idx) => (
            <div key={r.id} className="grid grid-cols-12 gap-2 py-2 border-b border-border/50 text-sm items-center">
              <div>{(hpPg.page - 1) * hpPg.size + idx + 1}</div>
              <div className="font-mono text-xs">{r.date}</div>
              <div>{r.pumpNo}</div>
              <div>
                <span className={`px-2 py-0.5 rounded text-xs border ${r.status === 'Run' ? 'text-success border-success' : 'text-muted-foreground border-border'}`}>{r.status}</span>
              </div>
              <div>{r.runHrs}</div>
              <div>{r.avgLoad}</div>
              <div>{r.avgSystemPressure}</div>
              <div>{r.avgTankLevel}</div>
              <div>{r.avgOilTemp}</div>
              <div>{r.oilCleanliness}</div>
              <div>{r.waterSaturation}</div>
              <div />
            </div>
          ))}
        </div>
        {Pager(hpPg)}
      </DataCard>
    </div>
  );
};
