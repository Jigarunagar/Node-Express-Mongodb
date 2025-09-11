import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, File } from 'lucide-react';
import { ReportData } from './Reports';

interface ExportReportProps {
  data: ReportData[];
}

export function ExportReport({ data }: ExportReportProps) {
  const [showMenu, setShowMenu] = useState(false);

  const exportToCSV = () => {
    const headers = ['Period', 'Users', 'Orders', 'Revenue', 'Growth %'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.period,
        row.users,
        row.orders,
        row.revenue,
        row.growth
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const exportToPDF = () => {
    // Simulate PDF export
    console.log('Exporting to PDF...');
    alert('PDF export functionality would be implemented here');
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="btn-primary"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Report
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50">
          <div className="p-2">
            <button
              onClick={exportToCSV}
              className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export as CSV
            </button>
            <button
              onClick={exportToJSON}
              className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md"
            >
              <File className="w-4 h-4 mr-2" />
              Export as JSON
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}