import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Droplets, 
  Cog, 
  ShieldAlert, 
  AlertTriangle, 
  FileText,
  Monitor,
  Gauge
} from 'lucide-react';

const navigationItems = [
  { 
    path: '/', 
    name: 'Overview', 
    icon: Monitor,
    description: 'HMI-01'
  },
  { 
    path: '/hydraulic', 
    name: 'Hydraulic System', 
    icon: Droplets,
    description: 'HMI-02'
  },
  { 
    path: '/pumps', 
    name: 'Pump Operations', 
    icon: Cog,
    description: 'HMI-03'
  },
  { 
    path: '/oil-cellar', 
    name: 'Oil Cellar Monitor', 
    icon: ShieldAlert,
    description: 'HMI-04'
  },
  { 
    path: '/alarms', 
    name: 'Alarm Management', 
    icon: AlertTriangle,
    description: 'HMI-05'
  },
  { 
    path: '/reports', 
    name: 'Reports', 
    icon: FileText,
    description: 'HMI-06'
  },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-primary shadow-elevated flex flex-col">
      <div className="p-6 border-b border-primary-hover">
        <div className="flex items-center space-x-3">
          <Gauge className="h-8 w-8 text-secondary" />
          <div>
            <h1 className="text-lg font-semibold text-primary-foreground">
              Roll Coolant
            </h1>
            <p className="text-sm text-primary-foreground/70">
              Monitoring System
            </p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-secondary text-secondary-foreground shadow-glow'
                    : 'text-primary-foreground/80 hover:bg-primary-hover hover:text-primary-foreground'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-primary-hover">
        <div className="text-xs text-primary-foreground/60 text-center">
          Industrial Monitoring v2.1
        </div>
      </div>
    </div>
  );
};