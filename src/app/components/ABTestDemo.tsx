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

const EDIT_STEPS = [
  { target: 'headline', label: 'Testing headline copy' },
  { target: 'price', label: 'Optimizing price point' },
  { target: 'cta', label: 'A/B testing CTA' },
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

export function ABTestDemo() {
  const [step, setStep] = useState(0);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [priceIdx, setPriceIdx] = useState(0);
  const [ctaIdx, setCtaIdx] = useState(0);
  const [badgeIdx, setBadgeIdx] = useState(0);
  const [isAnnual, setIsAnnual] = useState(false);

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

  const price = prices[priceIdx];
  const displayPrice = isAnnual ? price.annual : price.monthly;

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
            Branch AI autonomously tests headlines, prices, CTAs, and more —
            finding the combination that maximizes your revenue.
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
            <div className="bg-white border-x border-b border-stone-200 rounded-b-xl">
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
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        {headlines[headlineIdx].main}
                      </h2>
                      <p className="text-gray-500 text-sm sm:text-base">
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
                    className={`text-sm transition-colors ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-400'}`}
                  >
                    Monthly
                  </span>
                  <div className="relative w-11 h-6 bg-stone-200 rounded-full">
                    <motion.div
                      className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                      animate={{ x: isAnnual ? 20 : 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  </div>
                  <span
                    className={`text-sm transition-colors ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-400'}`}
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

                {/* Pricing cards */}
                <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
                  {/* Starter */}
                  <div className="border border-gray-200 rounded-2xl p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Starter
                    </h3>
                    <p className="text-gray-500 text-xs mb-5">
                      For small teams getting started
                    </p>
                    <div className="mb-5">
                      <span className="text-3xl font-bold text-gray-900">
                        $0
                      </span>
                      <span className="text-gray-400 text-sm ml-1">
                        /month
                      </span>
                    </div>
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {starterFeatures.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-gray-600"
                        >
                          <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="w-full py-2.5 px-4 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium text-center">
                      Get Started
                    </div>
                  </div>

                  {/* Professional — AI-tested */}
                  <div className="border-2 border-emerald-500 rounded-2xl p-6 flex flex-col relative shadow-lg shadow-emerald-500/10">
                    {/* Badge */}
                    <div className="relative mb-3">
                      <EditHighlight
                        active={activeTarget === 'badge'}
                        label="Testing social proof"
                      />
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={badgeIdx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 20,
                          }}
                          className="inline-block bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-3 py-0.5 rounded-full"
                        >
                          {badges[badgeIdx]}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Professional
                    </h3>
                    <p className="text-gray-500 text-xs mb-5">
                      For growing businesses
                    </p>

                    {/* Price */}
                    <div className="mb-5 relative">
                      <EditHighlight
                        active={activeTarget === 'price'}
                        label="Optimizing price point"
                      />
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${priceIdx}-${isAnnual}`}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 15 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-3xl font-bold text-gray-900">
                            ${displayPrice}
                          </span>
                          <span className="text-gray-400 text-sm ml-1">
                            /month
                          </span>
                          {isAnnual && (
                            <div className="text-emerald-600 text-[11px] mt-0.5">
                              Billed annually (${displayPrice * 12}/yr)
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <ul className="space-y-2.5 mb-6 flex-1">
                      {proFeatures.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-gray-600"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="relative">
                      <EditHighlight
                        active={activeTarget === 'cta'}
                        label="A/B testing CTA"
                      />
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

                  {/* Enterprise */}
                  <div className="border border-gray-200 rounded-2xl p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Enterprise
                    </h3>
                    <p className="text-gray-500 text-xs mb-5">
                      For large organizations
                    </p>
                    <div className="mb-5">
                      <span className="text-3xl font-bold text-gray-900">
                        Custom
                      </span>
                    </div>
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {enterpriseFeatures.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-gray-600"
                        >
                          <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="w-full py-2.5 px-4 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium text-center">
                      Contact Sales
                    </div>
                  </div>
                </div>

                {/* Trust bar */}
                <div className="text-center pt-6 border-t border-gray-100">
                  <p className="text-[11px] text-gray-400 mb-3 uppercase tracking-wider">
                    Trusted by 2,000+ companies
                  </p>
                  <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
                    {['Acme', 'TechCorp', 'Quantum', 'Nexus', 'DataFlow'].map(
                      (name) => (
                        <span
                          key={name}
                          className="text-gray-300 font-bold text-sm tracking-tight select-none"
                        >
                          {name}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DashboardDemo />
      </div>
    </section>
  );
}
