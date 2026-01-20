"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { personalInfo } from "@/data/portfolio";
import { Mail, Phone, Linkedin, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to an API
    // For now, we'll just open the email client
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-[var(--surface)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Interested in discussing product management opportunities or collaboration?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)] transition-colors group"
                >
                  <div className="p-3 bg-[var(--surface-elevated)] rounded-lg group-hover:bg-[var(--primary)] group-hover:bg-opacity-20 transition-colors">
                    <Mail className="text-[var(--primary)]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-tertiary)]">Email</p>
                    <p className="font-medium">{personalInfo.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-4 p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)] transition-colors group"
                >
                  <div className="p-3 bg-[var(--surface-elevated)] rounded-lg group-hover:bg-[var(--primary)] group-hover:bg-opacity-20 transition-colors">
                    <Phone className="text-[var(--accent)]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-tertiary)]">Phone</p>
                    <p className="font-medium">{personalInfo.phone}</p>
                  </div>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)] transition-colors group"
                >
                  <div className="p-3 bg-[var(--surface-elevated)] rounded-lg group-hover:bg-[var(--primary)] group-hover:bg-opacity-20 transition-colors">
                    <Linkedin className="text-[var(--primary)]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-tertiary)]">LinkedIn</p>
                    <p className="font-medium">Connect with me</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl">
                  <div className="p-3 bg-[var(--surface-elevated)] rounded-lg">
                    <MapPin className="text-[var(--accent-secondary)]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-tertiary)]">Location</p>
                    <p className="font-medium">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="text-[var(--accent)] mb-4" size={48} />
                  <h4 className="text-lg font-semibold mb-2">Message Ready!</h4>
                  <p className="text-[var(--text-secondary)]">
                    Your email client should open shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
