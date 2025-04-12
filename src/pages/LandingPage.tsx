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
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

// Dummy data arrays
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

const people = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Financial Analyst",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    designation: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Priya Patel",
    designation: "Freelancer",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Alex Rivera",
    designation: "Investment Advisor",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Emma Wilson",
    designation: "Tax Specialist",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

const movingCards = [
  {
    id: 1,
    title: "Investment Portfolio",
    description: "Track and optimize your investments in real-time",
    image: "https://source.unsplash.com/300x200/?investment,portfolio",
  },
  {
    id: 2,
    title: "Retirement Planning",
    description: "Ensure your future with smart retirement simulations",
    image: "https://source.unsplash.com/300x200/?retirement",
  },
  {
    id: 3,
    title: "Debt Management",
    description: "Strategize your way out of debt with custom plans",
    image: "https://source.unsplash.com/300x200/?debt",
  },
  {
    id: 4,
    title: "Budget Optimization",
    description: "Find hidden savings in your monthly expenses",
    image: "https://source.unsplash.com/300x200/?budget",
  },
  {
    id: 5,
    title: "Financial Goals",
    description: "Set and track progress toward financial milestones",
    image: "https://source.unsplash.com/300x200/?finance,goals",
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

/**
 * Simple tooltip implementation.
 */
const SimpleTooltip = ({ content, children, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-50">
          {content}
        </div>
      )}
      {children}
    </div>
  );
};

/**
 * Updated InfiniteMovingCards component.
 * - Duplicates the items array for an infinite loop.
 * - Uses a fast (10s) animation speed.
 * - Adds a gap (gap-4) between cards.
 * - Uses working Unsplash image URLs.
 */
const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "fast",
  pauseOnHover = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // Duplicate the items to create a seamless loop.
  const doubledItems = [...items, ...items];
  // Define movement speed: "fast" equals 10 seconds.
  const movementSpeed =
    speed === "fast" ? "10s" : speed === "slow" ? "20s" : "15s";
  // Inline style for continuous animation.
  const movingStyle = {
    animation: `moveCards ${movementSpeed} linear infinite`,
  };
  const hoverStyle = pauseOnHover
    ? { animationPlayState: isHovered ? "paused" : "running" }
    : {};

  return (
    <div className="relative overflow-hidden">
      {/* Scrolling cards */}
      <div
        className="flex gap-4"
        style={{ ...movingStyle, ...hoverStyle }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {doubledItems.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            className="relative flex-shrink-0 w-60 h-40 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 text-gray-900 shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={items.image}
              alt=""
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="mb-4 w-full h-auto object-cover rounded pointer-events-none"
            />

            <div className="absolute inset-0 bg-white/50 rounded-xl"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 p-2">
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="text-sm mt-2 text-center">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Left Fade Overlay */}
      <div
        className="absolute left-0 top-0 h-full w-1/5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
      {/* Right Fade Overlay */}
      <div
        className="absolute right-0 top-0 h-full w-1/5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
      <style>{`
        @keyframes moveCards {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  // Toggle dark mode based on state.
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="min-h-screen bg-background relative">
      {/* Dark mode toggle */}
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
      <BackgroundBeams />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 flex flex-col items-center relative z-10">
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
        <div className="absolute inset-x-0 top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-0">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="text-center max-w-3xl">
          <div className="inline-flex px-4 py-1.5 mb-6 bg-primary/10 rounded-full text-primary font-semibold text-sm">
            Smart Financial Planning
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Master Your Financial Future <FlipText />
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Take control of your finances with powerful planning tools and
            AI-powered insights that adapt to your financial goals and
            lifestyle.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="group relative flex items-center gap-2 overflow-hidden px-6 py-6 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-primary/80 to-purple-500 shadow-lg hover:brightness-110 hover:scale-[1.02] transition-all duration-300 border-none outline-none"
            >
              Get Started
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group px-6 py-6 rounded-2xl text-lg font-medium bg-gradient-to-r from-primary/30 to-purple-200 text-primary shadow-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/40 hover:to-purple-300 hover:text-white dark:bg-gradient-to-r dark:from-primary/20 dark:to-purple-300 dark:text-primary dark:hover:bg-gradient-to-r dark:hover:from-primary/40 dark:hover:to-purple-400 dark:hover:text-white border-none"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="relative mt-16 w-full max-w-4xl h-64 sm:h-80 rounded-3xl bg-gradient-to-tr from-primary/20 to-purple-500/20 overflow-hidden shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <LineChartPlaceholder />
          </div>
        </div>
      </div>
      {/* Infinite Moving Cards Section */}
      <div className="py-12 relative">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <InfiniteMovingCards
            items={movingCards}
            direction="right"
            speed="fast"
            pauseOnHover={true}
          />
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
              Our platform combines powerful analytics with user-friendly
              interfaces to give you total control over your financial journey.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold">
                    <SimpleTooltip
                      content={`Explore ${feature.name}`}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                    >
                      {feature.icon}
                    </SimpleTooltip>
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
      <div className=" sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="inline-flex px-4 py-1.5 mb-6 bg-primary/10 rounded-full text-primary font-semibold text-sm">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by professionals worldwide
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 py-10">
            <AnimatedTooltip items={people} />
          </div>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-8 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
            <SimpleTooltip
              content="Your data never leaves your device"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
            >
              <Shield className="h-6 w-6" />
            </SimpleTooltip>
            <h3 className="text-2xl font-bold">Your Privacy Comes First</h3>
          </div>
          <p className="text-center text-lg text-muted-foreground mb-10">
            All your financial data is stored locally. No data is ever sent to
            external servers, ensuring complete confidentiality of your
            sensitive financial information.
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
      <footer className="py-3 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Coins className="h-4 w-4 text-primary" />
              <h1 className="text-base font-medium">PersonalFinSim</h1>
            </div>
            <div className="flex space-x-4 text-xs">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                About
              </a>
            </div>
          </div>
          <div className="mt-3 text-center text-[10px] text-muted-foreground">
            © 2025 PersonalFinSim. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
