import React from 'react';
import { useAlarmContext } from './AlarmContext';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export const AlarmFooter: React.FC = () => {
  const { acknowledged, removeAcknowledged, collapsed, setCollapsed } = useAlarmContext();

  return (
    <div className="fixed bottom-0 inset-x-0 z-40">
      <div className="mx-4 mb-4 rounded-md shadow-industrial border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="text-sm font-medium">Acknowledged Alarms ({acknowledged.length})</div>
          <button
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand footer' : 'Collapse footer'}
          >
            {collapsed ? (<><ChevronUp className="h-4 w-4 mr-1"/>Expand</>) : (<><ChevronDown className="h-4 w-4 mr-1"/>Collapse</>)}
          </button>
        </div>
        {!collapsed && (
          <div className="max-h-48 overflow-auto border-t border-border">
            {acknowledged.length === 0 ? (
              <div className="px-4 py-6 text-sm text-muted-foreground">No acknowledged alarms yet.</div>
            ) : (
              <ul className="divide-y divide-border">
                {acknowledged.map(a => (
                  <li key={a.id} className="px-4 py-2 flex items-center gap-3 text-sm">
                    <span className={`px-2 py-0.5 rounded border text-xs font-medium ${
                      a.level === 'critical' ? 'border-danger text-danger' :
                      a.level === 'high' ? 'border-warning text-warning' :
                      a.level === 'medium' ? 'border-secondary text-secondary' :
                      'border-muted text-muted-foreground'
                    }`}>{a.level.toUpperCase()}</span>
                    <span className="flex-1 min-w-0 truncate">{a.message}</span>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                    <button
                      className="ml-2 rounded border px-2 py-1 text-xs hover:bg-muted"
                      onClick={() => removeAcknowledged(a.id)}
                      aria-label="Remove"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
