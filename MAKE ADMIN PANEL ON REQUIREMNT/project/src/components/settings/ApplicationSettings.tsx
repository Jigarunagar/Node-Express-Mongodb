import React, { useState } from 'react';
import { Save, Palette, Bell, Globe } from 'lucide-react';

export function ApplicationSettings() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'UTC',
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
    features: {
      analytics: true,
      autoSave: true,
      betaFeatures: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating application settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center mb-6">
          <Palette className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="input w-auto"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </form>
      </div>

      <div className="card p-6">
        <div className="flex items-center mb-6">
          <Globe className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-foreground">Localization</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="input"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="input"
            >
              <option value="UTC">UTC</option>
              <option value="PST">Pacific Time</option>
              <option value="EST">Eastern Time</option>
              <option value="GMT">Greenwich Mean Time</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center mb-6">
          <Bell className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email: e.target.checked }
                })}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${
                settings.notifications.email ? 'bg-primary' : 'bg-muted'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  settings.notifications.email ? 'translate-x-5' : 'translate-x-1'
                } mt-1`} />
              </div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, push: e.target.checked }
                })}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${
                settings.notifications.push ? 'bg-primary' : 'bg-muted'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  settings.notifications.push ? 'translate-x-5' : 'translate-x-1'
                } mt-1`} />
              </div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Marketing Communications</p>
              <p className="text-sm text-muted-foreground">Receive updates about new features</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.marketing}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, marketing: e.target.checked }
                })}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${
                settings.notifications.marketing ? 'bg-primary' : 'bg-muted'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  settings.notifications.marketing ? 'translate-x-5' : 'translate-x-1'
                } mt-1`} />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Advanced Features</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Analytics Tracking</p>
              <p className="text-sm text-muted-foreground">Enable usage analytics for better insights</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.features.analytics}
                onChange={(e) => setSettings({
                  ...settings,
                  features: { ...settings.features, analytics: e.target.checked }
                })}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${
                settings.features.analytics ? 'bg-primary' : 'bg-muted'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  settings.features.analytics ? 'translate-x-5' : 'translate-x-1'
                } mt-1`} />
              </div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Auto Save</p>
              <p className="text-sm text-muted-foreground">Automatically save changes as you work</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.features.autoSave}
                onChange={(e) => setSettings({
                  ...settings,
                  features: { ...settings.features, autoSave: e.target.checked }
                })}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${
                settings.features.autoSave ? 'bg-primary' : 'bg-muted'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  settings.features.autoSave ? 'translate-x-5' : 'translate-x-1'
                } mt-1`} />
              </div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Beta Features</p>
              <p className="text-sm text-muted-foreground">Enable experimental features</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.features.betaFeatures}
                onChange={(e) => setSettings({
                  ...settings,
                  features: { ...settings.features, betaFeatures: e.target.checked }
                })}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${
                settings.features.betaFeatures ? 'bg-primary' : 'bg-muted'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  settings.features.betaFeatures ? 'translate-x-5' : 'translate-x-1'
                } mt-1`} />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="btn-primary"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
}