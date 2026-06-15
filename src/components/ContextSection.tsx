import { ClipboardList, Network } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import styles from "./ContextSection.module.css";

const contextCards = [
  {
    title: "Mientras la operación todavía es visible",
    description:
      "Mientras el dueño conoce todo y puede controlar cada actividad, Excel puede bastar.",
    Icon: ClipboardList,
  },
  {
    title: "Cuando una falla empieza a viajar",
    description:
      "Cuando aparecen áreas, terceros, contratos, sistemas y dependencias, el problema cambia: ya no se trata solo de listar riesgos, sino de entender qué puede romperse cuando algo falla.",
    Icon: Network,
  },
];

export function ContextSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12">
      <div className={styles.section}>
        <SectionHeader
          eyebrow="Punto de quiebre"
          title="Una empresa deja de ser simple cuando una falla empieza a viajar."
          description="La complejidad real no empieza cuando crece la nómina. Empieza cuando las dependencias hacen que una falla local empiece a impactar a otras partes de la organización."
        />

        <div className={styles.grid}>
          {contextCards.map(({ title, description, Icon }) => (
            <article key={title} className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDescription}>{description}</p>
            </article>
          ))}
        </div>

        <div className={styles.banner}>
          <p className={styles.bannerPrimary}>
            Las matrices clasifican riesgos. Kiriox revela cómo se conectan.
          </p>
          <p className={styles.bannerSecondary}>
            El salto relevante no es documental. Es estructural.
          </p>
        </div>
      </div>
    </section>
  );
}
