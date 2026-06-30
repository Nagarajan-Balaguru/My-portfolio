import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sendContact } from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus('validation'); return; }
    setStatus('sending');
    try {
      await sendContact(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch { setStatus('error'); }
  };

  return (
    <section ref={ref} className="py-24 px-6" style={{ backgroundColor: '#161b22' }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title"
        >
          Get In <span>Touch</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white text-xl font-semibold mb-3">Let's work together</h3>
            <p className="text-[#8b949e] leading-relaxed mb-8">
              I'm currently open to new opportunities. Whether you have a project in mind, a question, or just want to say hi — my inbox is always open!
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: '✉️', label: 'Email', value: 'nagarajan@example.com' },
                { icon: '📍', label: 'Location', value: 'India' },
                { icon: '💼', label: 'Status', value: 'Open to work' },
              ].map(item => (
                <div key={item.label} className="card rounded-xl p-4 flex items-center gap-4">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-[#8b949e] text-xs">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="card rounded-xl p-6"
          >
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[#8b949e] text-xs mb-1.5 block">Your Name</label>
                <input
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-[#8b949e] text-xs mb-1.5 block">Email Address</label>
                <input
                  name="email" value={form.email} onChange={handleChange}
                  placeholder="john@example.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-[#8b949e] text-xs mb-1.5 block">Message</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="input-field resize-none"
                />
              </div>

              <button onClick={handleSubmit} disabled={status === 'sending'}
                className="btn-primary w-full disabled:opacity-50">
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>

              {status === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-[#3fb950] text-sm text-center bg-[#1f2d1f] border border-[#2d4a2d] rounded-lg p-3">
                  ✓ Message sent successfully!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800 rounded-lg p-3">
                  ✗ Something went wrong. Please try again.
                </motion.p>
              )}
              {status === 'validation' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-yellow-400 text-sm text-center bg-yellow-900/20 border border-yellow-800 rounded-lg p-3">
                  ⚠ Please fill in all fields.
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}