import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  CircleDollarSign,
  ArrowRightCircle,
  Save,
  RotateCcw,
  TrendingUp,
  Wallet,
  CreditCard,
  PiggyBank,
} from "lucide-react";

// Format currency for display
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

// Generate chart data with more realistic compound growth
const generateChartData = (
  initialAmount = 500000,
  monthlySavings = 10000,
  growthRate = 0.08,
  whatIfRate = 0.12,
  months = 120
) => {
  const data = [];
  let currentAmount = initialAmount;
  let whatIfAmount = initialAmount;

  for (let month = 0; month <= months; month++) {
    // Compound monthly for more realistic growth
    if (month > 0) {
      currentAmount = currentAmount * (1 + growthRate / 12) + monthlySavings;
      whatIfAmount =
        whatIfAmount * (1 + whatIfRate / 12) + monthlySavings * 1.5; // What-if scenario with higher savings
    }

    data.push({
      month,
      current: Math.round(currentAmount),
      whatIf: Math.round(whatIfAmount),
    });
  }
  return data;
};

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`p-4 rounded-lg shadow-lg ${
          darkMode ? "bg-slate-800 text-white" : "bg-white text-slate-800"
        } border border-slate-200`}
      >
        <p className="text-sm font-semibold mb-2">
          Month {label} ({Math.floor(label / 12)} years, {label % 12} months)
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <p className="text-sm">
              <span className="font-medium">{entry.name}: </span>
              <span>{formatCurrency(entry.value)}</span>
            </p>
          </div>
        ))}
        {payload.length > 1 && (
          <div className="mt-2 pt-2 border-t border-slate-300">
            <p className="text-xs font-semibold text-green-500">
              Difference: {formatCurrency(payload[1].value - payload[0].value)}
            </p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

// Input field component for consistent styling
const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  icon,
  className = "",
  inputClass = "",
  min,
  max,
  step,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none opacity-70">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className={`w-full rounded-md border border-slate-300 shadow-sm 
                 ${icon ? "pl-10" : "pl-3"} py-2 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                 bg-white text-black ${inputClass}`}
        />
      </div>
    </div>
  );
};

// Range slider with value display
const RangeSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  formatValue,
  icon,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium flex items-center gap-1">
          {icon && <span className="opacity-70">{icon}</span>}
          {label}
        </label>
        <span className="text-sm font-bold">{formatValue(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};

// Card component
const Card = ({ title, icon, children, className = "", darkMode = false }) => {
  return (
    <div
      className={`p-6 rounded-lg border transition-all hover:shadow-md ${
        darkMode
          ? "bg-slate-700 border-slate-600 text-white"
          : "bg-white border-slate-200 shadow-sm text-slate-900"
      } ${className}`}
    >
      <div className="flex items-center mb-4 gap-2">
        <span className="text-blue-600">{icon}</span>
        <h3 className={`text-lg font-medium ${darkMode ? "text-white" : ""}`}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};

// Financial Overview Component
const FinancialOverview = () => {
  const [income, setIncome] = useState({ salary: 50000, other: 10000 });
  const [expenses, setExpenses] = useState({
    rent: 15000,
    utilities: 3000,
    groceries: 8000,
    subscriptions: 2000,
    miscellaneous: 5000,
  });
  const [debts, setDebts] = useState({ total: 500000, emi: 10000 });
  const [savings, setSavings] = useState({
    emergency: 100000,
    other: 50000,
    sipMonthly: 10000,
    lumpSum: 200000,
  });

  const [monthlySurplus, setMonthlySurplus] = useState(0);

  // Calculate monthly surplus/deficit
  useEffect(() => {
    const totalIncome = income.salary + income.other;
    const totalExpenses =
      expenses.rent +
      expenses.utilities +
      expenses.groceries +
      expenses.subscriptions +
      expenses.miscellaneous +
      debts.emi;
    setMonthlySurplus(totalIncome - totalExpenses);
  }, [income, expenses, debts]);

  // Handle income changes
  const handleIncomeChange = (field, value) => {
    setIncome({ ...income, [field]: Number(value) });
  };

  // Handle expense changes
  const handleExpenseChange = (field, value) => {
    setExpenses({ ...expenses, [field]: Number(value) });
  };

  // Handle debt changes
  const handleDebtChange = (field, value) => {
    setDebts({ ...debts, [field]: Number(value) });
  };

  // Handle savings changes
  const handleSavingsChange = (field, value) => {
    setSavings({ ...savings, [field]: Number(value) });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Financial Overview</h2>
        <p className="text-slate-600">
          Track your income, expenses, and investments to plan for a better
          financial future.
        </p>
      </div>

      {/* Monthly Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6 border border-blue-100 shadow-sm">
        <h3 className="text-lg font-medium mb-3 text-blue-800">
          Monthly Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="text-sm text-gray-500">Total Income</div>
            <div className="text-xl font-bold text-blue-600">
              {formatCurrency(income.salary + income.other)}
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="text-sm text-gray-500">Total Expenses</div>
            <div className="text-xl font-bold text-red-600">
              {formatCurrency(
                expenses.rent +
                  expenses.utilities +
                  expenses.groceries +
                  expenses.subscriptions +
                  expenses.miscellaneous +
                  debts.emi
              )}
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="text-sm text-gray-500">Monthly Surplus</div>
            <div
              className={`text-xl font-bold ${
                monthlySurplus >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(monthlySurplus)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income */}
        <Card title="Income" icon={<CircleDollarSign size={20} />}>
          <FormField
            label="Monthly Salary (₹)"
            type="number"
            value={income.salary}
            onChange={(e) => handleIncomeChange("salary", e.target.value)}
            icon={<Wallet size={16} />}
            min={undefined}
            max={undefined}
            step={undefined}
          />
          <FormField
            label="Freelance/Other Income (₹)"
            type="number"
            value={income.other}
            onChange={(e) => handleIncomeChange("other", e.target.value)}
            icon={<CircleDollarSign size={16} />}
            min={undefined}
            max={undefined}
            step={undefined}
          />
        </Card>

        {/* Expenses */}
        <Card title="Expenses" icon={<ArrowRightCircle size={20} />}>
          <div className="grid grid-cols-2 gap-x-4">
            {Object.entries(expenses).map(([key, value]) => (
              <FormField
                key={key}
                label={`${key.charAt(0).toUpperCase() + key.slice(1)} (₹)`}
                type="number"
                value={value}
                onChange={(e) => handleExpenseChange(key, e.target.value)}
                className="mb-3"
                icon={undefined}
                min={undefined}
                max={undefined}
                step={undefined}
              />
            ))}
          </div>
        </Card>

        {/* Debts */}
        <Card title="Debts" icon={<CreditCard size={20} />}>
          <FormField
            label="Total Debt (₹)"
            type="number"
            value={debts.total}
            onChange={(e) => handleDebtChange("total", e.target.value)}
            icon={undefined}
            min={undefined}
            max={undefined}
            step={undefined}
          />
          <FormField
            label="Monthly EMI Payment (₹)"
            type="number"
            value={debts.emi}
            onChange={(e) => handleDebtChange("emi", e.target.value)}
            icon={undefined}
            min={undefined}
            max={undefined}
            step={undefined}
          />

          {/* Debt insights */}
          {debts.total > 0 && (
            <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-100">
              <p className="text-sm text-amber-800">
                At current EMI, you'll be debt-free in approximately{" "}
                <strong>{Math.ceil(debts.total / debts.emi)}</strong> months.
              </p>
            </div>
          )}
        </Card>

        {/* Savings & Investments */}
        <Card title="Savings & Investments" icon={<PiggyBank size={20} />}>
          <div className="grid grid-cols-2 gap-x-4">
            <FormField
              label="Emergency Fund (₹)"
              type="number"
              value={savings.emergency}
              onChange={(e) => handleSavingsChange("emergency", e.target.value)}
              icon={undefined}
              min={undefined}
              max={undefined}
              step={undefined}
            />
            <FormField
              label="Other Savings (₹)"
              type="number"
              value={savings.other}
              onChange={(e) => handleSavingsChange("other", e.target.value)}
              icon={undefined}
              min={undefined}
              max={undefined}
              step={undefined}
            />
            <FormField
              label="SIP Monthly (₹)"
              type="number"
              value={savings.sipMonthly}
              onChange={(e) =>
                handleSavingsChange("sipMonthly", e.target.value)
              }
              icon={undefined}
              min={undefined}
              max={undefined}
              step={undefined}
            />
            <FormField
              label="Lump Sum Investment (₹)"
              type="number"
              value={savings.lumpSum}
              onChange={(e) => handleSavingsChange("lumpSum", e.target.value)}
              icon={undefined}
              min={undefined}
              max={undefined}
              step={undefined}
            />
          </div>

          {/* Savings insights */}
          <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
            <p className="text-sm text-blue-800">
              Your emergency fund covers{" "}
              <strong>
                {Math.floor(
                  savings.emergency /
                    (expenses.rent +
                      expenses.utilities +
                      expenses.groceries +
                      expenses.miscellaneous)
                )}
              </strong>{" "}
              months of essential expenses.
            </p>
          </div>
        </Card>
      </div>

      <div className="flex gap-4 mt-6">
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <Save size={16} />
          <span>Save</span>
        </button>

        <button className="px-4 py-2 rounded-md border border-gray-400 bg-white hover:bg-gray-50 dark:bg-gray-100 dark:hover:bg-white text-black transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

// Scenario Planner Component
const ScenarioPlanner = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [toggleCompare, setToggleCompare] = useState(true);
  const [timeframe, setTimeframe] = useState(120); // 10 years default

  // Scenario parameters
  const [rentAmount, setRentAmount] = useState(15000);
  const [salary, setSalary] = useState(1200000); // 12 LPA
  const [sipAmount, setSipAmount] = useState(15000);
  const [expenseGrowth, setExpenseGrowth] = useState(5); // 5%
  const [oneTimePurchase, setOneTimePurchase] = useState(0);

  // Generate data based on current parameters
  const [data, setData] = useState(
    generateChartData(500000, sipAmount, 0.08, 0.12, timeframe)
  );

  // Update chart data when parameters change
  const simulateScenario = () => {
    // Calculate monthly savings from annual salary
    const monthlySavings = sipAmount;
    const updatedData = generateChartData(
      500000 - oneTimePurchase,
      monthlySavings,
      0.08,
      0.12,
      timeframe
    );
    setData(updatedData);
  };

  // Calculate projected worth
  const currentProjection = data[data.length - 1]?.current;
  const whatIfProjection = data[data.length - 1]?.whatIf;
  const difference = whatIfProjection - currentProjection;
  const percentageIncrease = (difference / currentProjection) * 100;

  return (
    <div className="">
      <div
        className={`mb-6 p-6 rounded-lg border ${
          darkMode
            ? "bg-slate-700 border-slate-600"
            : "bg-white border-gray-200 shadow-sm"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          What-If Scenario Planner
        </h2>
        <p className={darkMode ? "text-slate-300" : "text-slate-600"}>
          Visualize how different financial decisions could impact your future
          wealth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div
          className={`p-6 rounded-lg border ${
            darkMode
              ? "bg-slate-700 border-slate-600"
              : "bg-white border-slate-200 shadow-sm"
          } lg:col-span-1`}
        >
          <div className="flex items-center mb-6 gap-2">
            <TrendingUp size={20} className="text-blue-600" />
            <h3
              className={`text-lg font-medium ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Adjust Your Scenario
            </h3>
          </div>

          <div className="space-y-1">
            {/* RangeSliders and FormField remain unchanged */}
            {/* ... */}

            <button
              onClick={simulateScenario}
              className="w-full mt-6 mb-2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Simulate This Scenario</span>
              <ArrowRightCircle size={18} />
            </button>

            <div className="flex items-center mt-4 space-x-2">
              <input
                type="checkbox"
                id="compareToggle"
                checked={toggleCompare}
                onChange={() => setToggleCompare(!toggleCompare)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="compareToggle"
                className={`text-sm ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Show Comparison Line
              </label>
            </div>
          </div>

          {/* Projections Summary */}
          <div
            className={`mt-6 pt-6 border-t ${
              darkMode ? "border-slate-600" : "border-slate-200"
            }`}
          >
            <h4
              className={`font-medium mb-3 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Projection Summary
            </h4>
            <div className="space-y-3">
              <div>
                <p
                  className={
                    darkMode
                      ? "text-sm text-slate-400"
                      : "text-sm text-slate-600"
                  }
                >
                  Current projection after {Math.floor(timeframe / 12)} years:
                </p>
                <p className="text-lg font-bold text-blue-600">
                  {formatCurrency(currentProjection)}
                </p>
              </div>
              {toggleCompare && (
                <>
                  <div>
                    <p
                      className={
                        darkMode
                          ? "text-sm text-slate-400"
                          : "text-sm text-slate-600"
                      }
                    >
                      What-if projection:
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(whatIfProjection)}
                    </p>
                  </div>
                  <div
                    className={`pt-2 border-t ${
                      darkMode ? "border-slate-600" : "border-slate-200"
                    }`}
                  >
                    <p
                      className={
                        darkMode
                          ? "text-sm text-slate-400"
                          : "text-sm text-slate-600"
                      }
                    >
                      Potential gain:
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(difference)}
                      </p>
                      <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        +{percentageIncrease.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Chart */}

        <div
          className={`p-6 rounded-lg border ${
            darkMode
              ? "bg-slate-700 border-slate-600"
              : "bg-white border-slate-200 shadow-sm"
          } lg:col-span-2`}
        >
          <h3
            className={`text-lg font-medium mb-6 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Projected Net Worth Over Time
          </h3>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#475569" : "#e5e7eb"}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: darkMode ? "#cbd5e1" : "#6b7280" }}
                  tickFormatter={(month) => `${Math.floor(month / 12)}y`}
                  label={{
                    value: "Years",
                    position: "insideBottomRight",
                    offset: -5,
                  }}
                />
                <YAxis
                  tickFormatter={(v) =>
                    `₹${
                      v >= 1000000
                        ? (v / 1000000).toFixed(1) + "M"
                        : (v / 1000).toFixed(0) + "K"
                    }`
                  }
                  tick={{ fill: darkMode ? "#cbd5e1" : "#6b7280" }}
                  width={80}
                />
                <Tooltip
                  content={
                    <CustomTooltip
                      darkMode={darkMode}
                      active={undefined}
                      payload={undefined}
                      label={undefined}
                    />
                  }
                />
                <Legend
                  wrapperStyle={{ paddingTop: 20 }}
                  formatter={(value) => (
                    <span className="text-sm font-medium">{value}</span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  name="Current Plan"
                  dot={false}
                  activeDot={{
                    r: 6,
                    stroke: "#4f46e5",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                />
                {toggleCompare && (
                  <Line
                    type="monotone"
                    dataKey="whatIf"
                    stroke="#16a34a"
                    strokeWidth={3}
                    name="What-If Scenario"
                    dot={false}
                    activeDot={{
                      r: 6,
                      stroke: "#16a34a",
                      strokeWidth: 2,
                      fill: "#fff",
                    }}
                  />
                )}
                {oneTimePurchase > 0 && (
                  <ReferenceLine
                    x={1}
                    stroke="red"
                    strokeDasharray="3 3"
                    label={{
                      value: "Purchase",
                      position: "insideTopRight",
                      fill: "red",
                    }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart insight */}
          <div
            className={`mt-4 p-4 rounded-md border ${
              darkMode
                ? "bg-indigo-950 border-indigo-800 text-indigo-300"
                : "bg-indigo-50 border-indigo-100 text-indigo-800"
            }`}
          >
            <p className="text-sm">
              This chart projects your net worth over the next{" "}
              {Math.floor(timeframe / 12)} years. The{" "}
              <span className="font-medium text-blue-700 dark:text-blue-400">
                blue line
              </span>{" "}
              shows your current trajectory, while the{" "}
              <span className="font-medium text-green-700 dark:text-green-400">
                green line
              </span>{" "}
              represents your potential growth with the adjusted parameters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FinancialOverview, ScenarioPlanner };
