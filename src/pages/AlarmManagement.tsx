import React, { useState } from 'react';
import { DataCard } from '@/components/DataCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertTriangle,
  Search,
  CheckSquare,
  Download,
  X
} from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { subscribeAlarmOverflow, AckAlarm } from '@/components/AlarmContext';

interface Alarm {
  id: number;
  level: 'critical' | 'high' | 'medium' | 'low';
  alarmNo: string;
  message: string;
  device: string;
  eventTime: string;
  recoveredTime: string | null;
  acknowledged: boolean;
  operator?: string;
}

export const AlarmManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [alarmLevelFilter, setAlarmLevelFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
  
  const generateAlarms = (count: number): Alarm[] => {
    const levels: Alarm['level'][] = ['critical', 'high', 'medium', 'low'];
    const devices = ['Main Hyd #1', 'Clean Tank', 'Oil Tank', 'RCP001', 'MS001', 'AH002', 'GL001', 'P001', 'Filter-01', 'HX-02'];
    return Array.from({ length: count }, (_, i) => {
      const level = levels[i % levels.length];
      const alarmNo = `${level.substring(0,3).toUpperCase()}-${(100+i).toString().padStart(3,'0')}`;
      const message = `${level.toUpperCase()} - Simulated alarm message #${i+1}`;
      const device = devices[i % devices.length];
      const eventTime = new Date(Date.now() - i * 3600 * 1000).toISOString().replace('T',' ').slice(0,19);
      const recoveredTime = i % 5 === 0 ? new Date(Date.now() - (i-1) * 3600 * 1000).toISOString().replace('T',' ').slice(0,19) : null;
      const acknowledged = i % 4 === 0;
      const operator = acknowledged ? `Operator${(i%6)+1}` : undefined;
      return {
        id: i+1,
        level,
        alarmNo,
        message,
        device,
        eventTime,
        recoveredTime,
        acknowledged,
        operator
      } as Alarm;
    });
  };

  const [alarms, setAlarms] = useState<Alarm[]>(() => generateAlarms(50));

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-danger bg-danger/10 border-danger';
      case 'high': return 'text-warning bg-warning/10 border-warning';
      case 'medium': return 'text-primary bg-primary/10 border-primary';
      case 'low': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (alarm: Alarm) => {
    if (!alarm.acknowledged && !alarm.recoveredTime) {
      return <AlertTriangle className="h-4 w-4 text-danger animate-status-blink" />;
    }
    if (alarm.acknowledged && !alarm.recoveredTime) {
      return <CheckSquare className="h-4 w-4 text-warning" />;
    }
    if (alarm.recoveredTime) {
      return <CheckSquare className="h-4 w-4 text-success" />;
    }
    return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
  };

  const filteredAlarms = alarms.filter(alarm => {
    const matchesSearch = alarm.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alarm.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alarm.alarmNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = (filterLevel === 'all' ||
                         (filterLevel === 'active' && !alarm.recoveredTime) ||
                         (filterLevel === 'inactive' && !!alarm.recoveredTime) ||
                         (filterLevel === 'acknowledged' && alarm.acknowledged))
                         && (alarmLevelFilter === 'all' || alarm.level === alarmLevelFilter);

    return matchesSearch && matchesFilter;
  });

  const handleCloseAlarm = React.useCallback((id: number) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
  }, []);

  React.useEffect(() => {
    const unsub = subscribeAlarmOverflow((a: AckAlarm) => {
      setAlarms(prev => [
        {
          id: Date.now(),
          level: a.level,
          alarmNo: `ACK-${Date.now().toString().slice(-6)}`,
          message: a.message,
          device: a.device || 'HMI',
          eventTime: a.time,
          recoveredTime: null,
          acknowledged: true,
          operator: 'System',
        },
        ...prev,
      ]);
      setCurrentPage(1);
    });
    return () => { unsub(); };
  }, []);

  // Pagination state
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.max(1, Math.ceil(filteredAlarms.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedAlarms = filteredAlarms.slice(startIndex, startIndex + pageSize);
  React.useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [filteredAlarms, pageSize, currentPage, totalPages]);

  const alarmStats = {
    total: alarms.length,
    active: alarms.filter(a => !a.recoveredTime).length,
    critical: alarms.filter(a => a.level === 'critical' && !a.recoveredTime).length,
    unacknowledged: alarms.filter(a => !a.acknowledged && !a.recoveredTime).length
  };

  const hasActiveFilters = searchTerm.trim() !== '' || filterLevel !== 'all' || alarmLevelFilter !== 'all';
  const resetFilters = () => {
    setSearchTerm('');
    setFilterLevel('all');
    setAlarmLevelFilter('all');
  };
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const toCsv = (rows: (string | number | null | undefined)[][]) =>
    rows
      .map(r =>
        r
          .map(v => {
            const s = v == null ? '' : String(v);
            return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
          })
          .join(',')
      )
      .join('\n');

  const handleExport = () => {
    const headers = ['No.', 'Level', 'Alarm No.', 'Message', 'Device', 'Event Time', 'Recovered Time', 'Acknowledged'];
    const rows = filteredAlarms.map((a, i) => [
      i + 1,
      a.level.toUpperCase(),
      a.alarmNo,
      a.message,
      a.device,
      a.eventTime,
      a.recoveredTime || '',
      a.acknowledged ? 'Yes' : 'No',
    ]);
    const csv = toCsv([headers, ...rows]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alarms_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <DataCard title="Alarm Control Panel">
            <div className="flex flex-wrap items-center justify-between w-full gap-y-4 mb-4">
              {/* Search */}
              <div className="flex items-center space-x-2 w-64 shrink-0">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alarms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Filter Buttons */}
                <div className="w-40 shrink-0">
                  <label className="text-xs text-muted-foreground mb-1 block">Status</label>
                  <Select value={["all","active","inactive"].includes(filterLevel as any) ? (filterLevel as any) : 'all'} onValueChange={(v) => setFilterLevel(v as any)}>
                    <SelectTrigger aria-label="Status" className="h-9" >
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Alarm Level dropdown */}
                <div className="w-40 shrink-0">
                  <label className="text-xs text-muted-foreground mb-1 block">Alarm Level</label>
                  <Select value={alarmLevelFilter} onValueChange={(v) => setAlarmLevelFilter(v as any)}>
                    <SelectTrigger aria-label="Alarm Level" className="h-9" >
                      <SelectValue placeholder="Alarm Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    className="shrink-0"
                    variant={filterLevel === 'acknowledged' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterLevel('acknowledged')}
                  >
                    Acknowledged
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div className="flex items-center flex-wrap gap-2">
                  {searchTerm.trim() !== '' && (
                    <Button variant="secondary" size="sm" onClick={() => setSearchTerm('')}>
                      Search: "{searchTerm}"
                      <X className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  {filterLevel !== 'all' && (
                    <Button variant="secondary" size="sm" onClick={() => setFilterLevel('all')}>
                      Status: {capitalize(filterLevel)}
                      <X className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  {alarmLevelFilter !== 'all' && (
                    <Button variant="secondary" size="sm" onClick={() => setAlarmLevelFilter('all')}>
                      Level: {capitalize(alarmLevelFilter)}
                      <X className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Button variant="destructive" size="sm" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}

          </DataCard>
        </div>
      </div>

      {/* Alarm Table */}
      <DataCard title={`Alarm List (${filteredAlarms.length} items)`} className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-11 gap-2 pb-3 mb-4 border-b border-border text-xs font-semibold text-muted-foreground">
            <div className="col-span-1">NO.</div>
            <div className="col-span-3">ALARM LEVEL & NO. & MESSAGE</div>
            <div className="col-span-2">DEVICE</div>
            <div className="col-span-2">EVENT TIME</div>
            <div className="col-span-2">RECOVERED TIME</div>
            <div className="col-span-1 text-right">ACTIONS</div>
          </div>

          {paginatedAlarms.map((alarm, idx) => (
            <div
              key={alarm.id}
              className={`grid grid-cols-11 gap-2 py-3 border-b border-border/50 text-sm hover:bg-muted/20 transition-colors ${
                !alarm.acknowledged && !alarm.recoveredTime ? 'bg-danger/5' : ''
              }`}
            >
              <div className="col-span-1 font-mono">
                {(startIndex + idx + 1).toString().padStart(2, '0')}
              </div>

              <div className="col-span-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getLevelColor(alarm.level)}`}>
                      {alarm.level.toUpperCase()}
                    </span>
                    <span className="font-mono text-xs">{alarm.alarmNo}</span>
                  </div>
                  <div className="text-sm font-medium">{alarm.message}</div>
                </div>
              </div>

              <div className="col-span-2 font-mono">
                {alarm.device}
              </div>

              <div className="col-span-2 font-mono text-xs">
                {alarm.eventTime}
              </div>

              <div className="col-span-2 font-mono text-xs">
                {alarm.recoveredTime || (
                  <span className="text-muted-foreground">Not recovered</span>
                )}
              </div>

              <div className="col-span-1 flex items-start justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCloseAlarm(alarm.id)}
                >
                  Close
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredAlarms.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No alarms match the current filter criteria.
          </div>
        )}

        {/* Pagination Controls */}
        {filteredAlarms.length > 0 && (
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredAlarms.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + pageSize, filteredAlarms.length)} of {filteredAlarms.length}
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="bg-card border border-border text-sm rounded px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>

              <div className="flex items-center space-x-1">
                <div className="flex flex-col items-center">
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" onClick={() => { setCurrentPage(1); }} disabled={currentPage === 1}>&laquo;</Button>
                    <Button size="sm" variant="outline" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>&lsaquo;</Button>
                    <Button size="sm" variant="outline" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>&rsaquo;</Button>
                    <Button size="sm" variant="outline" onClick={() => { setCurrentPage(totalPages); }} disabled={currentPage === totalPages}>&raquo;</Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 w-full flex justify-between">
                    <span>BWD</span>
                    <span>FWD</span>
                  </div>
                </div>
                <div className="px-2 text-sm">Page {currentPage} / {totalPages}</div>
              </div>
            </div>
          </div>
        )}
      </DataCard>
    </div>
  );
};
