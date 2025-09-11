import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { ReportData } from './Reports';

interface ReportTableProps {
  data: ReportData[];
}

type SortField = keyof ReportData;
type SortDirection = 'asc' | 'desc';

export function ReportTable({ data }: ReportTableProps) {
  const [sortField, setSortField] = useState<SortField>('period');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-4 h-4" />
      : <ArrowDown className="w-4 h-4" />;
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Detailed Report Data</h3>
      
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="table-header">
            <tr className="table-row">
              <th className="table-head">
                <button
                  onClick={() => handleSort('period')}
                  className="flex items-center space-x-2 hover:text-foreground"
                >
                  <span>Period</span>
                  {getSortIcon('period')}
                </button>
              </th>
              <th className="table-head">
                <button
                  onClick={() => handleSort('users')}
                  className="flex items-center space-x-2 hover:text-foreground"
                >
                  <span>Users</span>
                  {getSortIcon('users')}
                </button>
              </th>
              <th className="table-head">
                <button
                  onClick={() => handleSort('orders')}
                  className="flex items-center space-x-2 hover:text-foreground"
                >
                  <span>Orders</span>
                  {getSortIcon('orders')}
                </button>
              </th>
              <th className="table-head">
                <button
                  onClick={() => handleSort('revenue')}
                  className="flex items-center space-x-2 hover:text-foreground"
                >
                  <span>Revenue</span>
                  {getSortIcon('revenue')}
                </button>
              </th>
              <th className="table-head">
                <button
                  onClick={() => handleSort('growth')}
                  className="flex items-center space-x-2 hover:text-foreground"
                >
                  <span>Growth %</span>
                  {getSortIcon('growth')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {sortedData.map((item) => (
              <tr key={item.period} className="table-row">
                <td className="table-cell font-mono text-sm">
                  {item.period}
                </td>
                <td className="table-cell font-medium">
                  {item.users.toLocaleString()}
                </td>
                <td className="table-cell font-medium">
                  {item.orders.toLocaleString()}
                </td>
                <td className="table-cell font-medium">
                  ${item.revenue.toLocaleString()}
                </td>
                <td className="table-cell">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.growth > 0 
                      ? 'text-green-500 bg-green-500/10' 
                      : 'text-red-500 bg-red-500/10'
                  }`}>
                    {item.growth > 0 ? '+' : ''}{item.growth.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}