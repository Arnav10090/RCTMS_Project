import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

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
  oilConc: string;
  conductivity: string;
  pH: string;
  tempC: string;
  esi: string;
  tramp: string;
  saponification: string;
  tankLvl: string;
};

function genCoolant(n = 48): CoolantRow[] {
  const today = new Date();
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    date: toISODate(new Date(today.getTime() - i * 86400000)),
    oilConc: (3 + Math.random() * 2).toFixed(2),
    conductivity: Math.round(800 + Math.random() * 600).toString(),
    pH: (7 + Math.random()).toFixed(2),
    tempC: Math.round(20 + Math.random() * 10).toString(),
    esi: Math.round(40 + Math.random() * 20).toString(),
    tramp: (0.5 + Math.random() * 1.5).toFixed(2),
    saponification: (0.5 + Math.random() * 1.2).toFixed(2),
    tankLvl: (4 + Math.random() * 3).toFixed(2),
  }));
}

// 2) Oil Cellar Report
type OilCellarRow = {
  id: number;
  date: string;
  tempC: string;
  humidity: string;
  aqiA1: string;
  aqiA2: string;
  aqiA3: string;
  accessControl: string;
  personsEntered: string;
  noPpe: string;
  welding: string;
  cutting: string;
  others: string;
  illumA1: string;
  illumA2: string;
  illumA3: string;
  illumA4: string;
  illumA5: string;
  fireStatus: string;
  fireNextDue: string;
};

function genOilCellar(n = 36): OilCellarRow[] {
  const today = new Date();
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    date: toISODate(new Date(today.getTime() - i * 86400000)),
    tempC: Math.round(22 + Math.random() * 6).toString(),
    humidity: Math.round(40 + Math.random() * 30).toString(),
    aqiA1: Math.round(20 + Math.random() * 30).toString(),
    aqiA2: Math.round(20 + Math.random() * 30).toString(),
    aqiA3: Math.round(20 + Math.random() * 30).toString(),
    accessControl: Math.random() > 0.9 ? 'Restricted' : 'Normal',
    personsEntered: Math.round(3 + Math.random() * 6).toString(),
    noPpe: Math.round(Math.random() * 2).toString(),
    welding: Math.round(Math.random() * 1).toString(),
    cutting: Math.round(Math.random() * 1).toString(),
    others: Math.round(Math.random() * 1).toString(),
    illumA1: Math.round(120 + Math.random() * 60).toString(),
    illumA2: Math.round(120 + Math.random() * 60).toString(),
    illumA3: Math.round(120 + Math.random() * 60).toString(),
    illumA4: Math.round(120 + Math.random() * 60).toString(),
    illumA5: Math.round(120 + Math.random() * 60).toString(),
    fireStatus: Math.random() > 0.8 ? 'Due' : 'OK',
    fireNextDue: toISODate(new Date(today.getTime() + (15 + Math.random() * 60) * 86400000)),
  }));
}

// 3) Roll Coolant Pump Status
type PumpRow = {
  id: number;
  date: string;
  pumpNo: string;
  status: string;
  runHrs: string;
  avgLoad: string;
  avgPressure: string;
};

function genPumps(n = 30): PumpRow[] {
  const today = new Date();
  const rows: PumpRow[] = [];
  for (let i = 0; i < n; i++) {
    const date = toISODate(new Date(today.getTime() - i * 86400000));
    rows.push({
      id: i * 2 + 1,
      date,
      pumpNo: '#1',
      status: Math.random() > 0.2 ? 'Run' : 'Stand-by',
      runHrs: (2 + Math.random() * 8).toFixed(1),
      avgLoad: Math.round(40 + Math.random() * 50).toString(),
      avgPressure: (4 + Math.random() * 4).toFixed(1),
    });
    rows.push({
      id: i * 2 + 2,
      date,
      pumpNo: '#2',
      status: Math.random() > 0.2 ? 'Run' : 'Stand-by',
      runHrs: (2 + Math.random() * 8).toFixed(1),
      avgLoad: Math.round(40 + Math.random() * 50).toString(),
      avgPressure: (4 + Math.random() * 4).toFixed(1),
    });
  }
  return rows;
}

// 4) HP Pump Status
type HpPumpRow = {
  id: number;
  date: string;
  pumpNo: string;
  status: string;
  runHrs: string;
  avgLoad: string;
  avgSystemPressure: string;
  avgTankLevel: string;
  avgOilTemp: string;
  oilCleanliness: string;
  waterSaturation: string;
};

function genHpPumps(n = 30): HpPumpRow[] {
  const today = new Date();
  const oilClasses = ['ISO 18/16/13', 'ISO 17/15/12', 'ISO 19/17/14'];
  const rows: HpPumpRow[] = [];
  for (let i = 0; i < n; i++) {
    const date = toISODate(new Date(today.getTime() - i * 86400000));
    rows.push({
      id: i * 2 + 1,
      date,
      pumpNo: '#1',
      status: Math.random() > 0.2 ? 'Run' : 'Stand-by',
      runHrs: (2 + Math.random() * 8).toFixed(1),
      avgLoad: Math.round(40 + Math.random() * 50).toString(),
      avgSystemPressure: (90 + Math.random() * 40).toFixed(1),
      avgTankLevel: (40 + Math.random() * 40).toFixed(1),
      avgOilTemp: Math.round(35 + Math.random() * 10).toString(),
      oilCleanliness: oilClasses[Math.floor(Math.random() * oilClasses.length)],
      waterSaturation: Math.round(20 + Math.random() * 50).toString(),
    });
    rows.push({
      id: i * 2 + 2,
      date,
      pumpNo: '#2',
      status: Math.random() > 0.2 ? 'Run' : 'Stand-by',
      runHrs: (2 + Math.random() * 8).toFixed(1),
      avgLoad: Math.round(40 + Math.random() * 50).toString(),
      avgSystemPressure: (90 + Math.random() * 40).toFixed(1),
      avgTankLevel: (40 + Math.random() * 40).toFixed(1),
      avgOilTemp: Math.round(35 + Math.random() * 10).toString(),
      oilCleanliness: oilClasses[Math.floor(Math.random() * oilClasses.length)],
      waterSaturation: Math.round(20 + Math.random() * 50).toString(),
    });
  }
  return rows;
}

// Individual Table Component
const TableSection = ({
  title,
  data,
  headers,
  renderRow
}: {
  title: string;
  data: any[];
  headers: string[];
  renderRow: (item: any, idx: number, startIdx: number) => React.ReactNode;
}) => {
  const [search, setSearch] = React.useState('');
  const [from, setFrom] = React.useState<string>('');
  const [to, setTo] = React.useState<string>('');

  const searcher = (row: Record<string, any>) =>
    search.trim() === '' || Object.values(row).some((v) => String(v).toLowerCase().includes(search.toLowerCase()));

  const filtered = data.filter((r) => withinRange(r.date, from || undefined, to || undefined) && searcher(r));
  const pager = usePager(filtered, 10);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap items-end gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[240px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search in all columns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Date From */}
          <div className="w-40">
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <Input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          {/* Date To */}
          <div className="w-40">
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <Input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          {/* Rows per page */}
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">Show</label>
            <Select value={String(pager.size)} onValueChange={(v) => pager.setSize(Number(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 rows</SelectItem>
                <SelectItem value="10">10 rows</SelectItem>
                <SelectItem value="25">25 rows</SelectItem>
                <SelectItem value="50">50 rows</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset */}
          <Button
            variant="outline"
            onClick={() => { setSearch(''); setFrom(''); setTo(''); }}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Results count */}
        <div className="mt-3 text-sm text-gray-600">
          Showing {filtered.length === 0 ? 0 : (pager.page - 1) * pager.size + 1} to {Math.min(pager.page * pager.size, filtered.length)} of {filtered.length} results
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pager.slice.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-8 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              pager.slice.map((item, idx) => renderRow(item, idx, (pager.page - 1) * pager.size))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {pager.page} of {pager.pages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pager.setPage(Math.max(1, pager.page - 1))}
              disabled={pager.page === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {/* Page numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, pager.pages) }).map((_, i) => {
                let pageNum;
                if (pager.pages <= 5) {
                  pageNum = i + 1;
                } else if (pager.page <= 3) {
                  pageNum = i + 1;
                } else if (pager.page >= pager.pages - 2) {
                  pageNum = pager.pages - 4 + i;
                } else {
                  pageNum = pager.page - 2 + i;
                }

                return (
                  <Button
                    key={i}
                    variant={pager.page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => pager.setPage(pageNum)}
                    className="w-9"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => pager.setPage(Math.min(pager.pages, pager.page + 1))}
              disabled={pager.page === pager.pages}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Reports() {
  const [coolant] = React.useState(() => genCoolant());
  const [cellar] = React.useState(() => genOilCellar());
  const [pumps] = React.useState(() => genPumps());
  const [hp] = React.useState(() => genHpPumps());

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Coolant Report */}
        <TableSection
          title="Coolant Report"
          data={coolant}
          headers={[
            'SN',
            'Date',
            'Oil Conc. %',
            'Conductivity μS/cm',
            'pH',
            'Temp Deg.C',
            'ESI',
            'Tramp %',
            'Saponification Value (mmKOH/GM)',
            'Tank Lvl kL'
          ]}
          renderRow={(r: CoolantRow, idx, start) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">{start + idx + 1}</td>
              <td className="px-4 py-3 text-sm text-gray-900 font-mono">{r.date}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.oilConc}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.conductivity}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.pH}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.tempC}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.esi}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.tramp}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.saponification}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.tankLvl}</td>
            </tr>
          )}
        />

        {/* Oil Cellar Report */}
        <TableSection
          title="Oil Cellar Report"
          data={cellar}
          headers={[
            'SN',
            'Date',
            'Temp Deg.C',
            'Humidity %',
            'AQI Area#1',
            'AQI Area#2',
            'AQI Area#3',
            'Access Control Status',
            'Person Entered',
            'No. of persons w/o ppe',
            'Welding',
            'Cutting',
            'Others',
            'Area#1',
            'Area#2',
            'Area#3',
            'Area#4',
            'Area#5',
            'Inspection Status',
            'Next Exp. Due'
          ]}
          renderRow={(r: OilCellarRow, idx, start) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">{start + idx + 1}</td>
              <td className="px-4 py-3 text-sm text-gray-900 font-mono">{r.date}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.tempC}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.humidity}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.aqiA1}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.aqiA2}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.aqiA3}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.accessControl}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.personsEntered}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.noPpe}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.welding}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.cutting}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.others}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.illumA1}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.illumA2}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.illumA3}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.illumA4}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.illumA5}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 rounded text-xs font-medium ${r.fireStatus === 'OK' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {r.fireStatus}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 font-mono">{r.fireNextDue}</td>
            </tr>
          )}
        />

        {/* Roll Coolant Pump Status */}
        <TableSection
          title="Roll Coolant Pump Status"
          data={pumps}
          headers={[
            'SN',
            'Date',
            'Pump No',
            'Status (Run/Stand-by)',
            'Run Hrs',
            'Avg. Load',
            'Avg Pressure'
          ]}
          renderRow={(r: PumpRow, idx, start) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">{start + idx + 1}</td>
              <td className="px-4 py-3 text-sm text-gray-900 font-mono">{r.date}</td>
              <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{r.pumpNo}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${r.status === 'Run' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {r.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.runHrs}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.avgLoad}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.avgPressure}</td>
            </tr>
          )}
        />

        {/* HP Pump Status */}
        <TableSection
          title="HP Pump Status"
          data={hp}
          headers={[
            'SN',
            'Date',
            'Pump No',
            'Status (Run/Stand-by)',
            'Run Hrs',
            'Avg. Load',
            'Avg System Pressure',
            'Avg. Tank Level',
            'Avg. Oil Temp',
            'Oil Cleanliness',
            'Water Saturation'
          ]}
          renderRow={(r: HpPumpRow, idx, start) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">{start + idx + 1}</td>
              <td className="px-4 py-3 text-sm text-gray-900 font-mono">{r.date}</td>
              <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{r.pumpNo}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${r.status === 'Run' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {r.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.runHrs}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.avgLoad}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.avgSystemPressure}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.avgTankLevel}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.avgOilTemp}</td>
              <td className="px-4 py-3 text-sm text-gray-900 font-mono">{r.oilCleanliness}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{r.waterSaturation}</td>
            </tr>
          )}
        />
      </div>
    </div>
  );
}