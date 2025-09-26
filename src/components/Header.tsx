import React from 'react';
import { Bell, Settings, User, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export const Header = ({ onToggleSidebar, isSidebarCollapsed }: HeaderProps) => {
  const currentTime = new Date().toLocaleString();
  const { theme, setTheme } = useTheme();
  
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
            <Menu className="h-4 w-4" />
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
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
              <span className="text-sm font-medium text-success">
                System Active
              </span>
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              {currentTime}
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
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};