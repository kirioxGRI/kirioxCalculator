import { Network, ShieldCheck, Table2 } from "lucide-react";
import { summaryBands } from "@/data/levels";
import { SectionHeader } from "./SectionHeader";
import styles from "./SummaryBands.module.css";

const icons = [Table2, ShieldCheck, Network];

export function SummaryBands() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12">
      <div className={styles.section}>
        <SectionHeader
          eyebrow="Resumen visual"
          title="Tres herramientas para tres niveles de complejidad."
          description="La diferencia no está en cuántos controles existen. Está en si los riesgos siguen aislados o ya están conectados."
          align="center"
        />

        <div className={styles.grid}>
          {summaryBands.map((band, index) => {
            const Icon = icons[index];

            return (
              <article key={band.range} className={styles.card}>
                <div className={styles.iconWrap}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <p className={styles.range}>{band.range}</p>
                <h3 className={styles.label}>{band.label}</h3>
                <p className={styles.description}>{band.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
