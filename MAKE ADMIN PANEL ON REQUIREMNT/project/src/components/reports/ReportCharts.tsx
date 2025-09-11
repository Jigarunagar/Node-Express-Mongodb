import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { ReportData } from './Reports';

interface ReportChartsProps {
  data: ReportData[];
}

export function ReportCharts({ data }: ReportChartsProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxUsers = Math.max(...data.map(d => d.users));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Revenue Trends</h3>
          <TrendingUp className="w-5 h-5 text-muted-foreground" />
        </div>
        
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = (item.revenue / maxRevenue) * 100;
            return (
              <div key={item.period} className="flex items-center space-x-4">
                <div className="w-16 text-sm text-muted-foreground font-mono">
                  {item.period}
                </div>
                <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-20 text-sm font-medium text-foreground text-right">
                  ${item.revenue.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">User Growth</h3>
          <BarChart3 className="w-5 h-5 text-muted-foreground" />
        </div>
        
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = (item.users / maxUsers) * 100;
            return (
              <div key={item.period} className="flex items-center space-x-4">
                <div className="w-16 text-sm text-muted-foreground font-mono">
                  {item.period}
                </div>
                <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-16 text-sm font-medium text-foreground text-right">
                  {item.users.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}