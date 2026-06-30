import { useSkills } from '../hooks/usePortfolioData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const categories = ['Frontend', 'Backend', 'Database', 'Tools'];

export default function Skills() {
  const { data: skills, loading } = useSkills();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (loading) return (
    <div className="py-24 flex justify-center">
      <div className="w-8 h-8 border-2 border-[#3fb950] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title"
        >
          My <span>Skills</span>
        </motion.h2>

        {categories.map((cat, ci) => {
          const filtered = skills.filter(s => s.category === cat);
          if (!filtered.length) return null;
          return (
            <div key={cat} className="mb-10">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: ci * 0.1 }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="w-1 h-5 bg-[#3fb950] rounded-full" />
                <h3 className="text-white font-semibold">{cat}</h3>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {filtered.map((skill, i) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="card rounded-xl p-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[#e6edf3] text-sm font-medium">{skill.name}</span>
                      <span className="text-[#3fb950] text-xs font-mono">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-[#21262d] rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.proficiency}%` } : {}}
                        transition={{ duration: 1, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                        className="h-1.5 rounded-full bg-[#3fb950]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}