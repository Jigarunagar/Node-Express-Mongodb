import React, { useState } from 'react';
import { Save, Key, Shield, AlertTriangle } from 'lucide-react';

export function SecuritySettings() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [apiKeysVisible, setApiKeysVisible] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Changing password:', passwordData);
  };

  const mockApiKeys = [
    { id: '1', name: 'Production API', key: 'sk_live_••••••••••••••••••••••••', created: '2024-01-15' },
    { id: '2', name: 'Development API', key: 'sk_test_••••••••••••••••••••••••', created: '2024-01-10' },
  ];

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center mb-6">
          <Key className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-foreground">Password</h2>
        </div>
        
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="input"
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn-primary"
          >
            <Save className="w-4 h-4 mr-2" />
            Change Password
          </button>
        </form>
      </div>

      <div className="card p-6">
        <div className="flex items-center mb-6">
          <Shield className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h2>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="font-medium text-foreground">Enable 2FA</p>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-colors ${
              twoFactorEnabled ? 'bg-primary' : 'bg-muted'
            }`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                twoFactorEnabled ? 'translate-x-5' : 'translate-x-1'
              } mt-1`} />
            </div>
          </label>
        </div>
        
        {twoFactorEnabled && (
          <div className="mt-4 p-4 border border-border rounded-lg">
            <p className="text-sm text-foreground mb-2">
              Scan this QR code with your authenticator app:
            </p>
            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">QR Code</span>
            </div>
          </div>
        )}
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Key className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-foreground">API Keys</h2>
          </div>
          <button
            onClick={() => setApiKeysVisible(!apiKeysVisible)}
            className="btn-secondary text-sm"
          >
            {apiKeysVisible ? 'Hide Keys' : 'Show Keys'}
          </button>
        </div>
        
        <div className="space-y-3">
          {mockApiKeys.map((apiKey) => (
            <div key={apiKey.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">{apiKey.name}</p>
                <p className="text-sm font-mono text-muted-foreground">
                  {apiKeysVisible ? apiKey.key.replace(/•/g, 'x') : apiKey.key}
                </p>
                <p className="text-xs text-muted-foreground">Created: {apiKey.created}</p>
              </div>
              <button className="btn-destructive text-sm">
                Revoke
              </button>
            </div>
          ))}
        </div>
        
        <button className="btn-primary mt-4">
          Generate New API Key
        </button>
      </div>

      <div className="card p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-destructive mr-2" />
          <h2 className="text-lg font-semibold text-foreground">Danger Zone</h2>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border border-destructive/20 rounded-lg">
            <h3 className="font-medium text-foreground mb-2">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="btn-destructive">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}