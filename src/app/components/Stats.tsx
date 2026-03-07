import { motion } from 'motion/react';

const stats = [
  {
    value: '127%',
    label: 'Average Revenue Increase',
    description: 'Companies see 2x+ revenue growth',
  },
  {
    value: '3.2x',
    label: 'Conversion Improvement',
    description: 'Across all customer segments',
  },
  {
    value: '24/7',
    label: 'Autonomous Testing',
    description: 'Never stop optimizing',
  },
  {
    value: '<30min',
    label: 'Setup Time',
    description: 'From signup to first test',
  },
];

export function Stats() {
  return (
    <section id="pricing" className="py-24 bg-gray-950 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            The Numbers Speak for Themselves
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join hundreds of B2C companies already using Branch to unlock their pricing potential
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                className="text-5xl font-bold text-emerald-400 mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
