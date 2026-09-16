export interface Project {
  slug: string;
  name: string;
  tagline: string;
  detail: string;
  stack: string[];
  accent: string;
  accentSoft: string;
  darkBase: string;
}

export const projects: Project[] = [
  {
    slug: "tableflow",
    name: "TableFlow",
    tagline: "Real-time floor, order and kitchen management for restaurants.",
    detail:
      "Two coupled state machines — one for tables, one for orders — so paying an order frees the table automatically. Servers, kitchen and manager screens stay in sync over Socket.IO with no polling.",
    stack: ["Next.js", "TypeScript", "Node/Express", "Socket.IO", "PostgreSQL", "Prisma"],
    accent: "#10b981",
    accentSoft: "#d1fae5",
    darkBase: "#0f172a",
  },
  {
    slug: "shiftboard",
    name: "ShiftBoard",
    tagline: "Multi-tenant staff scheduling with conflict-free booking.",
    detail:
      "Every table, query and real-time event is scoped to a tenantId, enforced server-side — one business can never read another's data. Booking a slot runs an interval-overlap check before it's allowed to save.",
    stack: ["Next.js", "TypeScript", "Node/Express", "Socket.IO", "PostgreSQL", "Prisma"],
    accent: "#6366f1",
    accentSoft: "#e0e7ff",
    darkBase: "#1e1b4b",
  },
  {
    slug: "stockpilot",
    name: "StockPilot",
    tagline: "Ledger-based inventory — never a raw quantity field.",
    detail:
      "Stock levels are derived from an append-only movement ledger, updated with a single atomic conditional UPDATE. Two sales can race for the last unit and the database decides the winner — not application code.",
    stack: ["Next.js", "TypeScript", "Node/Express", "PostgreSQL", "Prisma"],
    accent: "#d97706",
    accentSoft: "#fef3c7",
    darkBase: "#0f172a",
  },
  {
    slug: "splitledger",
    name: "SplitLedger",
    tagline: "Group expenses that settle in the fewest transfers.",
    detail:
      "A greedy largest-creditor/largest-debtor algorithm nets a tangle of IOUs down to the minimum number of payments. All money math runs in integer cents — never a floating-point dollar amount.",
    stack: ["Next.js", "TypeScript", "Node/Express", "Socket.IO", "PostgreSQL", "Prisma"],
    accent: "#0d9488",
    accentSoft: "#ccfbf1",
    darkBase: "#042f2e",
  },
  {
    slug: "flowboard",
    name: "FlowBoard",
    tagline: "Real-time collaborative Kanban with live presence.",
    detail:
      "Cards use fractional positioning, so reordering is a single-row write instead of renumbering a column, with automatic rebalancing when precision runs out. Moves are optimistic on the client and reconciled with the server.",
    stack: ["Next.js", "TypeScript", "Node/Express", "Socket.IO", "PostgreSQL", "Prisma"],
    accent: "#7c3aed",
    accentSoft: "#ede9fe",
    darkBase: "#1e1033",
  },
];

export const githubUsername = "marcosedhubner-ux";
