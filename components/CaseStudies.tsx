"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { caseStudies } from "@/data/portfolio";
import { X, ChevronRight, Target, Lightbulb, TrendingUp, Award } from "lucide-react";

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);

  const selectedCaseStudy = caseStudies.find((cs) => cs.id === selectedStudy);

  return (
    <section id="case-studies" className="py-24 bg-[var(--surface)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Case Studies</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Deep dives into product challenges I&apos;ve solved and the measurable impact delivered
          </p>
        </motion.div>

        {/* Case Study Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              id={`case-study-${study.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)] transition-all cursor-pointer group"
              onClick={() => setSelectedStudy(study.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: study.color }}
                />
                <span className="text-xs font-mono text-[var(--text-tertiary)]">
                  {study.dateRange}
                </span>
              </div>

              {/* Company & Title */}
              <div className="mb-4">
                <p className="text-sm text-[var(--primary)] font-medium mb-1">
                  {study.company}
                </p>
                <h3 className="text-xl font-semibold group-hover:text-[var(--primary)] transition-colors">
                  {study.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-2">
                {study.shortDescription}
              </p>

              {/* Metrics Preview */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {study.metrics.slice(0, 3).map((metric, mIndex) => (
                  <div key={mIndex} className="text-center">
                    <div
                      className="text-lg font-bold font-mono"
                      style={{ color: study.color }}
                    >
                      {metric.value}
                    </div>
                    <div className="text-xs text-[var(--text-tertiary)] truncate">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* View Details */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <span className="text-sm text-[var(--text-secondary)]">
                  View Details
                </span>
                <ChevronRight
                  className="text-[var(--text-tertiary)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all"
                  size={18}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedStudy(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="sticky top-0 z-10 p-6 border-b border-[var(--border)] bg-[var(--surface)]"
              style={{
                background: `linear-gradient(135deg, ${selectedCaseStudy.color}15, transparent)`,
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: selectedCaseStudy.color }}>
                    {selectedCaseStudy.company} • {selectedCaseStudy.dateRange}
                  </p>
                  <h3 className="text-2xl font-bold">{selectedCaseStudy.title}</h3>
                  <p className="text-[var(--text-secondary)] mt-1">
                    {selectedCaseStudy.role}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStudy(null)}
                  className="p-2 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors"
                >
                  <X size={24} className="text-[var(--text-secondary)]" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* The Challenge */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="text-[var(--accent-secondary)]" size={20} />
                  <h4 className="text-lg font-semibold">The Challenge</h4>
                </div>
                <p className="text-[var(--text-secondary)] mb-4">
                  {selectedCaseStudy.challenge}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.painPoints.map((pain, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[var(--background)] border border-[var(--border)] rounded-full text-sm text-[var(--text-secondary)]"
                    >
                      {pain}
                    </span>
                  ))}
                </div>
              </div>

              {/* My Approach */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="text-[var(--primary)]" size={20} />
                  <h4 className="text-lg font-semibold">My Approach</h4>
                </div>
                <ul className="space-y-3">
                  {selectedCaseStudy.approach.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: selectedCaseStudy.color }}
                      >
                        {index + 1}
                      </span>
                      <span className="text-[var(--text-secondary)]">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results & Impact */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="text-[var(--accent)]" size={20} />
                  <h4 className="text-lg font-semibold">Results & Impact</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedCaseStudy.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-4 text-center"
                    >
                      <div
                        className="text-2xl font-bold font-mono mb-1"
                        style={{ color: selectedCaseStudy.color }}
                      >
                        {metric.value}
                      </div>
                      <div className="text-xs text-[var(--text-tertiary)]">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Learnings */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="text-[var(--accent-secondary)]" size={20} />
                  <h4 className="text-lg font-semibold">Key Learnings</h4>
                </div>
                <ul className="space-y-2">
                  {selectedCaseStudy.learnings.map((learning, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-[var(--text-secondary)]"
                    >
                      <span style={{ color: selectedCaseStudy.color }}>•</span>
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
