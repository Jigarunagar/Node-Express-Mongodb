import React, { useState } from 'react';
import { ProfileSettings } from './ProfileSettings';
import { ApplicationSettings } from './ApplicationSettings';
import { SecuritySettings } from './SecuritySettings';
import { User, Settings as SettingsIcon, Shield } from 'lucide-react';

type SettingsTab = 'profile' | 'application' | 'security';

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile' as SettingsTab, label: 'Profile', icon: User },
    { id: 'application' as SettingsTab, label: 'Application', icon: SettingsIcon },
    { id: 'security' as SettingsTab, label: 'Security', icon: Shield },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'application':
        return <ApplicationSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <div className="flex space-x-1 p-1 bg-muted rounded-lg w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div>
        {renderContent()}
      </div>
    </div>
  );
}