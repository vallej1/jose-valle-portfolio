"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { experiences, caseStudies } from "@/data/portfolio";
import { Building2, ChevronRight, ExternalLink } from "lucide-react";

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const getCaseStudy = (caseStudyId?: string) => {
    if (!caseStudyId) return null;
    return caseStudies.find((cs) => cs.id === caseStudyId);
  };

  return (
    <section id="experience" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            A journey through product management roles building B2B SaaS solutions
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)] -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const caseStudy = getCaseStudy(exp.caseStudyId);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className={`w-4 h-4 rounded-full border-4 border-[var(--background)] ${
                        selectedCompany === exp.company
                          ? "bg-[var(--primary)]"
                          : "bg-[var(--border)]"
                      }`}
                      whileHover={{ scale: 1.5 }}
                      onClick={() =>
                        setSelectedCompany(
                          selectedCompany === exp.company ? null : exp.company
                        )
                      }
                    />
                  </div>

                  {/* Date Badge - Mobile */}
                  <div className="md:hidden ml-16 mb-2">
                    <span className="text-sm font-mono text-[var(--text-tertiary)]">
                      {exp.dateRange}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isEven ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div
                      className={`bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)] transition-all cursor-pointer ${
                        selectedCompany === exp.company ? "glow" : ""
                      }`}
                      onClick={() =>
                        setSelectedCompany(
                          selectedCompany === exp.company ? null : exp.company
                        )
                      }
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[var(--surface-elevated)] rounded-lg">
                            <Building2
                              className="text-[var(--primary)]"
                              size={20}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {exp.company}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)]">
                              {exp.role}
                            </p>
                          </div>
                        </div>
                        <ChevronRight
                          className={`text-[var(--text-tertiary)] transition-transform ${
                            selectedCompany === exp.company ? "rotate-90" : ""
                          }`}
                          size={20}
                        />
                      </div>

                      {/* Date - Desktop */}
                      <div className="hidden md:block mb-3">
                        <span className="text-sm font-mono text-[var(--text-tertiary)]">
                          {exp.dateRange} • {exp.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[var(--text-secondary)] mb-4">
                        {exp.companyDescription}
                      </p>

                      {/* Expanded Content */}
                      {selectedCompany === exp.company && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-[var(--border)] pt-4 mt-4"
                        >
                          <h4 className="text-sm font-medium text-[var(--primary)] mb-3">
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {exp.highlights.map((highlight, hIndex) => (
                              <li
                                key={hIndex}
                                className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                              >
                                <span className="text-[var(--accent)] mt-1">
                                  •
                                </span>
                                {highlight}
                              </li>
                            ))}
                          </ul>

                          {/* Case Study Link */}
                          {caseStudy && (
                            <a
                              href={`#case-study-${caseStudy.id}`}
                              className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
                            >
                              <span>View Case Study: {caseStudy.title}</span>
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
