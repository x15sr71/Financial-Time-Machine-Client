import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const netWorthData = [
  { month: 'Jan', current: 500000, whatIf: 500000 },
  { month: 'Feb', current: 520000, whatIf: 550000 },
  { month: 'Mar', current: 540000, whatIf: 600000 },
  { month: 'Apr', current: 560000, whatIf: 650000 },
  { month: 'May', current: 580000, whatIf: 700000 },
  { month: 'Jun', current: 600000, whatIf: 750000 },
];

const expenseData = [
  { name: 'Rent', value: 25000, color: '#8884d8' },
  { name: 'Utilities', value: 5000, color: '#82ca9d' },
  { name: 'Groceries', value: 10000, color: '#ffc658' },
  { name: 'Subscriptions', value: 2000, color: '#ff8042' },
  { name: 'Miscellaneous', value: 8000, color: '#0088fe' },
];

interface ReverseSimulatorProps {
  selectedSection: string;
  darkMode: boolean;
  cardClass: string;
  inputClass: string;
  buttonPrimaryClass: string;
}

const ReverseSimulator: React.FC<ReverseSimulatorProps> = ({
  selectedSection,
  darkMode,
  cardClass,
  inputClass,
  buttonPrimaryClass,
}) => {
  if (selectedSection !== 'backward-simulator') return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reverse Decisions</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card - Past Decision */}
        <div className={`rounded-lg border p-6 ${cardClass} lg:col-span-1`}>
          <h3 className="text-lg font-medium mb-4">Past Financial Decisions</h3>

          <div className="mb-6">
            <label className="block text-sm mb-2">Select a past decision to analyze:</label>
            <select className={`w-full px-3 py-2 rounded-md border ${inputClass}`}>
              <option>iPhone 14 Pro - ₹1,40,000 - Jan 2023</option>
              <option>Invested ₹1,00,000 in Crypto - Nov 2021</option>
              <option>Vacation to Goa - ₹80,000 - Dec 2022</option>
              <option>Home Theater System - ₹75,000 - Mar 2023</option>
            </select>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Alternative Scenario</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Instead, I would have:</label>
                <select className={`w-full px-3 py-2 rounded-md border ${inputClass}`}>
                  <option>Invested in Index Fund</option>
                  <option>Put into Fixed Deposit</option>
                  <option>Invested in Gold</option>
                  <option>Used for Debt Repayment</option>
                  <option>Added to Emergency Fund</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Expected Annual Return (%)</label>
                <input
                  type="number"
                  className={`w-full px-3 py-2 rounded-md border ${inputClass}`}
                  placeholder="12"
                  defaultValue="12"
                />
              </div>
            </div>
          </div>

          <button className={`px-4 py-2 rounded-md w-full ${buttonPrimaryClass}`}>
            Undo & Simulate Alternate Timeline
          </button>
        </div>

        {/* Right Card - Graph & Impact */}
        <div className={`rounded-lg border p-6 ${cardClass} lg:col-span-2`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Alternative Timeline Impact</h3>
            <div className="flex items-center space-x-1 text-sm">
              <div className="h-3 w-3 rounded-full bg-indigo-500" />
              <span>Actual</span>
              <div className="h-3 w-3 rounded-full bg-green-500 ml-3" />
              <span>Alternative</span>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={netWorthData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#475569' : '#e5e7eb'} />
                <XAxis
                  dataKey="month"
                  stroke={darkMode ? '#cbd5e1' : '#6b7280'}
                  tick={{ fill: darkMode ? '#cbd5e1' : '#6b7280' }}
                />
                <YAxis
                  stroke={darkMode ? '#cbd5e1' : '#6b7280'}
                  tick={{ fill: darkMode ? '#cbd5e1' : '#6b7280' }}
                  tickFormatter={(value) => `₹${value / 1000}K`}
                />
                <RechartsTooltip
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, null]}
                  contentStyle={{
                    backgroundColor: darkMode ? '#334155' : '#ffffff',
                    borderColor: darkMode ? '#475569' : '#e5e7eb',
                    color: darkMode ? '#f1f5f9' : '#1f2937',
                  }}
                  labelStyle={{ color: darkMode ? '#f1f5f9' : '#1f2937' }}
                />
                <Legend wrapperStyle={{ color: darkMode ? '#f1f5f9' : '#1f2937' }} />
                <Line
                  type="monotone"
                  dataKey="current"
                  name="Actual Timeline"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="whatIf"
                  name="Alternative Timeline"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
  <h4 className="text-sm font-medium mb-3">Monthly Expense Breakdown</h4>
  <ul className="space-y-2 text-sm">
    {expenseData.map((expense) => (
      <li key={expense.name} className="flex justify-between items-center">
        <span className="flex items-center">
          <span
            className="inline-block w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: expense.color }}
          ></span>
          {expense.name}
        </span>
        <span>₹{expense.value.toLocaleString()}</span>
      </li>
    ))}
  </ul>
</div>

        </div>
      </div>
    </div>
  );
};

export default ReverseSimulator;
