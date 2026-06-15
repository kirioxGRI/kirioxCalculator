import { AlertTriangle, ScanSearch } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import styles from "./PainSection.module.css";

export function PainSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12">
      <div className={styles.section}>
        <div className={styles.copy}>
          <SectionHeader
            eyebrow="Dolor y deseo"
            title="Evita descubrir demasiado tarde qué podía romper tu empresa."
            description="No vendemos software. Vendemos la capacidad de identificar fragilidades ocultas antes de que se conviertan en pérdidas, sanciones o crisis operativas. Kiriox ayuda a las organizaciones a actuar con confianza, control y anticipación."
          />
        </div>

        <div className={styles.panel}>
          <article className={styles.note}>
            <div className={styles.iconWrap}>
              <AlertTriangle size={18} aria-hidden="true" />
            </div>
            <p>
              Las matrices sirven para clasificar. Lo que Kiriox resuelve es
              entender cómo una falla aislada se convierte en un problema
              sistémico.
            </p>
          </article>

          <article className={styles.note}>
            <div className={styles.iconWrap}>
              <ScanSearch size={18} aria-hidden="true" />
            </div>
            <p>
              Si nadie puede responder &quot;qué más se rompe si esto falla&quot;, ya no
              tienes solo un problema de riesgos. Tienes un problema de
              inteligencia estructural.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
