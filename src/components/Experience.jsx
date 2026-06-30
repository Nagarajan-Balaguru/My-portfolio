import { useExperience } from '../hooks/usePortfolioData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Experience() {
  const { data: experiences, loading } = useExperience();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (loading) return (
    <div className="py-24 flex justify-center">
      <div className="w-8 h-8 border-2 border-[#3fb950] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title"
        >
          My <span>Experience</span>
        </motion.h2>

        <div className="relative pl-8 border-l border-[#21262d]">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative mb-10 last:mb-0"
            >
              {/* dot */}
              <div className="absolute -left-[41px] top-5 w-3 h-3 rounded-full bg-[#3fb950] border-2 border-[#0d1117]" />

              <div className="card rounded-xl p-6 group">
                <div className="flex flex-wrap justify-between gap-2 mb-1">
                  <h3 className="text-white font-semibold group-hover:text-[#3fb950] transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-xs bg-[#1f2d1f] text-[#3fb950] border border-[#2d4a2d] px-3 py-0.5 rounded-full font-mono">
                    {exp.startDate?.slice(0, 7)} — {exp.current ? 'Present' : exp.endDate?.slice(0, 7)}
                  </span>
                </div>
                <p className="text-[#3fb950] text-sm font-medium mb-4">{exp.company}</p>
                <ul className="flex flex-col gap-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-[#8b949e] text-sm flex gap-2 items-start">
                      <span className="text-[#3fb950] mt-0.5 text-xs">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}