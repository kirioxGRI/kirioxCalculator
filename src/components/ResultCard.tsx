"use client";

import type { CalculatorLevel, DiagnosticContent } from "@/data/levels";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Cascade } from "./Cascade";
import styles from "./ResultCard.module.css";

interface ResultCardProps {
  level: CalculatorLevel | null;
  diagnostic: DiagnosticContent;
}

export function ResultCard({ level, diagnostic }: ResultCardProps) {
  const shouldBuyKiriox = level ? level.id >= 4 : false;
  const needsTraditionalGrc = level?.id === 3;
  const reduceMotion = useReducedMotion();

  const verdictText = shouldBuyKiriox
    ? "Sí"
    : needsTraditionalGrc
      ? "Todavía no"
      : level
        ? "No por ahora"
        : "—";

  const fade = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.28, ease: "easeOut" as const },
      };

  return (
    <aside className={styles.card}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Resultado</span>
        <AnimatePresence mode="wait">
          <motion.span key={diagnostic.label} className={styles.tag} {...fade}>
            {diagnostic.label}
          </motion.span>
        </AnimatePresence>
      </div>

      <Cascade level={level?.id} />

      <div
        className={cn(
          styles.verdictBox,
          shouldBuyKiriox && styles.verdictBoxYes,
          needsTraditionalGrc && styles.verdictBoxMaybe,
        )}
      >
        <span className={styles.verdictLabel}>¿Debes comprar Kiriox?</span>
        <AnimatePresence mode="wait">
          <motion.strong
            key={verdictText}
            className={cn(
              styles.verdictValue,
              shouldBuyKiriox && styles.verdictYes,
              needsTraditionalGrc && styles.verdictMaybe,
            )}
            {...fade}
          >
            {verdictText}
          </motion.strong>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={diagnostic.title} className={styles.copyBlock} {...fade}>
          <h3 className={styles.title}>{diagnostic.title}</h3>
          <p className={styles.description}>{diagnostic.description}</p>
        </motion.div>
      </AnimatePresence>

      <div className={styles.detailPanel}>
        <AnimatePresence mode="wait">
          {level ? (
            <motion.div key={`level-${level.id}`} {...fade}>
              <div className={styles.levelHeader}>
                <span className={styles.levelPill}>Nivel {level.id}</span>
                <span className={styles.levelCategory}>{level.category}</span>
              </div>
              <p className={styles.levelDescription}>{level.description}</p>
              <p className={styles.label}>
                <strong>Señal:</strong> {level.signal}
              </p>
              <p className={styles.label}>
                <strong>Resultado:</strong> {level.outcome}
              </p>
            </motion.div>
          ) : (
            <motion.div key="empty" {...fade}>
              <div className={styles.levelHint}>
                <Sparkles size={18} aria-hidden="true" />
                <span>
                  La señal relevante no es el tamaño. Es la dependencia.
                </span>
              </div>
              <p className={styles.levelDescription}>
                Si nadie puede responder &quot;qué más se rompe si esto
                falla&quot;, ya no tienes solo un problema de riesgos. Tienes un
                problema de inteligencia estructural.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <a
        href={
          shouldBuyKiriox
            ? "mailto:diagnostico@kiriox.com?subject=Diagnostico%20Kiriox%20GRI"
            : "#calculator"
        }
        className={cn(styles.action, !shouldBuyKiriox && styles.actionGhost)}
      >
        {shouldBuyKiriox
          ? "Solicitar diagnóstico ejecutivo"
          : "Revisar otro nivel"}
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </aside>
  );
}
