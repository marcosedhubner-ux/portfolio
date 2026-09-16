export interface DemoAccount {
  role: string;
  email: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  detail: string;
  stack: string[];
  accent: string;
  accentSoft: string;
  darkBase: string;
  why: string;
  highlightTitle: string;
  highlightBody: string;
  security: string[];
  demoAccounts: DemoAccount[];
  demoPassword: string;
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
    why: "Most restaurant-management portfolio pieces stop at a CRUD menu editor. TableFlow instead models the actual operational loop a restaurant runs on: a table moves through available → occupied → cleaning, an order moves through pending → preparing → ready → served → paid, and the two state machines are coupled — paying or cancelling an order frees the table automatically.",
    highlightTitle: "Real-time model",
    highlightBody:
      "The API is the only source of truth. Every mutation — create an order, change its status, mark an item ready — validates, applies the state-machine rule, writes to Postgres, then broadcasts a Socket.IO event. The frontend never mutates shared state optimistically; it listens for table:updated / order:updated and invalidates its query cache, so a payment rung in on one tablet shows up on the kitchen screen and the manager's dashboard in the same round trip.",
    security: [
      "Passwords hashed with bcrypt (cost factor 12); sessions are JWTs in httpOnly, sameSite=lax cookies.",
      "Every route is authenticated by default; SERVER / KITCHEN / MANAGER role checks are enforced server-side, not just hidden in the UI.",
      "All input validated with Zod at the boundary; Prisma parameterizes every query — no hand-built SQL.",
      "Rate limiting on /auth/login, helmet security headers, CORS locked to the configured web origin.",
    ],
    demoAccounts: [
      { role: "Manager", email: "manager@tableflow.dev" },
      { role: "Server", email: "server@tableflow.dev" },
      { role: "Kitchen", email: "kitchen@tableflow.dev" },
    ],
    demoPassword: "Passw0rd!123",
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
    why: "The interesting part of a booking system isn't the calendar UI — it's making sure two clients can never end up assigned to the same stylist at the same time, even when two requests race each other. This project is built around that guarantee, plus the tenant-isolation problem every scheduling SaaS has to solve on day one.",
    highlightTitle: "The conflict check",
    highlightBody:
      "Booking an appointment computes its end time from the service's duration, pulls every non-cancelled appointment that staff member has on that day, and runs each one through a pure interval-overlap function. Any overlap — full or partial — rejects the booking with a 409 naming the exact conflicting slot, before anything touches the database. The same pure function is exercised directly in a unit test, verified independently of Express, Prisma or HTTP.",
    security: [
      "Every table carries a tenantId, and every query filters by it — tenant A can never read or write tenant B's data, even with a valid-looking ID.",
      "Passwords hashed with bcrypt (cost 12); sessions are JWTs in httpOnly, sameSite=lax cookies.",
      "OWNER / ADMIN / STAFF role checks enforced in the service layer, not just the UI.",
      "Socket.IO connections join a tenant-named room only after the session cookie is verified.",
    ],
    demoAccounts: [
      { role: "Owner", email: "owner@shiftboard.dev" },
      { role: "Admin", email: "admin@shiftboard.dev" },
      { role: "Staff", email: "stylist1@shiftboard.dev" },
    ],
    demoPassword: "Passw0rd!123",
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
    why: "Most inventory demos let you PATCH a quantity field and call it done — that's how stock counts silently drift from reality. StockPilot treats quantityOnHand as a derived, cached value: the only way to change it is to record a StockMovement, written in the same transaction, so every product has a full audit trail for free.",
    highlightTitle: "Concurrency-safe stock movements",
    highlightBody:
      "Recording a movement doesn't read the current quantity, do math in JavaScript, and write it back — that pattern loses updates under concurrent requests. Instead, the floor check and the increment happen in a single atomic conditional UPDATE. If two sales race for the last unit, the database decides which one wins; the loser's update matches zero rows and the transaction returns \"insufficient stock\" without ever creating a movement for a change that didn't happen.",
    security: [
      "Passwords hashed with bcrypt (cost 12); JWT sessions in httpOnly, sameSite=lax cookies.",
      "STAFF can record movements and receive purchase orders; only ADMIN can create products, suppliers or make manual adjustments — enforced server-side regardless of what the UI shows.",
      "Zod validation uses a discriminated union so an adjustment and a sale can't be confused at the type level.",
      "Prisma parameterizes every query; rate limiting, helmet headers, locked CORS.",
    ],
    demoAccounts: [
      { role: "Admin", email: "admin@stockpilot.dev" },
      { role: "Staff", email: "staff@stockpilot.dev" },
    ],
    demoPassword: "Passw0rd!123",
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
    why: "Track expenses in a group of four for a week and you'll end up with a dozen small debts crossing each other. Naively, settling up takes one transaction per debt. SplitLedger nets those debts down to the minimum number of transfers that zero everyone out — the actual hard part of a bill-splitting app, with the CRUD around it being the easy 80%.",
    highlightTitle: "Settling debts in the fewest transactions",
    highlightBody:
      "Every balance is tracked in integer cents — money never touches a JavaScript float anywhere in this codebase. A greedy algorithm sorts members into creditors and debtors and repeatedly matches the largest creditor against the largest debtor until both sides are zero. It's a deliberate trade-off: the mathematically optimal solution is a subset-sum search, harder than polynomial in the general case, while this greedy strategy runs in O(n log n) and always fully settles the group. The test suite verifies the property that actually matters — applying the suggested settlements always brings every balance to exactly zero.",
    security: [
      "Passwords hashed with bcrypt (cost 12); JWT sessions in httpOnly, sameSite=lax cookies.",
      "Every group route checks membership server-side — a non-member gets a 403, not a 404 that would leak the group's existence.",
      "Only the person who paid an expense can delete it; only the person who owes a debt can mark it paid.",
      "Zod discriminated union for split types (equal vs. custom); Prisma parameterized queries; rate limiting; locked CORS.",
    ],
    demoAccounts: [
      { role: "Member", email: "alex@splitledger.dev" },
      { role: "Member", email: "blair@splitledger.dev" },
      { role: "Member", email: "casey@splitledger.dev" },
      { role: "Member", email: "dana@splitledger.dev" },
    ],
    demoPassword: "Passw0rd!123",
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
    why: "The obvious way to store card order is an integer column re-indexed on every drag — that works until two people drag cards in the same column at once, or the column has a few hundred cards, and now every move is an O(n) write and a race condition waiting to happen.",
    highlightTitle: "Fractional positioning with automatic rebalancing",
    highlightBody:
      "Each card gets a floating-point position; inserting between two cards is just the midpoint between their positions — an O(1) write touching exactly one row. Floating-point precision eventually runs out, so a rebalance check detects when a gap has collapsed below a threshold and re-spaces every card in that column evenly, in a single transaction, before completing the move. Card moves are optimistic on the client and roll back automatically if the API rejects them.",
    security: [
      "Passwords hashed with bcrypt (cost 12); JWT sessions in httpOnly, sameSite=lax cookies — the same token gates which Socket.IO rooms a connection can join.",
      "Every board route checks membership server-side; a non-member gets a 403 on the board and everything inside it.",
      "Only a board's OWNER can add members; any member can create columns/cards and move cards, mirroring how real teams use a shared board.",
      "Zod validation at the boundary; Prisma parameterized queries; rate limiting; locked CORS.",
    ],
    demoAccounts: [
      { role: "Member", email: "nova@flowboard.dev" },
      { role: "Member", email: "priya@flowboard.dev" },
      { role: "Member", email: "theo@flowboard.dev" },
    ],
    demoPassword: "Passw0rd!123",
  },
];

export interface SideProject {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
}

export const sideProjects: SideProject[] = [
  {
    slug: "agente-design",
    name: "Ateliê Azul",
    tagline:
      "Desktop AI design mentor (Electron) that shells out to the Claude Code CLI instead of a paid API — screen eyedropper, color wheel, and a local ONNX background remover.",
    stack: ["Electron", "Claude Code CLI", "sharp", "ONNX"],
  },
  {
    slug: "audiobook-generator",
    name: "Audiobook Generator",
    tagline:
      "Turns PDFs and text files into narrated audiobooks with neural voices, falling back to a fully offline TTS engine mid-narration if the network drops.",
    stack: ["Node.js", "Express", "Edge TTS", "Piper TTS", "ffmpeg"],
  },
  {
    slug: "mouseKeeper",
    name: "MouseKeeper",
    tagline:
      "Turns a phone into a Wi-Fi remote for the PC — touchpad with a live screen preview, a real-time keyboard, and a fully customizable on-screen gamepad.",
    stack: ["Node.js", "WebSocket", "nut-js"],
  },
];

export const githubUsername = "marcosedhubner-ux";
