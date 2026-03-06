"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { vercelApps } from "@/data/portfolio";

export default function VercelApps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apps" className="py-24 bg-[var(--background)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Apps in Production</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Side projects and demos shipped to Vercel — where product thinking meets hands-on building
          </p>
        </motion.div>

        {/* App Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vercelApps.map((app, index) => (
            <motion.a
              key={app.id}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)] transition-all group flex flex-col"
            >
              {/* Color accent bar */}
              <div
                className="w-full h-1 rounded-full mb-6"
                style={{ backgroundColor: app.color }}
              />

              {/* App name */}
              <h3
                className="text-lg font-semibold mb-3 group-hover:text-[var(--primary)] transition-colors"
              >
                {app.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] mb-5 flex-1 line-clamp-3">
                {app.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {app.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono rounded-full border border-[var(--border)] text-[var(--text-tertiary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="flex items-center gap-1.5 text-sm font-medium pt-4 border-t border-[var(--border)]"
                style={{ color: app.color }}
              >
                <span>View App</span>
                <ExternalLink
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
