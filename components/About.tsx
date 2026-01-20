"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { personalInfo, coreSkills, tools, education } from "@/data/portfolio";
import { GraduationCap, MapPin } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-[var(--surface)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            {personalInfo.summary}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6">Core Competencies</h3>
            <div className="space-y-6">
              {coreSkills.map((category, index) => (
                <div key={index}>
                  <h4 className="text-sm font-medium text-[var(--primary)] mb-3">
                    {category.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-[var(--background)] border border-[var(--border)] rounded-full text-sm text-[var(--text-secondary)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Tools & Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Tools */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-secondary)] hover:border-[var(--primary)] transition-colors cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Education</h3>
              <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--surface-elevated)] rounded-lg">
                    <GraduationCap className="text-[var(--primary)]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{education.degree}</h4>
                    <p className="text-[var(--text-secondary)]">{education.school}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-[var(--text-tertiary)]">
                      <MapPin size={14} />
                      <span>{education.location}</span>
                      <span>•</span>
                      <span>{education.dateRange}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Location</h3>
              <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-[var(--accent)]" size={20} />
                  <span className="text-[var(--text-secondary)]">{personalInfo.location}</span>
                  <span className="px-2 py-1 bg-[var(--accent)] bg-opacity-20 text-[var(--accent)] rounded text-xs font-medium">
                    Open to Remote
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
