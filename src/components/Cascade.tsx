"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./Cascade.module.css";

/**
 * Mapa de cascada.
 *
 * Visualiza la idea central del producto: cómo una falla viaja entre las partes
 * de una organización. La red se densifica a medida que sube el nivel y, a
 * partir del nivel 4, las conexiones críticas propagan una falla (pulso viajero).
 */

interface CascadeProps {
  /** Nivel seleccionado (1-7). undefined = estado de previsualización. */
  level?: number;
}

// Siete partes de una organización dispuestas en una elipse.
const NODES = [
  { x: 150, y: 26 },
  { x: 244, y: 50 },
  { x: 267, y: 104 },
  { x: 202, y: 148 },
  { x: 98, y: 148 },
  { x: 33, y: 104 },
  { x: 56, y: 50 },
] as const;

// Cada arista aparece a partir de cierto nivel. lvl >= 4 = conexión crítica.
const EDGES = [
  { a: 0, b: 1, lvl: 2 },
  { a: 0, b: 2, lvl: 2 },
  { a: 0, b: 3, lvl: 3 },
  { a: 0, b: 4, lvl: 3 },
  { a: 0, b: 5, lvl: 3 },
  { a: 1, b: 3, lvl: 4 },
  { a: 2, b: 4, lvl: 4 },
  { a: 4, b: 6, lvl: 5 },
  { a: 5, b: 6, lvl: 5 },
  { a: 1, b: 2, lvl: 6 },
  { a: 3, b: 4, lvl: 6 },
  { a: 2, b: 6, lvl: 6 },
  { a: 0, b: 6, lvl: 7 },
  { a: 1, b: 5, lvl: 7 },
  { a: 3, b: 6, lvl: 7 },
  { a: 1, b: 6, lvl: 7 },
] as const;

export function Cascade({ level }: CascadeProps) {
  const reduceMotion = useReducedMotion();
  const isPreview = level === undefined;

  // En previsualización mostramos la red completa, tenue (la complejidad posible).
  const visibleEdges = EDGES.filter((e) => isPreview || e.lvl <= level);
  const criticalEdges =
    !isPreview && level >= 4 ? visibleEdges.filter((e) => e.lvl >= 4) : [];

  const activeNodes = new Set<number>();
  if (!isPreview) activeNodes.add(0);
  visibleEdges.forEach((e) => {
    activeNodes.add(e.a);
    activeNodes.add(e.b);
  });
  if (isPreview) NODES.forEach((_, i) => activeNodes.add(i));

  const atRiskNodes = new Set<number>();
  criticalEdges.forEach((e) => {
    atRiskNodes.add(e.a);
    atRiskNodes.add(e.b);
  });

  const criticalCount = criticalEdges.length;

  return (
    <div className={styles.wrap}>
      <svg
        className={styles.svg}
        viewBox="0 0 300 174"
        role="img"
        aria-label={
          isPreview
            ? "Mapa de interdependencia: red completa en reposo."
            : `Nivel ${level}: ${visibleEdges.length} conexiones activas, ${criticalCount} críticas.`
        }
      >
        {/* Aristas */}
        {visibleEdges.map((e, i) => {
          const a = NODES[e.a];
          const b = NODES[e.b];
          const critical = !isPreview && level >= 4 && e.lvl >= 4;
          return (
            <motion.line
              key={`${e.a}-${e.b}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={cnEdge(isPreview, critical)}
              initial={
                reduceMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }
              }
              animate={
                reduceMotion
                  ? { opacity: isPreview ? 0.35 : 1 }
                  : { pathLength: 1, opacity: isPreview ? 0.35 : 1 }
              }
              transition={{ duration: 0.5, delay: i * 0.035, ease: "easeOut" }}
            />
          );
        })}

        {/* Pulsos que viajan por las conexiones críticas (la cascada) */}
        {!reduceMotion &&
          criticalEdges.map((e, i) => {
            const a = NODES[e.a];
            const b = NODES[e.b];
            return (
              <motion.circle
                key={`pulse-${e.a}-${e.b}`}
                r={2.6}
                className={styles.pulse}
                initial={{ cx: a.x, cy: a.y, opacity: 0 }}
                animate={{
                  cx: [a.x, b.x],
                  cy: [a.y, b.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.4 + i * 0.22,
                  repeat: Infinity,
                  repeatDelay: 0.6,
                  ease: "easeInOut",
                }}
              />
            );
          })}

        {/* Nodos */}
        {NODES.map((n, i) => {
          const active = activeNodes.has(i);
          const atRisk = atRiskNodes.has(i);
          return (
            <g key={i}>
              {atRisk && !reduceMotion && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  className={styles.ring}
                  initial={{ r: 6, opacity: 0.6 }}
                  animate={{ r: [6, 13], opacity: [0.5, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeOut",
                  }}
                />
              )}
              <motion.circle
                cx={n.x}
                cy={n.y}
                className={cnNode(active, atRisk)}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: active ? 1 : 0.3 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                r={atRisk ? 6.5 : 5.5}
              />
            </g>
          );
        })}
      </svg>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <i className={styles.dotInk} aria-hidden="true" />
          {visibleEdges.length} conexiones
        </span>
        <span className={styles.legendItem}>
          <i className={styles.dotAccent} aria-hidden="true" />
          {criticalCount} críticas
        </span>
      </div>
    </div>
  );
}

function cnNode(active: boolean, atRisk: boolean) {
  if (atRisk) return `${styles.node} ${styles.nodeRisk}`;
  if (active) return `${styles.node} ${styles.nodeActive}`;
  return `${styles.node} ${styles.nodeIdle}`;
}

function cnEdge(preview: boolean, critical: boolean) {
  if (preview) return `${styles.edge} ${styles.edgeIdle}`;
  if (critical) return `${styles.edge} ${styles.edgeCritical}`;
  return `${styles.edge} ${styles.edgeActive}`;
}
