import { useProfile } from '../hooks/usePortfolioData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects Built', value: '10+' },
  { label: 'Technologies', value: '8+' },
  { label: 'Coffee Cups', value: '∞' },
];

export default function About() {
  const { data } = useProfile();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="py-24 px-6" style={{ backgroundColor: '#161b22' }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title"
        >
          About <span>Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative inline-block w-full max-w-sm mx-auto">
              <img
                src={data?.avatarUrl}
                alt={data?.name}
                onError={e => e.target.src = `https://ui-avatars.com/api/?name=${data?.name}&background=1f2d1f&color=3fb950&size=400`}
                className="w-full rounded-2xl border border-[#21262d]"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-[#3fb950]/20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-1">{data?.name}</h3>
            <p className="text-[#3fb950] text-sm font-medium mb-4">{data?.tagline}</p>
            <p className="text-[#8b949e] leading-relaxed mb-6">{data?.bio}</p>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-3 text-[#8b949e] text-sm">
                <span className="text-[#3fb950]">📍</span>
                <span>{data?.location}</span>
              </div>
              <div className="flex items-center gap-3 text-[#8b949e] text-sm">
                <span className="text-[#3fb950]">✉️</span>
                <span>{data?.email}</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a href="#contact" className="btn-primary text-sm">Get In Touch</a>
              <a href={data?.resumeUrl} className="btn-secondary text-sm">Resume</a>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="card rounded-xl p-5 text-center"
            >
              <p className="text-2xl font-bold text-[#3fb950] mb-1">{s.value}</p>
              <p className="text-[#8b949e] text-xs">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}