import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ActiveSection } from './AdminLayout';

interface SidebarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
  collapsed: boolean;
}

const menuItems = [
  { id: 'dashboard' as ActiveSection, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users' as ActiveSection, label: 'Users', icon: Users },
  { id: 'products' as ActiveSection, label: 'Products', icon: Package },
  { id: 'orders' as ActiveSection, label: 'Orders', icon: ShoppingCart },
  { id: 'reports' as ActiveSection, label: 'Reports', icon: BarChart3 },
  { id: 'settings' as ActiveSection, label: 'Settings', icon: Settings },
];

export function Sidebar({ activeSection, onSectionChange, collapsed }: SidebarProps) {
  return (
    <aside className={`bg-card border-r border-border transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
          )}
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`sidebar-item w-full ${isActive ? 'active' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}