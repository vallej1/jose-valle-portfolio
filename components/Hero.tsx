"use client";

import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail } from "lucide-react";
import { personalInfo, heroStats } from "@/data/portfolio";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--surface)] to-[var(--background)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20">
                <Image
                  src="/jose-profile.png"
                  alt={personalInfo.name}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] text-sm mb-6">
              Strategic Product Manager
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">{personalInfo.name}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12"
          >
            {heroStats.map((stat, index) => (
              <div
                key={index}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[var(--primary)] font-mono">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-tertiary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <a
              href="#case-studies"
              className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-8 py-3 rounded-lg font-medium transition-colors glow"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text-primary)] px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Let&apos;s Talk
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
            >
              <Linkedin size={20} className="text-[var(--text-secondary)]" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
            >
              <Mail size={20} className="text-[var(--text-secondary)]" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-[var(--text-tertiary)]">
            <span className="text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
