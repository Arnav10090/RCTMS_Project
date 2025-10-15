import React, { useEffect, useState } from 'react';
import { Bell, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

function formatDateTime(dt: Date) {
  const date = dt.toLocaleDateString('en-GB'); // yields DD/MM/YYYY
  const time = dt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
  return `${time}, ${date}`;
}

export const Header = ({ onToggleSidebar, isSidebarCollapsed }: HeaderProps) => {
  const [now, setNow] = useState<Date>(new Date());
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="bg-card shadow-industrial border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleSidebar}
            className="shrink-0"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>

          <div>
            <h2 className="text-xl font-semibold text-foreground">
              System Overview
            </h2>
            <p className="text-sm text-muted-foreground">
              Real-time monitoring and control
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div
              className="flex items-center space-x-2 relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
              <span className="text-sm font-medium text-success">System Active</span>

              {showTooltip && (
                <div className="absolute left-0 top-full mt-2 z-50 w-max bg-card border border-border/60 text-sm text-muted-foreground px-3 py-2 rounded shadow-sm whitespace-nowrap">
                  {`Stats last updated at ${now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })} (${now.toLocaleDateString('en-GB')})`}
                </div>
              )}
            </div>

            <div className="text-sm text-muted-foreground font-mono">
              {formatDateTime(now)}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/alarms')}
          >
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
