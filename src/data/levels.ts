export type SolutionCategory =
  | "Excel / checklist"
  | "GRC tradicional"
  | "Kiriox GRI";

export type ComplexityBand = "simple" | "transitional" | "structural";

export interface CalculatorLevel {
  id: number;
  title: string;
  summary: string;
  description: string;
  example: string;
  outcome: string;
  category: SolutionCategory;
  band: ComplexityBand;
  signal: string;
}

export interface DiagnosticContent {
  title: string;
  description: string;
  label: SolutionCategory | "Interdependencia organizacional";
}

export const levels: CalculatorLevel[] = [
  {
    id: 1,
    title: "La empresa vive en la cabeza del dueño",
    summary: "La operación sigue visible y directa para quien decide.",
    description:
      "La empresa es pequeña. El dueño sabe quién vende, quién cobra, quién entrega y quién resuelve los problemas.",
    example: "Trabajan el dueño y una o dos personas más.",
    outcome: "Excel, libreta o checklist pueden bastar.",
    category: "Excel / checklist",
    band: "simple",
    signal: "Todo sigue a la vista del dueño.",
  },
  {
    id: 2,
    title: "La empresa ya tiene varias tareas, pero todavía se controla a mano",
    summary: "Ya existe más operación, pero todavía puede coordinarse sin un sistema complejo.",
    description:
      "Ya hay facturación, compras, pagos, entregas, clientes y responsabilidades repartidas, pero todo sigue siendo entendible sin un sistema complejo.",
    example:
      "Una empresa pequeña que maneja ventas, inventario y cuentas por cobrar en Excel.",
    outcome: "Excel o checklist pueden bastar.",
    category: "Excel / checklist",
    band: "simple",
    signal: "Más tareas, misma visibilidad.",
  },
  {
    id: 3,
    title: "La empresa ya necesita ordenar riesgos y controles",
    summary: "El reto principal ya es documentar, seguir y formalizar.",
    description:
      "La empresa tiene áreas, responsables, auditorías, cumplimiento o controles internos. Ya no basta solo con memoria, pero los riesgos todavía pueden analizarse por separado.",
    example:
      "Finanzas, operaciones, recursos humanos y cumplimiento registran riesgos, controles y evidencias.",
    outcome: "Un GRC tradicional puede ser suficiente.",
    category: "GRC tradicional",
    band: "transitional",
    signal: "La disciplina formal ya importa.",
  },
  {
    id: 4,
    title: "La empresa ya tiene partes conectadas entre sí",
    summary: "Aquí una falla empieza a viajar entre áreas, sistemas y operaciones.",
    description:
      "Lo que pasa en un área puede afectar otra. Un atraso de proveedor puede afectar operaciones. Una falla en un sistema puede afectar facturación.",
    example:
      "Ventas, proveedores, contratos, sistemas y controles dependen unos de otros.",
    outcome: "Aquí empieza Kiriox GRI.",
    category: "Kiriox GRI",
    band: "structural",
    signal: "Empieza la interdependencia crítica.",
  },
  {
    id: 5,
    title: "La empresa depende de terceros críticos",
    summary: "La continuidad ya no depende solo de equipos internos.",
    description:
      "La empresa trabaja con proveedores, contratistas, plataformas, bancos, aseguradoras, reguladores o aliados externos. Si uno falla, varias partes de la operación pueden sufrir.",
    example:
      "La empresa no puede operar normalmente si falla un proveedor tecnológico, logístico o financiero.",
    outcome: "GRI recomendado.",
    category: "Kiriox GRI",
    band: "structural",
    signal: "Los terceros pueden desestabilizar toda la operación.",
  },
  {
    id: 6,
    title: "La empresa ofrece múltiples servicios y ya no es fácil saber qué afecta a qué",
    summary: "La complejidad ya no está en listar, sino en mapear dependencias.",
    description:
      "La empresa maneja varios servicios, productos, contratos, clientes, sistemas y obligaciones al mismo tiempo. El problema ya no es listar riesgos, sino entender cómo se conectan.",
    example:
      "Cada servicio depende de áreas, proveedores, contratos, controles y responsables distintos.",
    outcome: "GRI necesario.",
    category: "Kiriox GRI",
    band: "structural",
    signal: "La complejidad ya es sistémica.",
  },
  {
    id: 7,
    title: "La empresa puede romperse por una falla que parecía pequeña",
    summary: "Una falla local ya puede convertirse en crisis operativa, reputacional o regulatoria.",
    description:
      "Una falla local puede convertirse en una crisis grande: un proveedor falla, un contrato se incumple, un control no funciona, un sistema se cae y el problema termina afectando dinero, reputación, auditoría, cumplimiento o continuidad operativa.",
    example:
      'Nadie puede responder con claridad: "si esto falla, ¿qué más se rompe?"',
    outcome: "GRI indispensable.",
    category: "Kiriox GRI",
    band: "structural",
    signal: "La fragilidad ya puede escalar en cascada.",
  },
];

export const summaryBands = [
  {
    range: "Niveles 1-2",
    label: "Excel / checklist",
    description:
      "Para empresas pequeñas, simples o manejables directamente por el dueño.",
  },
  {
    range: "Nivel 3",
    label: "GRC tradicional",
    description:
      "Para empresas que necesitan ordenar riesgos, controles, evidencias y cumplimiento.",
  },
  {
    range: "Niveles 4-7",
    label: "Kiriox GRI",
    description:
      "Para empresas donde los riesgos ya no están aislados, sino conectados entre áreas, proveedores, contratos, sistemas y servicios.",
  },
] as const;

export function getDiagnosticForLevel(
  levelId?: number,
): DiagnosticContent {
  if (levelId === undefined) {
    return {
      title: "Selecciona el nivel que mejor describe tu empresa.",
      description:
        "El criterio principal no es el tamaño, la nómina ni la facturación. El criterio principal es la interdependencia organizacional.",
      label: "Interdependencia organizacional",
    };
  }

  if (levelId <= 2) {
    return {
      title: "Kiriox no parece necesario todavía.",
      description:
        "En este nivel, Excel, checklist o documentos básicos todavía pueden ser suficientes. La operación sigue visible y controlable sin inteligencia estructural.",
      label: "Excel / checklist",
    };
  }

  if (levelId === 3) {
    return {
      title: "Todavía no compraría Kiriox. Primero ordenaría con un GRC.",
      description:
        "Aquí ya hace falta gestión formal de riesgos, controles y seguimiento, pero la organización todavía puede analizar muchas cosas por separado. Un GRC tradicional puede bastar.",
      label: "GRC tradicional",
    };
  }

  return {
    title: "Sí: aquí Kiriox ya tiene sentido comercial y operativo.",
    description:
      "Cuando los riesgos, proveedores, contratos, sistemas, controles y áreas empiezan a conectarse, las matrices tradicionales dejan puntos ciegos. Aquí Kiriox GRI ya aporta una diferencia clara.",
    label: "Kiriox GRI",
  };
}
