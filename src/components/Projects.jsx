import { useProjects } from '../hooks/usePortfolioData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Projects() {
  const { data: projects, loading } = useProjects();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (loading) return (
    <div className="py-24 flex justify-center">
      <div className="w-8 h-8 border-2 border-[#3fb950] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section ref={ref} className="py-24 px-6" style={{ backgroundColor: '#161b22' }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title"
        >
          My <span>Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card rounded-xl overflow-hidden group flex flex-col"
            >
              {/* Top bar */}
              <div className="h-40 bg-[#0d1117] flex items-center justify-center relative">
                <div className="flex gap-1.5 absolute top-3 left-3">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {i === 0 ? '🌐' : i === 1 ? '⚙️' : '📊'}
                </span>
                {project.featured && (
                  <span className="absolute top-3 right-3 bg-[#1f2d1f] text-[#3fb950] text-xs px-2 py-0.5 rounded border border-[#2d4a2d]">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white font-semibold mb-2 group-hover:text-[#3fb950] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#8b949e] text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-4 pt-3 border-t border-[#21262d]">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer"
                      className="text-[#8b949e] hover:text-[#3fb950] text-sm transition-colors flex items-center gap-1">
                      ⌥ GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer"
                      className="text-[#8b949e] hover:text-[#3fb950] text-sm transition-colors flex items-center gap-1">
                      ↗ Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}