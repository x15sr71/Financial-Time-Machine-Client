import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Shield,
  Coins,
  TrendingUp,
  ArrowRight,
  Moon,
  Sun,
} from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

// Features array for the Features section
const features = [
  {
    name: "Financial Snapshot",
    description:
      "Get a comprehensive view of your finances including income, expenses, debt, and investments in a visually intuitive dashboard that updates in real-time.",
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    name: "Smart Simulations",
    description:
      "Simulate different financial scenarios and see how they affect your future wealth. Test investment strategies, major purchases, and life changes before making decisions.",
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    name: "AI-Powered Insights",
    description:
      "Receive personalized financial advice and recommendations based on your data and goals. Our AI assistant helps identify opportunities and potential issues.",
    icon: <Coins className="h-6 w-6" />,
  },
];

// Testimonials array for the Testimonials section
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Financial Analyst",
    content:
      "This tool has revolutionized how I plan my finances. The simulation features are incredibly powerful and give me confidence in my decisions.",
    initial: "S",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    content:
      "The AI recommendations have helped me optimize my investment strategy and save more effectively. I've increased my savings rate by 15%.",
    initial: "M",
  },
  {
    name: "Priya Patel",
    role: "Freelancer",
    content:
      "I love how easy it is to visualize my financial goals and simulate different scenarios. It's like having a financial advisor in my pocket.",
    initial: "P",
  },
];

// Simple placeholder component for the chart in the hero section
const LineChartPlaceholder = () => (
  <svg width="80%" height="80%" viewBox="0 0 800 300" className="text-primary">
    <path
      d="M0,150 Q200,50 400,200 T800,150"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      opacity="0.5"
    />
    <path
      d="M0,200 Q200,100 400,250 T800,200"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      opacity="0.3"
    />
    <path
      d="M0,100 Q200,0 400,150 T800,100"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      opacity="0.7"
    />
  </svg>
);

/**
 * FlipText component cycles through words with a flip animation.
 */
const FlipText: React.FC = () => {
  const words = ["Innovative", "Intuitive", "Powerful"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block ml-2 animate-[flipWords_3s_infinite]">
      {words[index]}
    </span>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Add or remove dark class on body element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Dark mode toggle button in top-right */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-gray-800" />
          )}
        </button>
      </div>

      <BackgroundBeams/>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 flex flex-col items-center relative">
        {/* Animated background lines */}
        <div className="hero-lines">
          <svg viewBox="0 0 1200 400" preserveAspectRatio="none">
            <line
              x1="0"
              y1="50"
              x2="1200"
              y2="50"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="150"
              x2="1200"
              y2="150"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="250"
              x2="1200"
              y2="250"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Background decorative element */}
        <div
          className="absolute inset-x-0 top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-0"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="text-center max-w-3xl">
          <div className="inline-flex px-4 py-1.5 mb-6 bg-primary/10 rounded-full text-primary font-semibold text-sm">
            Smart Financial Planning
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Master Your Financial Future
            <FlipText />
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Take control of your finances with powerful planning tools and AI-powered insights that adapt to your financial goals and lifestyle.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-6 py-6 rounded-xl bg-primary hover:bg-primary/90 text-lg"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-6 rounded-xl border-2 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Visual Chart */}
        <div className="relative mt-16 w-full max-w-4xl h-64 sm:h-80 rounded-3xl bg-gradient-to-tr from-primary/20 to-purple-500/20 overflow-hidden shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <LineChartPlaceholder />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 to-background"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="inline-flex px-4 py-1.5 mb-6 bg-primary/10 rounded-full text-primary font-semibold text-sm">
              Better Planning
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to manage your finances
            </p>
            <p className="mt-6 text-lg text-muted-foreground">
              Our platform combines powerful analytics with user-friendly interfaces to give you total control over your financial journey.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-4">
                      <a
                        href="#"
                        className="text-primary font-medium flex items-center gap-1 hover:underline"
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </a>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="inline-flex px-4 py-1.5 mb-6 bg-primary/10 rounded-full text-primary font-semibold text-sm">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by professionals worldwide
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="group flex flex-col justify-between bg-card hover:bg-card/80 p-8 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6">
                    {testimonial.initial}
                  </div>
                  <p className="text-lg font-medium leading-8 mb-6">
                    {testimonial.content}
                  </p>
                  <p className="text-lg font-semibold">{testimonial.name}</p>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="py-24 relative bg-muted/30">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-muted/50 to-transparent"></div>
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">Your Privacy Comes First</h3>
          </div>
          <p className="text-center text-lg text-muted-foreground mb-10">
            All your financial data is stored locally. No data is ever sent to external servers, ensuring complete confidentiality of your sensitive financial information.
          </p>
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="rounded-xl border-2 text-lg px-6 py-6"
            >
              Learn More About Our Privacy Policy
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Coins className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">PersonalFinSim</h1>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Contact
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                About
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © 2025 PersonalFinSim. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}