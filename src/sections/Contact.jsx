import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          to_name: 'Tomer Grady',
          to_email: 'tomer0191@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: 'Thank you for your message 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({ name: '', email: '', message: '' });
          }, 3000);
        },
        (error) => {
          console.error(error);
          setLoading(false);
          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: 'danger',
          });
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-24 bg-[#07080b] text-gray-200 overflow-hidden"
    >
      {/* ✅ רקע רך עם gradient ו-glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c10] to-[#050506]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00c6ff15] blur-[180px] rounded-full" />

      {alert.show && <Alert {...alert} />}

      {/* ✨ אנימציה עדינה בכניסה */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-2xl bg-[#0b0d11]/60 backdrop-blur-md p-10 rounded-2xl shadow-[0_0_30px_rgba(0,198,255,0.05)] border border-[#10141c]"
      >
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold text-[#00C6FF] text-center mb-8 drop-shadow-[0_0_12px_rgba(0,198,255,0.25)]"
        >
          Get In Touch
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-center text-gray-400 mb-10 leading-relaxed"
        >
          Whether you want to collaborate, have a question, or just say hello —
          drop me a message below.
        </motion.p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">
          <label className="block">
            <span className="block text-gray-400 mb-2">Full Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#10141c] border border-[#1a222f] rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00C6FF]/40 transition-all"
              placeholder="John Doe"
            />
          </label>

          <label className="block">
            <span className="block text-gray-400 mb-2">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#10141c] border border-[#1a222f] rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00C6FF]/40 transition-all"
              placeholder="john@example.com"
            />
          </label>

          <label className="block">
            <span className="block text-gray-400 mb-2">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-[#10141c] border border-[#1a222f] rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00C6FF]/40 transition-all resize-none"
              placeholder="Write your message here..."
            />
          </label>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#00C6FF] to-[#0072ff] text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-[0_0_20px_rgba(0,198,255,0.2)]"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
