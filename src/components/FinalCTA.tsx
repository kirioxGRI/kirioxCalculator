import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./FinalCTA.module.css";

const contactHref =
  "mailto:diagnostico@kiriox.com?subject=Solicitud%20de%20diagnostico%20ejecutivo";

export function FinalCTA() {
  return (
    <section className="w-full px-6 md:px-10 lg:px-12">
      <div className={styles.section}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Siguiente paso</span>
          <h2 className={styles.title}>Si caes en 4 o más, ya vale la pena hablar con Kiriox.</h2>
          <p className={styles.description}>
            Kiriox no compite con Excel. Tampoco con un checklist. Entra cuando
            la organización ya necesita entender dependencias, fragilidades y
            efectos de cascada con claridad ejecutiva.
          </p>
        </div>

        <div className={styles.actions}>
          <a
            href={contactHref}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5",
              styles.button,
            )}
          >
            Solicitar diagnóstico ejecutivo
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <p className={styles.caption}>
            Respuesta en menos de 24 horas hábiles. Sin compromiso.
          </p>
        </div>
      </div>
    </section>
  );
}
