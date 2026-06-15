"use client";

import { forwardRef } from "react";
import type { CalculatorLevel } from "@/data/levels";
import { cn } from "@/lib/utils";
import { Check, Network, ShieldCheck, Table2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./LevelCard.module.css";

interface LevelCardProps {
  level: CalculatorLevel;
  isActive: boolean;
  /** Roving tabindex: solo una tarjeta es enfocable con Tab. */
  isFocusable: boolean;
  onSelect: (levelId: number) => void;
  onFocus: () => void;
}

const iconByCategory = {
  "Excel / checklist": Table2,
  "GRC tradicional": ShieldCheck,
  "Kiriox GRI": Network,
} as const;

export const LevelCard = forwardRef<HTMLButtonElement, LevelCardProps>(
  function LevelCard(
    { level, isActive, isFocusable, onSelect, onFocus },
    ref,
  ) {
    const Icon = iconByCategory[level.category];
    const reduceMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isActive}
        tabIndex={isFocusable ? 0 : -1}
        onClick={() => onSelect(level.id)}
        onFocus={onFocus}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.985 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className={cn(styles.card, styles[level.band], isActive && styles.active)}
      >
        <div className={styles.leading}>
          <span className={styles.levelBadge}>{level.id}</span>
          <div className={styles.main}>
            <div className={styles.header}>
              <h3 className={styles.title}>{level.title}</h3>
              <span className={styles.category}>{level.category}</span>
            </div>
            <p className={styles.summary}>{level.summary}</p>
          </div>
        </div>

        <div className={styles.trailing}>
          <div className={styles.iconWrap}>
            <Icon size={16} aria-hidden="true" />
          </div>
          <div className={styles.checkWrap} aria-hidden="true">
            <Check size={16} />
          </div>
        </div>
      </motion.button>
    );
  },
);
