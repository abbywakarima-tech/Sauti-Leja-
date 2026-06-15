'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Report {
  id: string;
  reportType: string;
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalTransactions: number;
  createdAt: string;
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly'>('monthly');
  const [generatingReport, setGeneratingReport] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Mock data
    setTimeout(() => {
      setReports([
        {
          id: '1',
          reportType: 'monthly',
          startDate: '2024-06-01',
          endDate: '2024-06-30',
          totalRevenue: 425000,
          totalTransactions: 156,
          createdAt: '2024-06-30',
        },
        {
          id: '2',
          reportType: 'weekly',
          startDate: '2024-06-24',
          endDate: '2024-06-30',
          totalRevenue: 98250,
          totalTransactions: 35,
          createdAt: '2024-06-30',
        },
      ]);
      setLoading(false);
    }, 500);
  }, [router]);

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    setTimeout(() => {
      toast.success(`${reportType} report generated!`);
      setGeneratingReport(false);
    }, 2000);
  };

  const handleDownload = (format: 'pdf' | 'excel' | 'csv') => {
    toast.success(`Report downloaded as ${format.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Financial Reports</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Generate Report Section */}
        <div className="bg-white p-6 rounded-lg card-shadow mb-8">
          <h2 className="text-lg font-bold mb-4">Generate New Report</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
              <option value="quarterly">Quarterly Report</option>
            </select>
            <button
              onClick={handleGenerateReport}
              disabled={generatingReport}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:bg-gray-400"
            >
              {generatingReport ? 'Generating...' : '📊 Generate Report'}
            </button>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white p-8 text-center rounded-lg">Loading reports...</div>
          ) : reports.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-lg">
              <p className="text-gray-600">No reports generated yet</p>
            </div>
          ) : (
            reports.map(report => (
              <div key={report.id} className="bg-white p-6 rounded-lg card-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg capitalize">{report.reportType} Report</h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(report.startDate).toLocaleDateString()} - {new Date(report.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">Generated: {new Date(report.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-gray-600 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-primary-600">KES {report.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Transactions</p>
                    <p className="text-2xl font-bold">{report.totalTransactions}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Avg Transaction</p>
                    <p className="text-2xl font-bold">KES {Math.round(report.totalRevenue / report.totalTransactions).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleDownload('pdf')} className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 font-medium text-sm">
                    📄 PDF
                  </button>
                  <button onClick={() => handleDownload('excel')} className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium text-sm">
                    📊 Excel
                  </button>
                  <button onClick={() => handleDownload('csv')} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm">
                    📑 CSV
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
