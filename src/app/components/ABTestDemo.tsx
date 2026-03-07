import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DashboardDemo } from './DashboardDemo';

const headlines = [
  {
    main: 'Simple, transparent pricing',
    sub: 'No hidden fees. Cancel anytime.',
  },
  {
    main: 'Choose the plan that fits',
    sub: 'Start free and upgrade when you need more.',
  },
  {
    main: 'Pricing that scales with you',
    sub: 'From startup to enterprise — we grow with you.',
  },
];

const prices = [
  { monthly: 49, annual: 41 },
  { monthly: 39, annual: 32 },
  { monthly: 29, annual: 24 },
  { monthly: 59, annual: 49 },
];

const ctas = [
  { text: 'Start Free Trial', color: 'bg-emerald-600' },
  { text: 'Get Started Free', color: 'bg-blue-600' },
  { text: 'Try It Free →', color: 'bg-violet-600' },
  { text: 'Start Now', color: 'bg-stone-900' },
];

const badges = ['Most Popular', 'Best Value', 'Recommended', 'Top Pick'];

const themes = [
  {
    name: 'Minimal White',
    pageBg: 'bg-white',
    cardBg: 'bg-white',
    cardBorder: 'border-gray-200',
    featuredBorder: 'border-emerald-500',
    featuredShadow: 'shadow-lg shadow-emerald-500/10',
    headlineColor: 'text-gray-900',
    subColor: 'text-gray-500',
    priceColor: 'text-gray-900',
    textColor: 'text-gray-600',
    mutedColor: 'text-gray-400',
    trustBorder: 'border-gray-100',
    trustText: 'text-gray-300',
    toggleBg: 'bg-stone-200',
    toggleKnob: 'bg-white',
  },
  {
    name: 'Stripe Gradient',
    pageBg: 'bg-gradient-to-br from-indigo-50 via-white to-purple-50',
    cardBg: 'bg-white/80 backdrop-blur',
    cardBorder: 'border-indigo-100',
    featuredBorder: 'border-indigo-500',
    featuredShadow: 'shadow-xl shadow-indigo-500/15',
    headlineColor: 'text-indigo-950',
    subColor: 'text-indigo-400',
    priceColor: 'text-indigo-950',
    textColor: 'text-indigo-700/70',
    mutedColor: 'text-indigo-300',
    trustBorder: 'border-indigo-100',
    trustText: 'text-indigo-200',
    toggleBg: 'bg-indigo-200',
    toggleKnob: 'bg-white',
  },
  {
    name: 'Linear Dark',
    pageBg: 'bg-[#111117]',
    cardBg: 'bg-[#1a1a24]',
    cardBorder: 'border-[#2a2a3a]',
    featuredBorder: 'border-violet-500',
    featuredShadow: 'shadow-xl shadow-violet-500/20',
    headlineColor: 'text-white',
    subColor: 'text-gray-400',
    priceColor: 'text-white',
    textColor: 'text-gray-400',
    mutedColor: 'text-gray-600',
    trustBorder: 'border-[#2a2a3a]',
    trustText: 'text-gray-700',
    toggleBg: 'bg-[#2a2a3a]',
    toggleKnob: 'bg-gray-300',
  },
  {
    name: 'Warm Sand',
    pageBg: 'bg-gradient-to-b from-amber-50/80 to-orange-50/50',
    cardBg: 'bg-white',
    cardBorder: 'border-amber-200/60',
    featuredBorder: 'border-amber-500',
    featuredShadow: 'shadow-lg shadow-amber-500/10',
    headlineColor: 'text-stone-900',
    subColor: 'text-stone-400',
    priceColor: 'text-stone-900',
    textColor: 'text-stone-600',
    mutedColor: 'text-stone-300',
    trustBorder: 'border-amber-100',
    trustText: 'text-stone-300',
    toggleBg: 'bg-amber-200',
    toggleKnob: 'bg-white',
  },
];

type LayoutType = 'columns' | 'featured' | 'horizontal' | 'compact';

const layouts: { type: LayoutType; label: string }[] = [
  { type: 'columns', label: 'Equal 3-column grid' },
  { type: 'featured', label: 'Featured center card' },
  { type: 'horizontal', label: 'Stacked horizontal' },
  { type: 'compact', label: 'Compact comparison' },
];

const EDIT_STEPS = [
  { target: 'headline', label: 'Testing headline copy' },
  { target: 'price', label: 'Optimizing price point' },
  { target: 'theme', label: 'Testing page branding' },
  { target: 'cta', label: 'A/B testing CTA' },
  { target: 'layout', label: 'Testing card layout' },
  { target: 'badge', label: 'Testing social proof' },
  { target: 'toggle', label: 'Testing billing display' },
];

const starterFeatures = [
  '1,000 visitors/month',
  'Basic A/B testing',
  '2 active experiments',
  'Core analytics',
  'Community support',
];

const proFeatures = [
  '50,000 visitors/month',
  'AI-powered optimization',
  'Unlimited experiments',
  'Advanced analytics',
  'Priority support',
  'API access',
];

const enterpriseFeatures = [
  'Unlimited visitors',
  'Dedicated AI models',
  'Custom integrations',
  'SOC 2 compliance',
  'SLA guarantee',
  'Dedicated account manager',
];

function EditHighlight({
  active,
  label,
}: {
  active: boolean;
  label: string;
}) {
  return (
    <AnimatePresence>
      {active && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -inset-2 rounded-lg pointer-events-none z-10"
          >
            <div className="absolute inset-0 rounded-lg border-2 border-green-400/60" />
            <div className="absolute inset-0 rounded-lg bg-green-400/5" />
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -inset-1 rounded-xl bg-green-400/10 blur-sm"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="absolute -top-8 left-0 z-20 flex items-center gap-1.5 bg-gray-900 text-white text-[10px] px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <img src="/branch-logo.png" alt="" className="w-3 h-3" />
            </motion.div>
            <span className="font-medium">Branch AI</span>
            <span className="text-stone-500">·</span>
            <span className="text-stone-300">{label}</span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PricingCards({
  layout,
  theme,
  activeTarget,
  badgeIdx,
  priceIdx,
  ctaIdx,
  isAnnual,
}: {
  layout: LayoutType;
  theme: (typeof themes)[number];
  activeTarget: string | null;
  badgeIdx: number;
  priceIdx: number;
  ctaIdx: number;
  isAnnual: boolean;
}) {
  const price = prices[priceIdx];
  const displayPrice = isAnnual ? price.annual : price.monthly;

  const starterCard = (compact = false) => (
    <div
      className={`border ${theme.cardBorder} rounded-2xl ${compact ? 'p-4' : 'p-6'} flex flex-col ${theme.cardBg}`}
    >
      <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold ${theme.headlineColor} mb-1`}>
        Starter
      </h3>
      <p className={`${theme.mutedColor} text-xs mb-4`}>
        For small teams getting started
      </p>
      <div className="mb-4">
        <span className={`${compact ? 'text-2xl' : 'text-3xl'} font-bold ${theme.priceColor}`}>$0</span>
        <span className={`${theme.mutedColor} text-sm ml-1`}>/month</span>
      </div>
      <ul className={`space-y-2 mb-5 flex-1 ${compact ? '' : ''}`}>
        {starterFeatures.slice(0, compact ? 3 : 5).map((f, i) => (
          <li key={i} className={`flex items-start gap-2 text-xs ${theme.textColor}`}>
            <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
      <div
        className={`w-full py-2 px-4 rounded-lg border ${theme.cardBorder} ${theme.textColor} text-sm font-medium text-center`}
      >
        Get Started
      </div>
    </div>
  );

  const proCard = (compact = false, elevated = false) => (
    <div
      className={`border-2 ${theme.featuredBorder} rounded-2xl ${compact ? 'p-4' : 'p-6'} flex flex-col relative ${theme.featuredShadow} ${theme.cardBg} ${
        elevated ? 'md:-mt-4 md:mb-0 md:py-8' : ''
      }`}
    >
      <div className="relative mb-3">
        <EditHighlight active={activeTarget === 'badge'} label="Testing social proof" />
        <AnimatePresence mode="wait">
          <motion.span
            key={badgeIdx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="inline-block bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-3 py-0.5 rounded-full"
          >
            {badges[badgeIdx]}
          </motion.span>
        </AnimatePresence>
      </div>
      <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold ${theme.headlineColor} mb-1`}>
        Professional
      </h3>
      <p className={`${theme.mutedColor} text-xs mb-4`}>For growing businesses</p>
      <div className="mb-4 relative">
        <EditHighlight active={activeTarget === 'price'} label="Optimizing price point" />
        <AnimatePresence mode="wait">
          <motion.div
            key={`${priceIdx}-${isAnnual}`}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.3 }}
          >
            <span className={`${compact ? 'text-2xl' : 'text-3xl'} font-bold ${theme.priceColor}`}>
              ${displayPrice}
            </span>
            <span className={`${theme.mutedColor} text-sm ml-1`}>/month</span>
            {isAnnual && (
              <div className="text-emerald-600 text-[11px] mt-0.5">
                Billed annually (${displayPrice * 12}/yr)
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <ul className="space-y-2 mb-5 flex-1">
        {proFeatures.slice(0, compact ? 4 : 6).map((f, i) => (
          <li key={i} className={`flex items-start gap-2 text-xs ${theme.textColor}`}>
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
      <div className="relative">
        <EditHighlight active={activeTarget === 'cta'} label="A/B testing CTA" />
        <AnimatePresence mode="wait">
          <motion.div
            key={ctaIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`w-full py-2.5 px-4 rounded-lg text-white text-sm font-medium text-center ${ctas[ctaIdx].color}`}
          >
            {ctas[ctaIdx].text}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  const enterpriseCard = (compact = false) => (
    <div
      className={`border ${theme.cardBorder} rounded-2xl ${compact ? 'p-4' : 'p-6'} flex flex-col ${theme.cardBg}`}
    >
      <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold ${theme.headlineColor} mb-1`}>
        Enterprise
      </h3>
      <p className={`${theme.mutedColor} text-xs mb-4`}>For large organizations</p>
      <div className="mb-4">
        <span className={`${compact ? 'text-2xl' : 'text-3xl'} font-bold ${theme.priceColor}`}>Custom</span>
      </div>
      <ul className="space-y-2 mb-5 flex-1">
        {enterpriseFeatures.slice(0, compact ? 4 : 6).map((f, i) => (
          <li key={i} className={`flex items-start gap-2 text-xs ${theme.textColor}`}>
            <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
      <div
        className={`w-full py-2 px-4 rounded-lg border ${theme.cardBorder} ${theme.textColor} text-sm font-medium text-center`}
      >
        Contact Sales
      </div>
    </div>
  );

  if (layout === 'columns') {
    return (
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
        {starterCard()}
        {proCard()}
        {enterpriseCard()}
      </div>
    );
  }

  if (layout === 'featured') {
    return (
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10 items-center">
        {starterCard()}
        {proCard(false, true)}
        {enterpriseCard()}
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div className="flex flex-col gap-4 max-w-3xl mx-auto mb-10">
        <div className="grid md:grid-cols-[1fr_auto] items-center gap-4">
          <div
            className={`border ${theme.cardBorder} rounded-2xl p-5 ${theme.cardBg} flex items-center gap-6`}
          >
            <div className="flex-1 min-w-0">
              <h3 className={`text-base font-semibold ${theme.headlineColor}`}>Starter</h3>
              <p className={`${theme.mutedColor} text-xs mt-0.5`}>For small teams getting started</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                {starterFeatures.slice(0, 3).map((f, i) => (
                  <span key={i} className={`flex items-center gap-1 text-[11px] ${theme.textColor}`}>
                    <Check className="w-3 h-3 text-green-500 shrink-0" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className={`text-2xl font-bold ${theme.priceColor}`}>$0</div>
              <span className={`${theme.mutedColor} text-xs`}>/month</span>
            </div>
            <div
              className={`shrink-0 py-2 px-5 rounded-lg border ${theme.cardBorder} ${theme.textColor} text-sm font-medium`}
            >
              Get Started
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] items-center gap-4">
          <div
            className={`border-2 ${theme.featuredBorder} rounded-2xl p-5 ${theme.cardBg} ${theme.featuredShadow} flex items-center gap-6 relative`}
          >
            <div className="relative mb-0">
              <EditHighlight active={activeTarget === 'badge'} label="Testing social proof" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={badgeIdx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-3 left-0 bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                >
                  {badges[badgeIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex-1 min-w-0 pt-2">
              <h3 className={`text-base font-semibold ${theme.headlineColor}`}>Professional</h3>
              <p className={`${theme.mutedColor} text-xs mt-0.5`}>For growing businesses</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                {proFeatures.slice(0, 3).map((f, i) => (
                  <span key={i} className={`flex items-center gap-1 text-[11px] ${theme.textColor}`}>
                    <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right shrink-0 relative">
              <EditHighlight active={activeTarget === 'price'} label="Optimizing price point" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${priceIdx}-${isAnnual}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <div className={`text-2xl font-bold ${theme.priceColor}`}>${displayPrice}</div>
                  <span className={`${theme.mutedColor} text-xs`}>/month</span>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="shrink-0 relative">
              <EditHighlight active={activeTarget === 'cta'} label="A/B testing CTA" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={ctaIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`py-2 px-5 rounded-lg text-white text-sm font-medium ${ctas[ctaIdx].color}`}
                >
                  {ctas[ctaIdx].text}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] items-center gap-4">
          <div
            className={`border ${theme.cardBorder} rounded-2xl p-5 ${theme.cardBg} flex items-center gap-6`}
          >
            <div className="flex-1 min-w-0">
              <h3 className={`text-base font-semibold ${theme.headlineColor}`}>Enterprise</h3>
              <p className={`${theme.mutedColor} text-xs mt-0.5`}>For large organizations</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                {enterpriseFeatures.slice(0, 3).map((f, i) => (
                  <span key={i} className={`flex items-center gap-1 text-[11px] ${theme.textColor}`}>
                    <Check className="w-3 h-3 text-green-500 shrink-0" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className={`text-2xl font-bold ${theme.priceColor}`}>Custom</div>
            </div>
            <div
              className={`shrink-0 py-2 px-5 rounded-lg border ${theme.cardBorder} ${theme.textColor} text-sm font-medium`}
            >
              Contact Sales
            </div>
          </div>
        </div>
      </div>
    );
  }

  // compact: 2-col with pro spanning or side-by-side comparison
  return (
    <div className="max-w-4xl mx-auto mb-10">
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {starterCard(true)}
        {proCard(true)}
      </div>
      <div className="grid md:grid-cols-1">
        <div
          className={`border ${theme.cardBorder} rounded-2xl p-5 ${theme.cardBg} flex flex-col md:flex-row md:items-center gap-5`}
        >
          <div className="flex-1">
            <h3 className={`text-base font-semibold ${theme.headlineColor}`}>Enterprise</h3>
            <p className={`${theme.mutedColor} text-xs mt-1 mb-3`}>For large organizations</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {enterpriseFeatures.map((f, i) => (
                <span key={i} className={`flex items-center gap-1.5 text-xs ${theme.textColor}`}>
                  <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-center gap-2">
            <span className={`text-2xl font-bold ${theme.priceColor}`}>Custom</span>
            <div
              className={`py-2 px-6 rounded-lg border ${theme.cardBorder} ${theme.textColor} text-sm font-medium`}
            >
              Contact Sales
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ABTestDemo() {
  const [step, setStep] = useState(0);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [priceIdx, setPriceIdx] = useState(0);
  const [ctaIdx, setCtaIdx] = useState(0);
  const [badgeIdx, setBadgeIdx] = useState(0);
  const [isAnnual, setIsAnnual] = useState(false);
  const [themeIdx, setThemeIdx] = useState(0);
  const [layoutIdx, setLayoutIdx] = useState(0);

  useEffect(() => {
    const currentEdit = EDIT_STEPS[step];

    setActiveTarget(currentEdit.target);

    const swapTimer = setTimeout(() => {
      switch (currentEdit.target) {
        case 'headline':
          setHeadlineIdx((p) => (p + 1) % headlines.length);
          break;
        case 'price':
          setPriceIdx((p) => (p + 1) % prices.length);
          break;
        case 'cta':
          setCtaIdx((p) => (p + 1) % ctas.length);
          break;
        case 'badge':
          setBadgeIdx((p) => (p + 1) % badges.length);
          break;
        case 'toggle':
          setIsAnnual((p) => !p);
          break;
        case 'theme':
          setThemeIdx((p) => (p + 1) % themes.length);
          break;
        case 'layout':
          setLayoutIdx((p) => (p + 1) % layouts.length);
          break;
      }
    }, 1000);

    const clearTimer = setTimeout(() => setActiveTarget(null), 2800);
    const nextTimer = setTimeout(
      () => setStep((p) => (p + 1) % EDIT_STEPS.length),
      3800,
    );

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(clearTimer);
      clearTimeout(nextTimer);
    };
  }, [step]);

  const theme = themes[themeIdx];
  const layout = layouts[layoutIdx].type;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-6 border border-emerald-100"
          >
            <img src="/branch-logo.png" alt="" className="w-4 h-4" />
            <span className="text-sm font-medium">Live AI Optimization</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900"
          >
            Watch AI Optimize Your Page in Real-Time
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-500 max-w-3xl mx-auto"
          >
            Branch AI autonomously tests headlines, prices, CTAs, layouts,
            and branding — finding the combination that maximizes your revenue.
          </motion.p>
        </div>

        {/* Browser mockup */}
        <div className="mb-16">
          <div className="relative">
            {/* Browser chrome */}
            <div className="bg-stone-800 rounded-t-xl p-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-stone-700 rounded-lg px-4 py-1.5 text-xs text-stone-400 flex items-center gap-2">
                  <svg
                    className="w-3 h-3 text-stone-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  yourcompany.com/pricing
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 bg-green-500/15 rounded-full px-2.5 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-[10px] font-medium">
                  Branch AI Active
                </span>
              </div>
            </div>

            {/* Pricing page */}
            <div className="border-x border-b border-stone-200 rounded-b-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={themeIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`relative ${theme.pageBg}`}
                >
                  {activeTarget === 'theme' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-gray-900 text-white text-[10px] px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <img src="/branch-logo.png" alt="" className="w-3 h-3" />
                      </motion.div>
                      <span className="font-medium">Branch AI</span>
                      <span className="text-stone-500">·</span>
                      <span className="text-stone-300">Testing page branding</span>
                    </motion.div>
                  )}

                  <div className="px-6 sm:px-12 py-10 sm:py-14">
                    {/* Page headline */}
                    <div className="text-center mb-8 relative">
                      <EditHighlight
                        active={activeTarget === 'headline'}
                        label="Testing headline copy"
                      />
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={headlineIdx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h2 className={`text-2xl sm:text-3xl font-bold ${theme.headlineColor} mb-2`}>
                            {headlines[headlineIdx].main}
                          </h2>
                          <p className={`${theme.subColor} text-sm sm:text-base`}>
                            {headlines[headlineIdx].sub}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Billing toggle */}
                    <div className="flex items-center justify-center gap-3 mb-10 relative">
                      <EditHighlight
                        active={activeTarget === 'toggle'}
                        label="Testing billing display"
                      />
                      <span
                        className={`text-sm transition-colors ${!isAnnual ? `${theme.headlineColor} font-medium` : theme.mutedColor}`}
                      >
                        Monthly
                      </span>
                      <div className={`relative w-11 h-6 ${theme.toggleBg} rounded-full`}>
                        <motion.div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full ${theme.toggleKnob} shadow-sm`}
                          animate={{ x: isAnnual ? 20 : 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        />
                      </div>
                      <span
                        className={`text-sm transition-colors ${isAnnual ? `${theme.headlineColor} font-medium` : theme.mutedColor}`}
                      >
                        Annual
                      </span>
                      <AnimatePresence>
                        {isAnnual && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full"
                          >
                            Save 20%
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Layout indicator */}
                    {activeTarget === 'layout' && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center mb-4"
                      >
                        <div className="flex items-center gap-1.5 bg-gray-900 text-white text-[10px] px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          >
                            <img src="/branch-logo.png" alt="" className="w-3 h-3" />
                          </motion.div>
                          <span className="font-medium">Branch AI</span>
                          <span className="text-stone-500">·</span>
                          <span className="text-stone-300">Testing card layout</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Pricing cards */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={layoutIdx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                      >
                        <PricingCards
                          layout={layout}
                          theme={theme}
                          activeTarget={activeTarget}
                          badgeIdx={badgeIdx}
                          priceIdx={priceIdx}
                          ctaIdx={ctaIdx}
                          isAnnual={isAnnual}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Trust bar */}
                    <div className={`text-center pt-6 border-t ${theme.trustBorder}`}>
                      <p className={`text-[11px] ${theme.mutedColor} mb-3 uppercase tracking-wider`}>
                        Trusted by 2,000+ companies
                      </p>
                      <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
                        {['Acme', 'TechCorp', 'Quantum', 'Nexus', 'DataFlow'].map(
                          (name) => (
                            <span
                              key={name}
                              className={`${theme.trustText} font-bold text-sm tracking-tight select-none`}
                            >
                              {name}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <DashboardDemo />
      </div>
    </section>
  );
}
