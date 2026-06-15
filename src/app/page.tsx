import { Calculator } from "@/components/Calculator";
import { FinalCTA } from "@/components/FinalCTA";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.main}>
        <div className={styles.sectionStack}>
          <Calculator />
          <FinalCTA />
        </div>
      </div>
    </main>
  );
}
