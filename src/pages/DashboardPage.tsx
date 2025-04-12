import React, { useState } from "react";
import {
  Bell,
  CreditCard,
  HelpCircle,
  LineChart,
  Moon,
  Settings,
  Sun,
  Wallet,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FinancialOverview,
  ScenarioPlanner,
} from "@/components/FinancialPlanner";

export default function PersonalFinanceSimulator() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState("financial-snapshot");
  const [chatPrompt, setChatPrompt] = useState("");
  const [chatResponses, setChatResponses] = useState([
    {
      question: "How can I save ₹5L in 2 years?",
      answer: [
        { type: "Saving", text: "Set aside ₹20,833 monthly" },
        { type: "Spending", text: "Reduce dining out by 50%" },
        { type: "Investment", text: "Consider a SIP with 12% returns" },
      ],
    },
  ]);

  // Sample data for charts
  const netWorthData = [
    { month: "Jan", current: 500000, whatIf: 500000 },
    { month: "Feb", current: 520000, whatIf: 550000 },
    { month: "Mar", current: 540000, whatIf: 600000 },
    { month: "Apr", current: 560000, whatIf: 650000 },
    { month: "May", current: 580000, whatIf: 700000 },
    { month: "Jun", current: 600000, whatIf: 750000 },
  ];

  // Improved color theme classes - lighter dark mode for better readability
  const themeClass = darkMode
    ? "bg-slate-800 text-slate-100"
    : "bg-gray-50 text-gray-900";
  const cardClass = darkMode
    ? "bg-slate-700 border-slate-600"
    : "bg-white border-gray-200 shadow-sm";
  const buttonPrimaryClass = darkMode
    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
    : "bg-indigo-600 hover:bg-indigo-700 text-white";
  const buttonSecondaryClass = darkMode
    ? "bg-slate-600 hover:bg-slate-500 text-slate-100"
    : "bg-gray-200 hover:bg-gray-300 text-gray-800";
  const inputClass = darkMode
    ? "bg-slate-600 border-slate-500 text-slate-100 placeholder-slate-300"
    : "bg-white border-gray-300 text-gray-900";

  // Improved tab classes for better UI/UX in both light and dark modes
  const getTabClass = (tab) => {
    const isActive = selectedSection === tab;

    if (darkMode) {
      return `flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
        isActive
          ? "bg-indigo-600 text-white font-medium"
          : "text-slate-200 hover:bg-slate-600"
      }`;
    } else {
      return `flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
        isActive
          ? "bg-indigo-100 text-indigo-800 font-medium"
          : "text-gray-700 hover:bg-gray-100"
      }`;
    }
  };

  // Tab icon class for better visibility
  const getTabIconClass = (tab) => {
    const isActive = selectedSection === tab;

    if (darkMode) {
      return `h-5 w-5 ${isActive ? "text-white" : "text-slate-300"}`;
    } else {
      return `h-5 w-5 ${isActive ? "text-indigo-600" : "text-gray-500"}`;
    }
  };

  // Mobile tab class with better contrast
  const getMobileTabClass = (tab) => {
    const isActive = selectedSection === tab;
    return isActive
      ? "text-indigo-400"
      : darkMode
      ? "text-slate-300"
      : "text-gray-500";
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatPrompt.trim()) return;

    // Simulate AI response
    const newResponse = {
      question: chatPrompt,
      answer: [
        {
          type: "Investment",
          text: "Consider increasing your SIP allocation by 5%",
        },
        {
          type: "Spending",
          text: "Your current expense to income ratio is 68%, aim for 50%",
        },
      ],
    };

    setChatResponses([newResponse, ...chatResponses]);
    setChatPrompt("");
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeClass}`}>
      {/* Top Navigation */}
      <header
        className={`border-b sticky top-0 z-10 ${
          darkMode
            ? "border-slate-600 bg-slate-700"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-indigo-500" />
            <h1 className="text-xl font-bold">PersonalFinSim</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-transparent hover:bg-slate-600 text-slate-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-transparent hover:bg-slate-600 text-slate-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <Bell className="h-5 w-5" />
            </button>

            <button
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-transparent hover:bg-slate-600 text-slate-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <Settings className="h-5 w-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Privacy Banner */}
      <Alert
        className={`rounded-none border-0 ${
          darkMode ? "bg-slate-600 text-slate-100" : "bg-blue-50 text-blue-800"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center">
          <span className="mr-2">🔒</span>
          <AlertDescription>
            Your data is never shared or stored on external servers. Everything
            runs locally or is securely encrypted in your account.
          </AlertDescription>
        </div>
      </Alert>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`w-16 md:w-64 border-r shrink-0 ${
            darkMode
              ? "border-slate-700 bg-slate-900"
              : "border-gray-200 bg-white"
          } hidden md:block`}
        >
          <nav className="p-4 space-y-3">
            <button
              onClick={() => setSelectedSection("financial-snapshot")}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                selectedSection === "financial-snapshot"
                  ? darkMode
                    ? "bg-indigo-600 text-white font-medium"
                    : "bg-indigo-600 text-white font-medium"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              <Wallet
                className={`h-5 w-5 ${
                  selectedSection === "financial-snapshot"
                    ? "text-white"
                    : "text-indigo-600"
                }`}
              />
              <span className="hidden md:inline text-sm">
                Your Financial Overview
              </span>
            </button>

            <button
              onClick={() => setSelectedSection("scenario-simulator")}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                selectedSection === "scenario-simulator"
                  ? darkMode
                    ? "bg-indigo-600 text-white font-medium"
                    : "bg-indigo-600 text-white font-medium"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              <LineChart
                className={`h-5 w-5 ${
                  selectedSection === "scenario-simulator"
                    ? "text-white"
                    : "text-indigo-600"
                }`}
              />
              <span className="hidden md:inline text-sm">
                What-If Scenario Planner
              </span>
            </button>

            <button
              onClick={() => setSelectedSection("backward-simulator")}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                selectedSection === "backward-simulator"
                  ? darkMode
                    ? "bg-indigo-600 text-white font-medium"
                    : "bg-indigo-600 text-white font-medium"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              <CreditCard
                className={`h-5 w-5 ${
                  selectedSection === "backward-simulator"
                    ? "text-white"
                    : "text-indigo-600"
                }`}
              />
              <span className="hidden md:inline text-sm">
                Reverse Decisions
              </span>
            </button>

            <button
              onClick={() => setSelectedSection("ai-assistant")}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                selectedSection === "ai-assistant"
                  ? darkMode
                    ? "bg-indigo-600 text-white font-medium"
                    : "bg-indigo-600 text-white font-medium"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              <HelpCircle
                className={`h-5 w-5 ${
                  selectedSection === "ai-assistant"
                    ? "text-white"
                    : "text-indigo-600"
                }`}
              />
              <span className="hidden md:inline text-sm">
                Your Financial Coach
              </span>
            </button>
          </nav>
        </aside>

        {/* Mobile Nav */}
        <div
          className={`md:hidden fixed bottom-0 left-0 right-0 flex justify-around py-2 ${
            darkMode
              ? "bg-slate-700 border-t border-slate-600"
              : "bg-white border-t border-gray-200"
          } z-10`}
        >
          <button
            onClick={() => setSelectedSection("financial-snapshot")}
            className="p-2"
          >
            <Wallet
              className={`h-6 w-6 ${getMobileTabClass("financial-snapshot")}`}
            />
          </button>
          <button
            onClick={() => setSelectedSection("scenario-simulator")}
            className="p-2"
          >
            <LineChart
              className={`h-6 w-6 ${getMobileTabClass("scenario-simulator")}`}
            />
          </button>
          <button
            onClick={() => setSelectedSection("backward-simulator")}
            className="p-2"
          >
            <CreditCard
              className={`h-6 w-6 ${getMobileTabClass("backward-simulator")}`}
            />
          </button>
          <button
            onClick={() => setSelectedSection("ai-assistant")}
            className="p-2"
          >
            <HelpCircle
              className={`h-6 w-6 ${getMobileTabClass("ai-assistant")}`}
            />
          </button>
        </div>

        {/* Main Content Area - Fixed to take full width */}
        <main className="flex-1 overflow-auto p-4 pb-20 md:pb-4 w-full">
          <div className="container mx-auto max-w-6xl">
            {/* Financial Snapshot Input - Replaced with FinancialOverview component */}
            {selectedSection === "financial-snapshot" && (
              <div>
                {/* <h2 className="text-2xl font-bold mb-6">Your Financial Overview</h2> */}
                <div className={`rounded-lg border p-6 ${cardClass}`}>
                  <FinancialOverview />
                </div>
              </div>
            )}

            {/* Scenario Simulator - Replaced with ScenarioPlanner component */}
            {selectedSection === "scenario-simulator" && (
              <div>
                <div className={`rounded-lg border p-6 ${cardClass}`}>
                  <ScenarioPlanner />
                </div>
              </div>
            )}

            {/* Backward Simulation */}
            {selectedSection === "backward-simulator" && (
              <div className="p-6 rounded-lg border border-slate-200 shadow-sm bg-white transition-all hover:shadow-md">
                <div className="flex items-center mb-4 gap-2">
                  <span className="text-blue-600">🔄</span>
                  <h2 className="text-2xl font-bold">Reverse Decisions</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div
                    className={`rounded-lg border p-6 ${cardClass} lg:col-span-1`}
                  >
                    <h3 className="text-lg font-medium mb-4">
                      Past Financial Decisions
                    </h3>

                    <div className="mb-6">
                      <label className="block text-sm mb-2">
                        Select a past decision to analyze:
                      </label>
                      <select
                        className={`w-full px-3 py-2 rounded-md border ${inputClass}`}
                      >
                        <option>iPhone 14 Pro - ₹1,40,000 - Jan 2023</option>
                        <option>Invested ₹1,00,000 in Crypto - Nov 2021</option>
                        <option>Vacation to Goa - ₹80,000 - Dec 2022</option>
                        <option>
                          Home Theater System - ₹75,000 - Mar 2023
                        </option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium mb-2">
                        Alternative Scenario
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm mb-1">
                            Instead, I would have:
                          </label>
                          <select
                            className={`w-full px-3 py-2 rounded-md border ${inputClass}`}
                          >
                            <option>Invested in Index Fund</option>
                            <option>Put into Fixed Deposit</option>
                            <option>Invested in Gold</option>
                            <option>Used for Debt Repayment</option>
                            <option>Added to Emergency Fund</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm mb-1">
                            Expected Annual Return (%)
                          </label>
                          <input
                            type="number"
                            className={`w-full px-3 py-2 rounded-md border ${inputClass}`}
                            placeholder="12"
                            defaultValue="12"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      className={`px-4 py-2 rounded-md w-full ${buttonPrimaryClass}`}
                    >
                      Undo & Simulate Alternate Timeline
                    </button>
                  </div>

                  <div
                    className={`rounded-lg border p-6 ${cardClass} lg:col-span-2`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">
                        Alternative Timeline Impact
                      </h3>
                      <div className="flex items-center space-x-1 text-sm">
                        <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                        <span>Actual</span>
                        <div className="h-3 w-3 rounded-full bg-green-500 ml-3"></div>
                        <span>Alternative</span>
                      </div>
                    </div>

                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={netWorthData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={darkMode ? "#475569" : "#e5e7eb"}
                          />
                          <XAxis
                            dataKey="month"
                            stroke={darkMode ? "#cbd5e1" : "#6b7280"}
                            tick={{ fill: darkMode ? "#cbd5e1" : "#6b7280" }}
                          />
                          <YAxis
                            stroke={darkMode ? "#cbd5e1" : "#6b7280"}
                            tick={{ fill: darkMode ? "#cbd5e1" : "#6b7280" }}
                            tickFormatter={(value) => `₹${value / 1000}K`}
                          />
                          <RechartsTooltip
                            formatter={(value) => [
                              `₹${value.toLocaleString()}`,
                              null,
                            ]}
                            contentStyle={{
                              backgroundColor: darkMode ? "#334155" : "#ffffff",
                              borderColor: darkMode ? "#475569" : "#e5e7eb",
                              color: darkMode ? "#f1f5f9" : "#1f2937",
                            }}
                            labelStyle={{
                              color: darkMode ? "#f1f5f9" : "#1f2937",
                            }}
                          />
                          <Legend
                            wrapperStyle={{
                              color: darkMode ? "#f1f5f9" : "#1f2937",
                            }}
                          />
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
                      <div
                        className={`p-4 rounded-lg ${
                          darkMode ? "bg-slate-600" : "bg-blue-50"
                        }`}
                      >
                        <h4 className="font-medium mb-2">Impact Analysis</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Current Value of Decision:</span>
                            <span className="font-medium">₹40,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Alternative Scenario Value:</span>
                            <span className="font-medium">₹1,60,000</span>
                          </div>
                          <div
                            className="flex justify-between font-medium"
                            style={{ color: "#4ade80" }}
                          >
                            <span>Opportunity Cost:</span>
                            <span>₹1,20,000</span>
                          </div>
                          <div className="pt-2 text-sm">
                            If you had invested ₹1,40,000 in an index fund
                            instead of buying an iPhone 14 Pro, you would have
                            gained an additional ₹1,20,000 in value.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Assistant */}
            {selectedSection === "ai-assistant" && (
              <div className="p-6 rounded-lg border border-slate-200 shadow-sm bg-white transition-all hover:shadow-md">
                <h2 className="text-2xl font-bold mb-6">
                  Your Financial Coach
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Section */}
                  <div
                    className={`rounded-lg border p-6 ${cardClass} lg:col-span-1 order-2 lg:order-1`}
                  >
                    <h3 className="text-lg font-medium mb-4">
                      Suggested Questions
                    </h3>
                    <div className="space-y-3">
                      {[
                        "How can I save ₹5L in 2 years?",
                        "How much should I invest monthly to retire by 45?",
                        "What's the best way to reduce my EMI burden?",
                        "How do I build a diversified investment portfolio?",
                      ].map((text) => (
                        <button
                          key={text}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            darkMode
                              ? "bg-slate-600 hover:bg-slate-500 text-slate-100"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                          }`}
                          onClick={() => setChatPrompt(text)}
                        >
                          {text}
                        </button>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Financial Health Score
                      </h3>
                      <div
                        className={`p-4 rounded-lg ${
                          darkMode ? "bg-slate-600" : "bg-blue-50"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span>Overall Score</span>
                          <span className="font-medium text-yellow-300">
                            72/100
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: "72%" }}
                          ></div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Emergency Fund</span>
                            <span
                              className={
                                darkMode ? "text-green-300" : "text-green-500"
                              }
                            >
                              85/100
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Debt Ratio</span>
                            <span
                              className={
                                darkMode ? "text-red-300" : "text-red-500"
                              }
                            >
                              60/100
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Investment Allocation</span>
                            <span
                              className={
                                darkMode ? "text-yellow-300" : "text-yellow-500"
                              }
                            >
                              70/100
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div
                    className={`rounded-lg border p-6 ${cardClass} lg:col-span-2 order-1 lg:order-2`}
                  >
                    <h3 className="text-lg font-medium mb-4">
                      Ask Your Financial Coach
                    </h3>

                    <div
                      className={`mb-4 h-96 overflow-y-auto flex flex-col-reverse p-2 rounded-lg ${
                        darkMode ? "bg-slate-800/50" : "bg-gray-50"
                      }`}
                    >
                      <div className="space-y-4">
                        {chatResponses.map((chat, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex flex-col">
                              <div
                                className={`rounded-lg px-4 py-2 self-end max-w-[80%] ${
                                  darkMode
                                    ? "bg-indigo-600 text-white"
                                    : "bg-indigo-100 text-indigo-900"
                                }`}
                              >
                                {chat.question}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div
                                className={`rounded-lg px-4 py-3 self-start max-w-[80%] ${
                                  darkMode
                                    ? "bg-slate-600 text-slate-100"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                <div className="flex flex-col space-y-2">
                                  {chat.answer.map((item, i) => (
                                    <div key={i} className="flex">
                                      <span
                                        className={`inline-block px-2 py-0.5 text-xs rounded mr-2 ${
                                          item.type === "Saving"
                                            ? darkMode
                                              ? "bg-green-900 text-green-300"
                                              : "bg-green-100 text-green-800"
                                            : item.type === "Spending"
                                            ? darkMode
                                              ? "bg-red-900 text-red-300"
                                              : "bg-red-100 text-red-800"
                                            : darkMode
                                            ? "bg-blue-900 text-blue-300"
                                            : "bg-blue-100 text-blue-800"
                                        }`}
                                      >
                                        {item.type}
                                      </span>
                                      <span>{item.text}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form
                      onSubmit={handleChatSubmit}
                      className="flex space-x-2"
                    >
                      <input
                        type="text"
                        className={`flex-1 px-4 py-2 rounded-md border ${inputClass}`}
                        placeholder="Ask a financial question..."
                        value={chatPrompt}
                        onChange={(e) => setChatPrompt(e.target.value)}
                      />
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded-md ${buttonPrimaryClass}`}
                      >
                        Get AI Insights
                      </button>
                    </form>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">
                        Financial Tip of the Day
                      </h4>
                      <div
                        className={`p-4 rounded-lg border ${
                          darkMode
                            ? "border-indigo-700 bg-indigo-900/30 text-slate-100"
                            : "border-blue-200 bg-blue-50 text-blue-800"
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">💡</div>
                          <div>
                            <p className="font-medium">The 50/30/20 Rule</p>
                            <p className="mt-1 text-sm">
                              Allocate 50% of your income to needs, 30% to
                              wants, and 20% to savings and debt repayment. This
                              simple rule can help you maintain financial
                              balance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
