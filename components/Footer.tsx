"use client";

import { personalInfo } from "@/data/portfolio";
import { Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
            <span>&copy; {currentYear} {personalInfo.name}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Built with <Heart size={14} className="text-[var(--accent)]" fill="currentColor" />
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors text-[var(--text-tertiary)] hover:text-[var(--primary)]"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors text-[var(--text-tertiary)] hover:text-[var(--primary)]"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
