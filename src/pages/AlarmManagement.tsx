import React, { useState } from 'react';
import { DataCard } from '@/components/DataCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertTriangle,
  Search,
  Volume2,
  VolumeX,
  CheckSquare,
  Download,
  MessageSquare
} from 'lucide-react';

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
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  
  const [alarms] = useState<Alarm[]>([
    {
      id: 1,
      level: 'critical',
      alarmNo: 'HYD-001',
      message: 'Main Hydraulic Pressure Low - Below 120 bar',
      device: 'Main Hyd #1',
      eventTime: '2024/03/15 14:32:15',
      recoveredTime: null,
      acknowledged: false
    },
    {
      id: 2,
      level: 'high',
      alarmNo: 'COOL-025',
      message: 'Coolant Tank Level Low - Below 30%',
      device: 'Clean Tank',
      eventTime: '2024/03/15 14:28:42',
      recoveredTime: null,
      acknowledged: true,
      operator: 'J.Smith'
    },
    {
      id: 3,
      level: 'medium',
      alarmNo: 'TEMP-012',
      message: 'Oil Temperature High - Above 55°C',
      device: 'Oil Tank',
      eventTime: '2024/03/15 14:15:33',
      recoveredTime: '2024/03/15 14:45:12',
      acknowledged: true,
      operator: 'M.Garcia'
    },
    {
      id: 4,
      level: 'critical',
      alarmNo: 'PUMP-008',
      message: 'Roll Coolant Pump#1 Motor Fault',
      device: 'RCP001',
      eventTime: '2024/03/15 13:58:21',
      recoveredTime: null,
      acknowledged: false
    },
    {
      id: 5,
      level: 'high',
      alarmNo: 'FILT-003',
      message: 'Magnetic Separator High Differential Pressure',
      device: 'MS001',
      eventTime: '2024/03/15 13:45:18',
      recoveredTime: '2024/03/15 14:12:05',
      acknowledged: true,
      operator: 'D.Chen'
    },
    {
      id: 6,
      level: 'low',
      alarmNo: 'MAINT-007',
      message: 'Scheduled Maintenance Due - Aux Hyd Pump#2',
      device: 'AH002',
      eventTime: '2024/03/15 12:00:00',
      recoveredTime: null,
      acknowledged: true,
      operator: 'System'
    },
    {
      id: 7,
      level: 'medium',
      alarmNo: 'VIB-015',
      message: 'High Vibration Detected - Gear Lubn Pump#1',
      device: 'GL001',
      eventTime: '2024/03/15 11:33:27',
      recoveredTime: null,
      acknowledged: false
    },
    {
      id: 8,
      level: 'high',
      alarmNo: 'FLOW-009',
      message: 'Low Flow Rate - Main Circulation',
      device: 'P001',
      eventTime: '2024/03/15 10:42:15',
      recoveredTime: '2024/03/15 11:15:33',
      acknowledged: true,
      operator: 'J.Smith'
    }
  ]);

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
    
    const matchesFilter = filterLevel === 'all' || 
                         (filterLevel === 'active' && !alarm.recoveredTime) ||
                         (filterLevel === 'acknowledged' && alarm.acknowledged) ||
                         (filterLevel === 'critical' && alarm.level === 'critical');
    
    return matchesSearch && matchesFilter;
  });

  const alarmStats = {
    total: alarms.length,
    active: alarms.filter(a => !a.recoveredTime).length,
    critical: alarms.filter(a => a.level === 'critical' && !a.recoveredTime).length,
    unacknowledged: alarms.filter(a => !a.acknowledged && !a.recoveredTime).length
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <DataCard title="Alarm Control Panel">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* Search */}
              <div className="flex items-center space-x-2 flex-1 min-w-64">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alarms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={filterLevel === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterLevel('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterLevel === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterLevel('active')}
                >
                  Active
                </Button>
                <Button
                  variant={filterLevel === 'critical' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterLevel('critical')}
                >
                  Critical
                </Button>
                <Button
                  variant={filterLevel === 'acknowledged' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterLevel('acknowledged')}
                >
                  Acknowledged
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Acknowledge Selected
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                {audioEnabled ? (
                  <Volume2 className="h-4 w-4 mr-2" />
                ) : (
                  <VolumeX className="h-4 w-4 mr-2" />
                )}
                Audio {audioEnabled ? 'On' : 'Off'}
              </Button>
            </div>
          </DataCard>
        </div>
      </div>

      {/* Alarm Table */}
      <DataCard title={`Alarm List (${filteredAlarms.length} items)`} className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-12 gap-2 pb-3 mb-4 border-b border-border text-xs font-semibold text-muted-foreground">
            <div className="col-span-1">NO.</div>
            <div className="col-span-3">ALARM LEVEL & NO. & MESSAGE</div>
            <div className="col-span-2">DEVICE</div>
            <div className="col-span-2">EVENT TIME</div>
            <div className="col-span-2">RECOVERED TIME</div>
            <div className="col-span-1">STATUS</div>
            <div className="col-span-1">ACTIONS</div>
          </div>

          {filteredAlarms.map((alarm, index) => (
            <div 
              key={alarm.id} 
              className={`grid grid-cols-12 gap-2 py-3 border-b border-border/50 text-sm hover:bg-muted/20 transition-colors ${
                !alarm.acknowledged && !alarm.recoveredTime ? 'bg-danger/5' : ''
              }`}
            >
              <div className="col-span-1 font-mono">
                {(index + 1).toString().padStart(2, '0')}
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
              
              <div className="col-span-1 flex items-center">
                {getStatusIcon(alarm)}
              </div>
              
              <div className="col-span-1 flex space-x-1">
                {!alarm.acknowledged && (
                  <Button variant="outline" size="sm" className="p-1">
                    <CheckSquare className="h-3 w-3" />
                  </Button>
                )}
                <Button variant="outline" size="sm" className="p-1">
                  <MessageSquare className="h-3 w-3" />
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
      </DataCard>
    </div>
  );
};
