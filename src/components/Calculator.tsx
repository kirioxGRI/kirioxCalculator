"use client";

import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { getDiagnosticForLevel, levels, summaryBands } from "@/data/levels";
import { LevelCard } from "./LevelCard";
import { ResultCard } from "./ResultCard";
import { SectionHeader } from "./SectionHeader";
import styles from "./Calculator.module.css";

export function Calculator() {
  const [selectedLevel, setSelectedLevel] = useState<number | undefined>(
    undefined,
  );
  // Roving tabindex: índice (0-based) de la tarjeta enfocable con Tab.
  const [focusIndex, setFocusIndex] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const activeLevel = levels.find((level) => level.id === selectedLevel) ?? null;
  const progressPercent = activeLevel
    ? (activeLevel.id / levels.length) * 100
    : 0;
  const diagnostic = getDiagnosticForLevel(selectedLevel);

  function moveTo(index: number) {
    const clamped = (index + levels.length) % levels.length;
    setFocusIndex(clamped);
    setSelectedLevel(levels[clamped].id);
    itemRefs.current[clamped]?.focus();
  }

  function handleSelect(levelId: number) {
    setSelectedLevel(levelId);
    setFocusIndex(levelId - 1);
    // En móvil/tablet el resultado vive debajo de la lista: lo traemos a la vista.
    if (typeof window !== "undefined" && window.innerWidth < 1180) {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "start",
        });
      });
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        moveTo(focusIndex + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        moveTo(focusIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        moveTo(0);
        break;
      case "End":
        event.preventDefault();
        moveTo(levels.length - 1);
        break;
    }
  }

  function handleReset() {
    setSelectedLevel(undefined);
    setFocusIndex(0);
    itemRefs.current[0]?.focus();
  }

  return (
    <section
      id="calculator"
      className="w-full scroll-mt-6 px-6 md:px-10 lg:px-12"
    >
      <div className={styles.section}>
        <SectionHeader
          eyebrow="Kiriox Calculator"
          title="Selecciona el nivel que más se parece a tu empresa."
          description="La meta es simple: saber rápido si Kiriox todavía no hace falta, si un GRC basta o si ya necesitas inteligencia estructural."
        />

        <div className={styles.summaryRow}>
          {summaryBands.map((band) => (
            <div key={band.range} className={styles.summaryPill}>
              <span className={styles.summaryRange}>{band.range}</span>
              <span className={styles.summaryLabel}>{band.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.layout}>
          <div className={styles.scalePanel}>
            <div className={styles.scaleMeta}>
              <div>
                <p className={styles.scaleLabel}>Escala de interdependencia</p>
                <p className={styles.scaleDescription}>
                  Elige una sola opción. No pienses en tamaño. Piensa en qué
                  tanto se propaga una falla dentro de tu organización.
                </p>
              </div>
              <div className={styles.scaleIndicator}>
                <span>Nivel</span>
                <strong>{activeLevel ? `${activeLevel.id}/7` : "--/7"}</strong>
              </div>
            </div>

            <div className={styles.progressRail} aria-hidden="true">
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div
              role="radiogroup"
              aria-label="Escala de interdependencia, del nivel 1 al 7"
              className={styles.cardsGrid}
              onKeyDown={handleKeyDown}
            >
              {levels.map((level, index) => (
                <LevelCard
                  key={level.id}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  level={level}
                  isActive={level.id === selectedLevel}
                  isFocusable={index === focusIndex}
                  onSelect={handleSelect}
                  onFocus={() => setFocusIndex(index)}
                />
              ))}
            </div>

            {activeLevel ? (
              <button
                type="button"
                className={styles.resetButton}
                onClick={handleReset}
              >
                <RotateCcw size={15} aria-hidden="true" />
                Empezar de nuevo
              </button>
            ) : null}
          </div>

          <div ref={resultRef} className={styles.resultSlot}>
            <ResultCard level={activeLevel} diagnostic={diagnostic} />
          </div>
        </div>

        {/* Anuncio para lectores de pantalla cuando cambia el diagnóstico. */}
        <p className={styles.srOnly} aria-live="polite">
          {activeLevel
            ? `Nivel ${activeLevel.id}. ${diagnostic.title} Recomendación: ${diagnostic.label}.`
            : ""}
        </p>
      </div>
    </section>
  );
}
