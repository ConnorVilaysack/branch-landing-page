import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  Activity,
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  ChevronDown,
  Check,
  ArrowUpRight,
  Lightbulb,
  Rocket,
  Target,
  FlaskConical,
} from 'lucide-react';

const revenueData = [
  { date: 'Feb 1', optimized: 4200, baseline: 4100 },
  { date: 'Feb 4', optimized: 4800, baseline: 4150 },
  { date: 'Feb 7', optimized: 5600, baseline: 4050 },
  { date: 'Feb 10', optimized: 6300, baseline: 4200 },
  { date: 'Feb 13', optimized: 7200, baseline: 4180 },
  { date: 'Feb 16', optimized: 7800, baseline: 4300 },
  { date: 'Feb 19', optimized: 8900, baseline: 4280 },
  { date: 'Feb 22', optimized: 9800, baseline: 4200 },
  { date: 'Feb 25', optimized: 10800, baseline: 4280 },
  { date: 'Feb 28', optimized: 11600, baseline: 4320 },
  { date: 'Mar 1', optimized: 12400, baseline: 4250 },
];

const conversionData = [
  { date: 'Feb 1', optimized: 2.1, baseline: 2.0 },
  { date: 'Feb 4', optimized: 2.5, baseline: 2.0 },
  { date: 'Feb 7', optimized: 2.9, baseline: 1.9 },
  { date: 'Feb 10', optimized: 3.2, baseline: 2.1 },
  { date: 'Feb 13', optimized: 3.5, baseline: 2.1 },
  { date: 'Feb 16', optimized: 3.7, baseline: 2.0 },
  { date: 'Feb 19', optimized: 4.0, baseline: 2.0 },
  { date: 'Feb 22', optimized: 4.3, baseline: 2.1 },
  { date: 'Feb 25', optimized: 4.5, baseline: 2.0 },
  { date: 'Feb 28', optimized: 4.7, baseline: 2.1 },
  { date: 'Mar 1', optimized: 4.9, baseline: 2.0 },
];

const experiments = [
  {
    name: 'Price Point: $39 → $49',
    status: 'winner' as const,
    lift: '+28.4%',
    confidence: '99.2%',
    visitors: '12,847',
    dotColor: 'bg-emerald-500',
    liftColor: 'text-emerald-600',
    tagBg: 'bg-emerald-50',
    tagText: 'text-emerald-700',
  },
  {
    name: 'CTA: "Start Free Trial"',
    status: 'running' as const,
    lift: '+12.1%',
    confidence: '87.3%',
    visitors: '8,234',
    dotColor: 'bg-blue-500',
    liftColor: 'text-blue-600',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-700',
  },
  {
    name: 'Badge: "Best Value"',
    status: 'running' as const,
    lift: '+8.7%',
    confidence: '72.1%',
    visitors: '6,128',
    dotColor: 'bg-amber-500',
    liftColor: 'text-amber-600',
    tagBg: 'bg-amber-50',
    tagText: 'text-amber-700',
  },
];

const insights = [
  {
    icon: Lightbulb,
    text: 'Users from paid search convert 3.2x better at $49 price point',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Target,
    text: 'Mobile users prefer "Start Free Trial" — deploy recommended',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Rocket,
    text: '"Best Value" badge lifts plan selection by 8.7% on desktop',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
];

interface CursorStep {
  x: number;
  y: number;
  action: 'hover' | 'click';
  target: string;
  wait: number;
}

const CURSOR_SCRIPT: CursorStep[] = [
  { x: 14, y: 17, action: 'hover', target: 'metric-revenue', wait: 1800 },
  { x: 38, y: 17, action: 'hover', target: 'metric-conversion', wait: 1500 },
  { x: 18, y: 31, action: 'click', target: 'tab-conversions', wait: 1800 },
  { x: 38, y: 48, action: 'hover', target: 'chart-point', wait: 2200 },
  { x: 6, y: 31, action: 'click', target: 'tab-revenue', wait: 1800 },
  { x: 25, y: 80, action: 'hover', target: 'experiment-0', wait: 1500 },
  { x: 82, y: 80, action: 'click', target: 'deploy-btn', wait: 2500 },
  { x: 72, y: 42, action: 'hover', target: 'insight-0', wait: 2000 },
  { x: 72, y: 52, action: 'hover', target: 'insight-1', wait: 2000 },
];

const metrics = [
  {
    id: 'revenue',
    icon: DollarSign,
    label: 'Revenue',
    value: '$127.4K',
    change: '+34.2%',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'conversion',
    icon: TrendingUp,
    label: 'Conversion Rate',
    value: '4.9%',
    change: '+142%',
    iconColor: 'text-emerald-500',
  },
  {
    id: 'ltv',
    icon: Users,
    label: 'Avg. Customer LTV',
    value: '$2,847',
    change: '+47.3%',
    iconColor: 'text-green-600',
  },
  {
    id: 'tests',
    icon: Zap,
    label: 'Active Tests',
    value: '8',
    change: '3 winners',
    iconColor: 'text-emerald-600',
  },
];

export function DashboardDemo() {
  const [step, setStep] = useState(0);
  const [clicking, setClicking] = useState(false);
  const [activeTab, setActiveTab] = useState<'revenue' | 'conversions'>(
    'revenue',
  );
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [hoveredExperiment, setHoveredExperiment] = useState<number | null>(
    null,
  );
  const [deployed, setDeployed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hoveredInsight, setHoveredInsight] = useState<number | null>(null);

  useEffect(() => {
    const currentStep = CURSOR_SCRIPT[step];

    setHoveredMetric(null);
    setHoveredExperiment(null);
    setShowTooltip(false);
    setHoveredInsight(null);

    if (step === 0) {
      setDeployed(false);
      setShowNotification(false);
      setActiveTab('revenue');
    }

    const actionTimer = setTimeout(() => {
      if (currentStep.action === 'click') {
        setClicking(true);
        setTimeout(() => setClicking(false), 300);
      }

      switch (currentStep.target) {
        case 'metric-revenue':
          setHoveredMetric('revenue');
          break;
        case 'metric-conversion':
          setHoveredMetric('conversion');
          break;
        case 'tab-conversions':
          setActiveTab('conversions');
          break;
        case 'tab-revenue':
          setActiveTab('revenue');
          break;
        case 'chart-point':
          setShowTooltip(true);
          break;
        case 'experiment-0':
          setHoveredExperiment(0);
          break;
        case 'deploy-btn':
          setDeployed(true);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
          break;
        case 'insight-0':
          setHoveredInsight(0);
          break;
        case 'insight-1':
          setHoveredInsight(1);
          break;
      }
    }, 900);

    const nextTimer = setTimeout(() => {
      setStep((prev) => (prev + 1) % CURSOR_SCRIPT.length);
    }, 900 + currentStep.wait);

    return () => {
      clearTimeout(actionTimer);
      clearTimeout(nextTimer);
    };
  }, [step]);

  const cursorPos = CURSOR_SCRIPT[step];
  const chartData = activeTab === 'revenue' ? revenueData : conversionData;

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      {/* Deploy success notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-[60] bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg"
          >
            <Check className="w-4 h-4" />
            Winning variant deployed to 100% of traffic
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated PM cursor */}
      <motion.div
        className="absolute z-50 pointer-events-none"
        animate={{
          left: `${cursorPos.x}%`,
          top: `${cursorPos.y}%`,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 90,
          mass: 1.2,
        }}
      >
        <AnimatePresence>
          {clicking && (
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -left-3 -top-3 w-6 h-6 bg-emerald-400/50 rounded-full"
            />
          )}
        </AnimatePresence>
        <svg
          width="18"
          height="22"
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L1 17L5.5 12.5L9.5 20L12.5 18.5L8.5 11L14.5 11L1 1Z"
            fill="#111827"
            stroke="#d1d5db"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-0.5 ml-4 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap font-medium shadow-lg">
          Product Manager
        </div>
      </motion.div>

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Branch AI Dashboard
          </h3>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="bg-gray-50 text-gray-500 text-xs px-3 py-1.5 rounded-lg border border-gray-200 flex items-center gap-1.5 cursor-default">
            Last 30 days
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 pb-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.id}
            animate={{
              scale: hoveredMetric === metric.id ? 1.03 : 1,
              borderColor:
                hoveredMetric === metric.id
                  ? 'rgba(16, 185, 129, 0.5)'
                  : 'rgba(229, 231, 235, 1)',
            }}
            transition={{ duration: 0.2 }}
            className="bg-gray-50/50 rounded-xl p-4 border border-gray-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className={`w-4 h-4 ${metric.iconColor}`} />
              <span className="text-gray-500 text-xs font-medium">
                {metric.label}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value}
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-xs">
              <ArrowUpRight className="w-3 h-3" />
              <span>{metric.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart + AI Insights */}
      <div className="px-6 pb-4 grid lg:grid-cols-3 gap-4">
        {/* Chart panel */}
        <div className="lg:col-span-2 bg-gray-50/50 rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-1 mb-4">
            {(['revenue', 'conversions'] as const).map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'text-gray-400'
                }`}
              >
                {tab === 'revenue' ? 'Revenue' : 'Conversions'}
              </button>
            ))}
            <div className="flex-1" />
            <div className="hidden sm:flex items-center gap-4 text-[10px] text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-0.5 bg-emerald-500 rounded-full" />
                AI Optimized
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-0.5 bg-gray-300 rounded-full" />
                Baseline
              </div>
            </div>
          </div>

          <div className="h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                key={activeTab}
                data={chartData}
                margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
              >
                <defs>
                  <linearGradient
                    id="dashboardOptGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  strokeOpacity={0.6}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) =>
                    activeTab === 'revenue'
                      ? `$${(v / 1000).toFixed(0)}K`
                      : `${v}%`
                  }
                />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  stroke="#d1d5db"
                  strokeWidth={1.5}
                  fill="none"
                  strokeDasharray="4 4"
                />
                <Area
                  type="monotone"
                  dataKey="optimized"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#dashboardOptGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Tooltip triggered by cursor hover */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-[20%] left-[52%] bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg z-10"
                >
                  <div className="text-[10px] text-gray-400 mb-1">Feb 19</div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-gray-900 font-medium">
                      {activeTab === 'revenue' ? '$8,900' : '4.0%'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-0.5">
                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                    <span className="text-gray-400">
                      {activeTab === 'revenue' ? '$4,280' : '2.0%'}
                    </span>
                  </div>
                  <div className="text-emerald-600 text-[10px] mt-1 font-medium">
                    ↑ {activeTab === 'revenue' ? '108%' : '100%'} lift
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* AI Insights panel */}
        <div className="bg-gray-50/50 rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-4">
            <img src="/branch-logo.png" alt="" className="w-4 h-4" />
            <h4 className="text-sm font-semibold text-gray-900">AI Insights</h4>
          </div>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: hoveredInsight === i ? 1.02 : 1,
                  borderColor:
                    hoveredInsight === i
                      ? 'rgba(16, 185, 129, 0.4)'
                      : 'rgba(229, 231, 235, 1)',
                }}
                className={`${insight.bg} rounded-lg p-3 border border-gray-200`}
              >
                <div className="flex items-start gap-2">
                  <insight.icon
                    className={`w-3.5 h-3.5 ${insight.color} mt-0.5 shrink-0`}
                  />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {insight.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Experiments table */}
      <div className="px-6 pb-6">
        <div className="bg-gray-50/50 rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-semibold text-gray-900">
              Active Experiments
            </h4>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="grid grid-cols-[1fr_70px_70px_70px_90px] px-4 py-2 text-[10px] text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <span>Experiment</span>
                <span>Lift</span>
                <span>Confidence</span>
                <span>Visitors</span>
                <span className="text-right">Action</span>
              </div>

              {experiments.map((exp, i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundColor:
                      hoveredExperiment === i
                        ? 'rgba(16, 185, 129, 0.06)'
                        : 'transparent',
                  }}
                  className="grid grid-cols-[1fr_70px_70px_70px_90px] px-4 py-3 border-b border-gray-100 items-center last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${exp.dotColor} ${
                        exp.status === 'running' ? 'animate-pulse' : ''
                      }`}
                    />
                    <span className="text-xs text-gray-900 font-medium truncate">
                      {exp.name}
                    </span>
                    {exp.status === 'winner' && (
                      <span className={`text-[9px] ${exp.tagBg} ${exp.tagText} px-1.5 py-0.5 rounded font-medium shrink-0`}>
                        WINNER
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${exp.liftColor}`}>
                    {exp.lift}
                  </span>
                  <span className="text-xs text-gray-400">
                    {exp.confidence}
                  </span>
                  <span className="text-xs text-gray-400">
                    {exp.visitors}
                  </span>
                  <div className="text-right">
                    {exp.status === 'winner' && !deployed && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-medium border border-emerald-200 cursor-default">
                        Deploy
                      </span>
                    )}
                    {exp.status === 'winner' && deployed && (
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-1 text-[10px] bg-emerald-600 text-white px-2 py-1 rounded-md font-medium"
                      >
                        <Check className="w-3 h-3" />
                        Live
                      </motion.span>
                    )}
                    {exp.status === 'running' && (
                      <span className="text-[10px] text-gray-400">
                        Running...
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
