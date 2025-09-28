import React from 'react';
import { Calendar, Filter } from 'lucide-react';

interface ReportFiltersProps {
  dateRange: { start: string; end: string };
  onDateRangeChange: (range: { start: string; end: string }) => void;
  reportType: string;
  onReportTypeChange: (type: string) => void;
}

export function ReportFilters({ 
  dateRange, 
  onDateRangeChange, 
  reportType, 
  onReportTypeChange 
}: ReportFiltersProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => onReportTypeChange(e.target.value)}
            className="input"
          >
            <option value="overview">Overview</option>
            <option value="users">Users</option>
            <option value="sales">Sales</option>
            <option value="products">Products</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
              className="input pl-10"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
              className="input pl-10"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Compare To
          </label>
          <select className="input">
            <option value="none">None</option>
            <option value="previous">Previous Period</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>
    </div>
  );
}