import React, { useState } from 'react';
import { ReportFilters } from './ReportFilters';
import { ReportCharts } from './ReportCharts';
import { ReportTable } from './ReportTable';
import { ExportReport } from './ExportReport';
import { Calendar, Download, TrendingUp } from 'lucide-react';

export interface ReportData {
  period: string;
  users: number;
  orders: number;
  revenue: number;
  growth: number;
}

const mockReportData: ReportData[] = [
  { period: '2024-01', users: 150, orders: 45, revenue: 5420, growth: 12.5 },
  { period: '2024-02', users: 180, orders: 52, revenue: 6240, growth: 15.1 },
  { period: '2024-03', users: 210, orders: 68, revenue: 8150, growth: 30.6 },
  { period: '2024-04', users: 245, orders: 78, revenue: 9340, growth: 14.6 },
  { period: '2024-05', users: 290, orders: 95, revenue: 11230, growth: 20.2 },
  { period: '2024-06', users: 320, orders: 105, revenue: 12560, growth: 11.8 },
];

export function Reports() {
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-06-30' });
  const [reportType, setReportType] = useState('overview');
  const [reportData, setReportData] = useState<ReportData[]>(mockReportData);

  const totalUsers = reportData.reduce((sum, item) => sum + item.users, 0);
  const totalOrders = reportData.reduce((sum, item) => sum + item.orders, 0);
  const totalRevenue = reportData.reduce((sum, item) => sum + item.revenue, 0);
  const avgGrowth = reportData.reduce((sum, item) => sum + item.growth, 0) / reportData.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate detailed reports and export data</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </button>
          <ExportReport data={reportData} />
        </div>
      </div>

      <ReportFilters
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        reportType={reportType}
        onReportTypeChange={setReportType}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold text-foreground">{totalUsers.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-foreground">{totalOrders.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Growth</p>
              <p className="text-2xl font-bold text-foreground">{avgGrowth.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <ReportCharts data={reportData} />

      <ReportTable data={reportData} />
    </div>
  );
}