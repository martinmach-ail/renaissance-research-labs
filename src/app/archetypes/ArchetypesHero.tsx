"use client";

import { motion } from "framer-motion";

export function ArchetypesHero() {
  return (
    <section
      className="min-h-[50vh] flex flex-col items-center justify-center text-center relative z-10"
      style={{
        backgroundColor: "var(--archetypes-burgundy, #6B3040)",
        paddingTop: "calc(80px + 60px)",
        paddingBottom: "60px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="w-2 h-2 bg-white rounded-full" />
        <span className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
          Advisory Forge
        </span>
      </motion.div>

      <motion.h1
        className="font-display font-bold text-white leading-none mb-8"
        style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        Archetypes
      </motion.h1>

      <motion.p
        className="font-display italic text-white/90 leading-relaxed max-w-[700px]"
        style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        A personalized founder board that channels the wisdom of
        history&apos;s greatest operators, delivering sharp, situational
        insight and contrarian perspective to help you navigate your toughest
        decisions.
      </motion.p>

      <motion.div
        className="mt-12 h-[3px] bg-white rounded-full"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 60, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      />
    </section>
  );
}
