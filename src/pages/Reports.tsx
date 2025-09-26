import React, { useState } from 'react';
import { DataCard } from '@/components/DataCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Calendar, 
  Download, 
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
  Filter,
  Settings
} from 'lucide-react';

export const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<string>('performance');
  
  const reportTemplates = [
    {
      id: 'performance',
      name: 'System Performance Report',
      description: 'Comprehensive analysis of equipment performance and efficiency',
      frequency: 'Daily/Weekly/Monthly',
      lastGenerated: '2024/03/15 08:00:00'
    },
    {
      id: 'maintenance',
      name: 'Maintenance Schedule Report',
      description: 'Planned and completed maintenance activities summary',
      frequency: 'Weekly/Monthly',
      lastGenerated: '2024/03/14 16:30:00'
    },
    {
      id: 'coolant',
      name: 'Coolant Analysis Report',
      description: 'Coolant quality, consumption, and system analysis',
      frequency: 'Daily/Weekly',
      lastGenerated: '2024/03/15 12:00:00'
    },
    {
      id: 'energy',
      name: 'Energy Consumption Report',
      description: 'Power usage analysis and efficiency metrics',
      frequency: 'Daily/Monthly',
      lastGenerated: '2024/03/15 06:00:00'
    },
    {
      id: 'safety',
      name: 'Safety & Compliance Report',
      description: 'Safety incidents, compliance status, and audit trails',
      frequency: 'Weekly/Monthly',
      lastGenerated: '2024/03/14 18:00:00'
    },
    {
      id: 'alarms',
      name: 'Alarm History Report',
      description: 'Alarm frequency, response times, and trend analysis',
      frequency: 'Daily/Weekly',
      lastGenerated: '2024/03/15 14:30:00'
    }
  ];

  const recentReports = [
    { name: 'Daily Performance Summary', date: '2024/03/15', size: '2.4 MB', format: 'PDF' },
    { name: 'Weekly Maintenance Report', date: '2024/03/14', size: '1.8 MB', format: 'Excel' },
    { name: 'Coolant Quality Analysis', date: '2024/03/15', size: '950 KB', format: 'PDF' },
    { name: 'Monthly Energy Report', date: '2024/03/01', size: '3.2 MB', format: 'PDF' },
    { name: 'Safety Audit Summary', date: '2024/03/10', size: '1.2 MB', format: 'Excel' }
  ];

  const performanceData = {
    systemUptime: 98.7,
    totalEnergyConsumption: 2847.5,
    equipmentEfficiency: 94.2,
    maintenanceCompliance: 96.8,
    alarmCount: 23,
    responseTime: 2.3
  };

  return (
    <div className="space-y-6">
      {/* Report Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <DataCard title="Reports Generated" icon={FileText} variant="primary">
          <div className="text-3xl font-bold text-primary">147</div>
          <div className="text-sm text-muted-foreground">This month</div>
        </DataCard>

        <DataCard title="Scheduled Reports" icon={Clock}>
          <div className="text-3xl font-bold text-foreground">12</div>
          <div className="text-sm text-muted-foreground">Active schedules</div>
        </DataCard>

        <DataCard title="Data Points" icon={BarChart3} variant="success">
          <div className="text-3xl font-bold text-success">1.2M</div>
          <div className="text-sm text-muted-foreground">Collected today</div>
        </DataCard>

        <DataCard title="Export Formats" icon={Download}>
          <div className="text-3xl font-bold text-foreground">5</div>
          <div className="text-sm text-muted-foreground">Available formats</div>
        </DataCard>
      </div>

      {/* Report Builder */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <DataCard title="Report Templates">
            <div className="space-y-4">
              {reportTemplates.map((template) => (
                <div 
                  key={template.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedReport === template.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedReport(template.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>Frequency: {template.frequency}</span>
                        <span>Last: {template.lastGenerated}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DataCard>
        </div>

        <div className="space-y-4">
          <DataCard title="Report Configuration">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Date Range</label>
                <div className="flex space-x-2 mt-1">
                  <Input type="date" className="flex-1" />
                  <Input type="date" className="flex-1" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Format</label>
                <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="sm" className="flex-1">PDF</Button>
                  <Button variant="outline" size="sm" className="flex-1">Excel</Button>
                  <Button variant="outline" size="sm" className="flex-1">CSV</Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Include Sections</label>
                <div className="space-y-2 mt-2">
                  {['Summary', 'Detailed Data', 'Charts', 'Recommendations'].map((section) => (
                    <label key={section} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">{section}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </DataCard>

          <DataCard title="Quick Stats">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">System Uptime</span>
                <span className="font-mono font-bold text-success">
                  {performanceData.systemUptime}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Energy Usage</span>
                <span className="font-mono font-bold">
                  {performanceData.totalEnergyConsumption.toLocaleString()} kWh
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Efficiency</span>
                <span className="font-mono font-bold text-success">
                  {performanceData.equipmentEfficiency}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Maintenance</span>
                <span className="font-mono font-bold text-success">
                  {performanceData.maintenanceCompliance}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Alarms</span>
                <span className="font-mono font-bold text-warning">
                  {performanceData.alarmCount}
                </span>
              </div>
            </div>
          </DataCard>
        </div>
      </div>

      {/* Recent Reports */}
      <DataCard title="Recent Reports">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-6 gap-4 pb-3 mb-4 border-b border-border text-sm font-semibold text-muted-foreground">
              <div>Report Name</div>
              <div>Generated Date</div>
              <div>File Size</div>
              <div>Format</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {recentReports.map((report, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 py-3 border-b border-border/50 text-sm hover:bg-muted/20 transition-colors items-center">
                <div className="font-medium">{report.name}</div>
                
                <div className="font-mono text-xs">{report.date}</div>
                
                <div className="font-mono">{report.size}</div>
                
                <div>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-primary/20 text-primary">
                    {report.format}
                  </span>
                </div>
                
                <div>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-success/20 text-success">
                    Complete
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DataCard>

      {/* Data Visualization Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataCard title="Performance Trends" icon={TrendingUp}>
          <div className="h-64 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-dashed border-border/30 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Performance trend chart</p>
              <p className="text-xs text-muted-foreground">Click to view detailed analytics</p>
            </div>
          </div>
        </DataCard>

        <DataCard title="System Distribution" icon={PieChart}>
          <div className="h-64 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-dashed border-border/30 flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">System utilization breakdown</p>
              <p className="text-xs text-muted-foreground">Interactive pie chart view</p>
            </div>
          </div>
        </DataCard>
      </div>
    </div>
  );
};