import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    );
    links.forEach(l => {
      const el = document.getElementById(l.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d1117]/95 backdrop-blur border-b border-[#21262d]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3fb950] inline-block" />
          Nagarajan
        </a>

        <ul className="hidden md:flex gap-6 items-center">
          {links.map(link => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className={`text-sm font-medium transition-colors ${
                  active === link.toLowerCase()
                    ? 'text-[#3fb950]'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact"
              className="btn-primary text-sm ml-2">
              Hire Me
            </a>
          </li>
        </ul>

        <button className="md:hidden text-[#8b949e] hover:text-white" onClick={() => setOpen(!open)}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#161b22] border-b border-[#21262d] px-6 py-4 flex flex-col gap-4"
        >
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-[#8b949e] hover:text-white text-sm"
              onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}