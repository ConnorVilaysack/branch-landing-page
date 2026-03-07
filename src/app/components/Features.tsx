import { motion } from 'motion/react';
import { TrendingUp, Target, Sparkles, BarChart3, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Optimization',
    description: 'Our autonomous agents learn from every visitor interaction, continuously improving your pricing page performance.',
  },
  {
    icon: Target,
    title: 'Smart Segmentation',
    description: 'Automatically test different variations for different user segments to maximize conversion across all audiences.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Maximization',
    description: 'Optimize not just for conversions, but for maximum customer lifetime value and revenue per visitor.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Get instant insights into what\'s working and why, with detailed breakdowns by segment and variation.',
  },
  {
    icon: Zap,
    title: 'Zero Code Integration',
    description: 'Add a simple script tag and let our AI handle the rest. No developer resources required.',
  },
  {
    icon: Users,
    title: 'Multi-Variant Testing',
    description: 'Test unlimited combinations of prices, CTAs, features, and designs simultaneously.',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900"
          >
            Everything You Need to Win
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-3xl mx-auto"
          >
            Branch gives you the tools to turn your pricing page into a self-optimizing revenue machine
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
