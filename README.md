# 💸 Personal Finance Simulator

This is the **client-side code** for the Personal Finance Simulator — a visual, interactive, and AI-powered tool that helps users explore their financial futures, undo past choices, and receive personalized financial guidance.

---

## 📌 Features

### 1. **Your Financial Overview**
Get a snapshot of your current financial life:
- Income, expenses, debt, savings, and investments
- Optional: Recurring income/expense breakdown

### 2. **What-If Scenario Planner**
Simulate financial decisions like:
- Switching to a better-paying job
- Increasing rent or EMIs
- Starting/increasing investments

📈 See how your net worth evolves over time through dynamic charts.

### 3. **Backward Simulation**
Explore alternative outcomes by undoing past financial decisions.

### 4. **AI Financial Assistant**
Receive tips like:
- “Reduce subscription costs to save ₹X/month”
- “Starting SIPs now could grow your wealth by ₹Y in 10 years”

🧠 Powered by budgeting heuristics and financial planning logic.

### 5. **Privacy-First Design**
- Data stays local or encrypted in your personal account
- No external server tracking

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, ShadCN UI
- **Visualization:** Recharts
- **AI Logic:** Local inference or optional LLM API
- **State Management:** Zustand / Context API
- **Optional Backend (for auth & sync):** Supabase / Firebase
- **Deployment:** Vercel / Netlify

---

## 🚀 Getting Started

```bash
git clone https://github.com/x15sr71/Financial-Time-Machine-Client.git
cd Financial-Time-Machine-Client
npm install
npm run dev
