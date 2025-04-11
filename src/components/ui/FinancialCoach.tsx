import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const months = Array.from({ length: 121 }, (_, i) => i);

const generateChartData = (growthRate = 0.05) => {
  return months.map(month => ({
    month,
    current: 500000 + month * 10000,
    whatIf: 500000 + month * (10000 + growthRate * 10000),
  }));
};

interface FinancialOverviewProps {
  cardClass: string;
  inputClass: string;
  buttonPrimaryClass: string;
}

const FinancialOverview = ({ cardClass, inputClass, buttonPrimaryClass }: FinancialOverviewProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Financial Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income */}
        <div className={`p-6 rounded-lg border ${cardClass}`}>
          <h3 className="text-lg font-medium mb-4">Income</h3>
          <label className="block text-sm mb-2">Monthly Salary (₹)</label>
          <input type="number" className={`w-full ${inputClass}`} />
          <label className="block text-sm mt-4 mb-2">Freelance/Other Income (₹)</label>
          <input type="number" className={`w-full ${inputClass}`} />
        </div>

        {/* Expenses */}
        <div className={`p-6 rounded-lg border ${cardClass}`}>
          <h3 className="text-lg font-medium mb-4">Expenses</h3>
          {['Rent', 'Utilities', 'Groceries', 'Subscriptions', 'Miscellaneous'].map(label => (
            <div key={label} className="mb-3">
              <label className="block text-sm mb-1">{label} (₹)</label>
              <input type="number" className={`w-full ${inputClass}`} />
            </div>
          ))}
        </div>

        {/* Debts */}
        <div className={`p-6 rounded-lg border ${cardClass}`}>
          <h3 className="text-lg font-medium mb-4">Debts</h3>
          <label className="block text-sm mb-2">Total Debt (₹)</label>
          <input type="number" className={`w-full ${inputClass}`} />
          <label className="block text-sm mt-4 mb-2">Monthly EMI Payment (₹)</label>
          <input type="number" className={`w-full ${inputClass}`} />
        </div>

        {/* Savings & Investments */}
        <div className={`p-6 rounded-lg border ${cardClass}`}>
          <h3 className="text-lg font-medium mb-4">Savings & Investments</h3>
          <label className="block text-sm mb-2">Emergency Fund (₹)</label>
          <input type="number" className={`w-full ${inputClass}`} />
          <label className="block text-sm mt-4 mb-2">Other Savings (₹)</label>
          <input type="number" className={`w-full ${inputClass}`} />
          <label className="block text-sm mt-4 mb-2">SIP Monthly (₹)</label>
          <input type="number" className={`w-full ${inputClass}`} />
          <label className="block text-sm mt-4 mb-2">Lump Sum Investment (₹)</label>
          <input type="number" className={`w-full ${inputClass}`} />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button className={`px-4 py-2 rounded-md ${buttonPrimaryClass}`}>Save</button>
        <button className="px-4 py-2 rounded-md border border-gray-400">Reset</button>
      </div>
    </div>
  );
};

interface ScenarioPlannerProps {
  cardClass: string;
  inputClass: string;
  buttonPrimaryClass: string;
  darkMode: boolean;
}

const ScenarioPlanner = ({ cardClass, inputClass, buttonPrimaryClass, darkMode }: ScenarioPlannerProps) => {
  const [toggleCompare, setToggleCompare] = useState(true);
  const [data, setData] = useState(generateChartData());

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">What-If Scenario Planner</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className={`p-6 rounded-lg border ${cardClass} lg:col-span-1`}>
          <h3 className="text-lg font-medium mb-4">Adjust Your Scenario</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">New Rent (₹5K - ₹50K)</label>
              <input type="range" min="5000" max="50000" className="w-full" />
            </div>
            <div>
              <label className="block text-sm mb-1">Job Switch Salary (₹5LPA - ₹50LPA)</label>
              <input type="range" min="500000" max="5000000" step="50000" className="w-full" />
            </div>
            <div>
              <label className="block text-sm mb-1">SIP Investment Change (₹0 - ₹50K/month)</label>
              <input type="range" min="0" max="50000" step="1000" className="w-full" />
            </div>
            <div>
              <label className="block text-sm mb-1">Expense Growth Rate (0% - 15%)</label>
              <input type="range" min="0" max="15" step="1" className="w-full" />
            </div>
            <div>
              <label className="block text-sm mb-1">One-Time Purchase (₹)</label>
              <input type="number" placeholder="e.g. 400000" className={`w-full ${inputClass}`} />
            </div>
            <button className={`w-full mt-4 ${buttonPrimaryClass}`}>Simulate This Scenario</button>
            <div className="flex items-center mt-2 space-x-2">
              <input type="checkbox" checked={toggleCompare} onChange={() => setToggleCompare(!toggleCompare)} />
              <label className="text-sm">Show Comparison Line</label>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className={`p-6 rounded-lg border ${cardClass} lg:col-span-2`}>
          <h3 className="text-lg font-medium mb-4">Projected Net Worth Over Time</h3>
          <div className={`h-96 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-md`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#475569' : '#e5e7eb'} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: darkMode ? '#cbd5e1' : '#6b7280' }}
                />
                <YAxis
                  tickFormatter={(v) => `₹${v / 1000}K`}
                  tick={{ fill: darkMode ? '#cbd5e1' : '#6b7280' }}
                />
                <Tooltip
                  formatter={(v) => `₹${v.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: darkMode ? '#334155' : '#ffffff',
                    border: darkMode ? '1px solid #475569' : '1px solid #e5e7eb',
                    color: darkMode ? '#f8fafc' : '#111827'
                  }}
                  labelStyle={{ color: darkMode ? '#cbd5e1' : '#111827' }}
                  itemStyle={{ color: darkMode ? '#f1f5f9' : '#111827' }}
                />
                <Legend wrapperStyle={{ color: darkMode ? '#cbd5e1' : '#111827' }} />
                <Line type="monotone" dataKey="current" stroke="#8884d8" name="Current Plan" strokeWidth={2} />
                {toggleCompare && (
                  <Line type="monotone" dataKey="whatIf" stroke="#82ca9d" name="What-If Scenario" strokeWidth={2} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FinancialOverview, ScenarioPlanner };
