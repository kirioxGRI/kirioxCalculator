import { ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Hero.module.css";

const decisionMarkers = [
  "1-2: Excel / checklist",
  "3: GRC tradicional",
  "4-7: Kiriox GRI",
];

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12">
      <div className={styles.shell}>
        <div className={styles.topRow}>
          <span className={styles.brand}>KIRIOX</span>
          <span className={styles.badge}>Calculator ejecutivo</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.kicker}>Diagnóstico en menos de 1 minuto</p>
            <h1 className={styles.title}>¿Tu empresa sí necesita Kiriox?</h1>
            <p className={styles.subtitle}>
              El criterio no es tamaño ni facturación. Es si una falla en una
              parte ya puede romper otra.
            </p>

            <div className={styles.statement}>
              <p>El problema no es tener muchos riesgos. El problema es no saber cómo se conectan.</p>
            </div>

            <div className={styles.markerList}>
              {decisionMarkers.map((marker) => (
                <span key={marker} className={styles.marker}>
                  {marker}
                </span>
              ))}
            </div>

            <div className={styles.actions}>
              <a
                href="#calculator"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5",
                  styles.cta,
                )}
              >
                Quiero saber en qué nivel está mi empresa
                <ArrowDownRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <p className={styles.sidebarEyebrow}>Cómo leerlo</p>
            <ol className={styles.steps}>
              <li>Elige el nivel que más se parece a tu operación.</li>
              <li>Lee la recomendación inmediata.</li>
              <li>Si caes en 4 o más, Kiriox ya entra en la conversación.</li>
            </ol>
            <p className={styles.sidebarQuote}>
              Si nadie puede responder qué más se rompe si algo falla, ya no
              estás en una operación simple.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
