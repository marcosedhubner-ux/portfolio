export interface DemoAccount {
  role: string;
  email: string;
}

export interface Screen {
  label: string;
  file: string;
  path: string;
}

export interface ProjectTranslation {
  tagline: string;
  detail: string;
  why: string;
  highlightTitle: string;
  highlightBody: string;
  security: string[];
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
  screens: Screen[];
  pt: ProjectTranslation;
}

export const projects: Project[] = [
  {
    slug: "tableflow",
    name: "The Pass",
    tagline: "Table and kitchen status share one brain — pay the check and the table's free before the busser even gets there.",
    detail:
      "Two coupled state machines — one for tables, one for orders — so paying an order frees the table automatically. Servers, kitchen and manager screens stay in sync over Socket.IO with no polling.",
    stack: ["Next.js", "TypeScript", "Node/Express", "Socket.IO", "PostgreSQL", "Prisma"],
    accent: "#ff5a3c",
    accentSoft: "#ffe4d9",
    darkBase: "#151312",
    why: "Most restaurant-management portfolio pieces stop at a CRUD menu editor. The Pass instead models the actual operational loop a restaurant runs on: a table moves through available → occupied → cleaning, an order moves through pending → preparing → ready → served → paid, and the two state machines are coupled — paying or cancelling an order frees the table automatically.",
    highlightTitle: "Real-time model",
    highlightBody:
      "The API is the only source of truth. Every mutation — create an order, change its status, mark an item ready — validates, applies the state-machine rule, writes to Postgres, then broadcasts a Socket.IO event. The frontend never mutates shared state optimistically; it listens for table:updated / order:updated and invalidates its query cache, so a payment rung in on one tablet shows up on the kitchen screen and the manager's dashboard in the same round trip.",
    security: [
      "Passwords hashed with bcrypt (cost factor 12); sessions are JWTs in httpOnly, sameSite=lax cookies.",
      "Every route is authenticated by default; SERVER / KITCHEN / MANAGER role checks are enforced server-side, not just hidden in the UI.",
      "All input validated with Zod at the boundary; Prisma parameterizes every query — no hand-built SQL.",
      "Rate limiting on /auth/login, helmet security headers, CORS locked to the configured web origin.",
    ],
    pt: {
      tagline:
        "Status da mesa e da cozinha compartilham o mesmo cérebro — paga a conta e a mesa fica livre antes até do garçom perceber.",
      detail:
        "Duas máquinas de estado acopladas — uma para mesas, outra para pedidos — então pagar um pedido libera a mesa automaticamente. Telas de garçom, cozinha e gerente ficam sincronizadas via Socket.IO, sem polling.",
      why: "A maioria dos projetos de portfólio de gestão de restaurante para num editor de cardápio CRUD. O The Pass modela o ciclo operacional de verdade que um restaurante roda: uma mesa passa por disponível → ocupada → limpeza, um pedido passa por pendente → preparando → pronto → servido → pago, e as duas máquinas de estado são acopladas — pagar ou cancelar um pedido libera a mesa automaticamente.",
      highlightTitle: "Modelo em tempo real",
      highlightBody:
        "A API é a única fonte de verdade. Toda mutação — criar um pedido, mudar seu status, marcar um item como pronto — valida, aplica a regra da máquina de estados, grava no Postgres e depois emite um evento via Socket.IO. O frontend nunca muta o estado compartilhado de forma otimista; ele escuta table:updated / order:updated e invalida o cache de consulta, então um pagamento registrado num tablet aparece na tela da cozinha e no dashboard do gerente na mesma rodada.",
      security: [
        "Senhas com hash via bcrypt (fator de custo 12); sessões são JWTs em cookies httpOnly, sameSite=lax.",
        "Toda rota é autenticada por padrão; as checagens de papel SERVER / KITCHEN / MANAGER são aplicadas no servidor, não só escondidas na interface.",
        "Toda entrada é validada com Zod na borda; o Prisma parametriza cada query — nenhum SQL feito à mão.",
        "Rate limiting em /auth/login, headers de segurança do helmet, CORS travado na origem configurada do frontend.",
      ],
    },
    demoAccounts: [
      { role: "Manager", email: "manager@tableflow.dev" },
      { role: "Server", email: "server@tableflow.dev" },
      { role: "Kitchen", email: "kitchen@tableflow.dev" },
    ],
    demoPassword: "Passw0rd!123",
    screens: [
      { label: "Sign in", file: "1-login.jpg", path: "thepass.app/login" },
      { label: "Floor", file: "2-floor.jpg", path: "thepass.app/floor" },
      { label: "Kitchen", file: "3-kitchen.jpg", path: "thepass.app/kitchen" },
      { label: "Dashboard", file: "4-dashboard.jpg", path: "thepass.app/dashboard" },
    ],
  },
  {
    slug: "shiftboard",
    name: "Roster",
    tagline: "Staff scheduling that refuses to double-book someone, even when two requests land in the same second.",
    detail:
      "Every table, query and real-time event is scoped to a tenantId, enforced server-side — one business can never read another's data. Booking a slot runs an interval-overlap check before it's allowed to save.",
    stack: ["Next.js", "TypeScript", "Node/Express", "Socket.IO", "PostgreSQL", "Prisma"],
    accent: "#c9a15a",
    accentSoft: "#f3e7d0",
    darkBase: "#12151b",
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
    pt: {
      tagline:
        "Agendamento de equipe que se recusa a marcar duas pessoas no mesmo horário, mesmo quando dois pedidos chegam no mesmo segundo.",
      detail:
        "Cada tabela, query e evento em tempo real é isolado por um tenantId, aplicado no servidor — uma empresa nunca consegue ler os dados de outra. Reservar um horário roda uma checagem de sobreposição de intervalo antes de permitir salvar.",
      why: "A parte interessante de um sistema de agendamento não é a UI do calendário — é garantir que dois clientes nunca acabem marcados com o mesmo profissional no mesmo horário, mesmo quando duas requisições competem entre si. Este projeto foi construído em torno dessa garantia, além do problema de isolamento por tenant que todo SaaS de agendamento precisa resolver desde o primeiro dia.",
      highlightTitle: "A checagem de conflito",
      highlightBody:
        "Agendar um horário calcula o horário de término a partir da duração do serviço, busca todos os agendamentos não cancelados daquele profissional no dia, e roda cada um através de uma função pura de sobreposição de intervalos. Qualquer sobreposição — total ou parcial — rejeita o agendamento com um 409 nomeando o horário exato em conflito, antes mesmo de tocar no banco de dados. Essa mesma função pura é testada diretamente num teste unitário, verificada de forma independente do Express, Prisma ou HTTP.",
      security: [
        "Toda tabela carrega um tenantId, e toda query filtra por ele — o tenant A nunca consegue ler ou escrever os dados do tenant B, mesmo com um ID que pareça válido.",
        "Senhas com hash via bcrypt (custo 12); sessões são JWTs em cookies httpOnly, sameSite=lax.",
        "Checagens de papel OWNER / ADMIN / STAFF aplicadas na camada de serviço, não só na interface.",
        "Conexões Socket.IO só entram numa sala nomeada pelo tenant depois que o cookie de sessão é verificado.",
      ],
    },
    demoAccounts: [
      { role: "Owner", email: "owner@shiftboard.dev" },
      { role: "Admin", email: "admin@shiftboard.dev" },
      { role: "Staff", email: "stylist1@shiftboard.dev" },
    ],
    demoPassword: "Passw0rd!123",
    screens: [
      { label: "Sign in", file: "1-login.jpg", path: "roster.app/login" },
      { label: "Schedule", file: "2-schedule.jpg", path: "roster.app/schedule" },
      { label: "Team", file: "3-staff.jpg", path: "roster.app/staff" },
      { label: "Dashboard", file: "4-dashboard.jpg", path: "roster.app/dashboard" },
    ],
  },
  {
    slug: "stockpilot",
    name: "Onhand",
    tagline: "Inventory that keeps receipts: every count is rebuilt from a movement ledger, not a number you can just overwrite.",
    detail:
      "Stock levels are derived from an append-only movement ledger, updated with a single atomic conditional UPDATE. Two sales can race for the last unit and the database decides the winner — not application code.",
    stack: ["Next.js", "TypeScript", "Node/Express", "PostgreSQL", "Prisma"],
    accent: "#3aa0ff",
    accentSoft: "#d8ecff",
    darkBase: "#0e1216",
    why: "Most inventory demos let you PATCH a quantity field and call it done — that's how stock counts silently drift from reality. Onhand treats quantityOnHand as a derived, cached value: the only way to change it is to record a StockMovement, written in the same transaction, so every product has a full audit trail for free.",
    highlightTitle: "Concurrency-safe stock movements",
    highlightBody:
      "Recording a movement doesn't read the current quantity, do math in JavaScript, and write it back — that pattern loses updates under concurrent requests. Instead, the floor check and the increment happen in a single atomic conditional UPDATE. If two sales race for the last unit, the database decides which one wins; the loser's update matches zero rows and the transaction returns \"insufficient stock\" without ever creating a movement for a change that didn't happen.",
    security: [
      "Passwords hashed with bcrypt (cost 12); JWT sessions in httpOnly, sameSite=lax cookies.",
      "STAFF can record movements and receive purchase orders; only ADMIN can create products, suppliers or make manual adjustments — enforced server-side regardless of what the UI shows.",
      "Zod validation uses a discriminated union so an adjustment and a sale can't be confused at the type level.",
      "Prisma parameterizes every query; rate limiting, helmet headers, locked CORS.",
    ],
    pt: {
      tagline:
        "Estoque que guarda os recibos: cada contagem é reconstruída a partir de um ledger de movimentações, nunca um número que dá pra simplesmente sobrescrever.",
      detail:
        "Os níveis de estoque são derivados de um ledger de movimentações somente-inserção, atualizado com um único UPDATE atômico condicional. Duas vendas podem competir pela última unidade e o banco de dados decide o vencedor — não o código da aplicação.",
      why: "A maioria das demos de estoque deixa você fazer PATCH direto num campo de quantidade e chamar de pronto — é assim que a contagem de estoque vai silenciosamente se distanciando da realidade. O Onhand trata quantityOnHand como um valor derivado e em cache: a única forma de mudá-lo é registrar um StockMovement, escrito na mesma transação, então todo produto tem uma trilha de auditoria completa de graça.",
      highlightTitle: "Movimentações de estoque seguras contra concorrência",
      highlightBody:
        'Registrar uma movimentação não lê a quantidade atual, faz a conta em JavaScript e escreve de volta — esse padrão perde atualizações sob requisições concorrentes. Em vez disso, a checagem de piso e o incremento acontecem num único UPDATE atômico condicional. Se duas vendas competem pela última unidade, o banco de dados decide qual vence; a atualização da perdedora afeta zero linhas e a transação retorna "estoque insuficiente" sem nunca criar uma movimentação para uma mudança que não aconteceu.',
      security: [
        "Senhas com hash via bcrypt (custo 12); sessões JWT em cookies httpOnly, sameSite=lax.",
        "STAFF pode registrar movimentações e receber pedidos de compra; só ADMIN pode criar produtos, fornecedores ou fazer ajustes manuais — aplicado no servidor, independente do que a interface mostra.",
        "A validação com Zod usa uma união discriminada para que um ajuste e uma venda não possam ser confundidos nem no nível de tipo.",
        "O Prisma parametriza cada query; rate limiting, headers do helmet, CORS travado.",
      ],
    },
    demoAccounts: [
      { role: "Admin", email: "admin@stockpilot.dev" },
      { role: "Staff", email: "staff@stockpilot.dev" },
    ],
    demoPassword: "Passw0rd!123",
    screens: [
      { label: "Sign in", file: "1-login.jpg", path: "onhand.app/login" },
      { label: "Products", file: "2-products.jpg", path: "onhand.app/products" },
      { label: "Purchase orders", file: "3-purchase-orders.jpg", path: "onhand.app/purchase-orders" },
      { label: "Dashboard", file: "4-dashboard.jpg", path: "onhand.app/dashboard" },
    ],
  },
  {
    slug: "splitledger",
    name: "Tab",
    tagline: "Untangles a week of shared dinners into the fewest payments that make everyone even.",
    detail:
      "A greedy largest-creditor/largest-debtor algorithm nets a tangle of IOUs down to the minimum number of payments. All money math runs in integer cents — never a floating-point dollar amount.",
    stack: ["Next.js", "TypeScript", "Node/Express", "Socket.IO", "PostgreSQL", "Prisma"],
    accent: "#d9603f",
    accentSoft: "#fbe4da",
    darkBase: "#241f1a",
    why: "Track expenses in a group of four for a week and you'll end up with a dozen small debts crossing each other. Naively, settling up takes one transaction per debt. Tab nets those debts down to the minimum number of transfers that zero everyone out — the actual hard part of a bill-splitting app, with the CRUD around it being the easy 80%.",
    highlightTitle: "Settling debts in the fewest transactions",
    highlightBody:
      "Every balance is tracked in integer cents — money never touches a JavaScript float anywhere in this codebase. A greedy algorithm sorts members into creditors and debtors and repeatedly matches the largest creditor against the largest debtor until both sides are zero. It's a deliberate trade-off: the mathematically optimal solution is a subset-sum search, harder than polynomial in the general case, while this greedy strategy runs in O(n log n) and always fully settles the group. The test suite verifies the property that actually matters — applying the suggested settlements always brings every balance to exactly zero.",
    security: [
      "Passwords hashed with bcrypt (cost 12); JWT sessions in httpOnly, sameSite=lax cookies.",
      "Every group route checks membership server-side — a non-member gets a 403, not a 404 that would leak the group's existence.",
      "Only the person who paid an expense can delete it; only the person who owes a debt can mark it paid.",
      "Zod discriminated union for split types (equal vs. custom); Prisma parameterized queries; rate limiting; locked CORS.",
    ],
    pt: {
      tagline: "Desembaraça uma semana de jantares em grupo no menor número possível de pagamentos.",
      detail:
        "Um algoritmo guloso de maior-credor/maior-devedor reduz um emaranhado de dívidas ao número mínimo de pagamentos. Toda a matemática do dinheiro roda em centavos inteiros — nunca um valor em ponto flutuante.",
      why: "Registre despesas num grupo de quatro pessoas por uma semana e você vai acabar com uma dúzia de pequenas dívidas cruzando umas com as outras. Ingenuamente, acertar as contas custaria uma transação por dívida. O Tab reduz essas dívidas ao número mínimo de transferências que zera todo mundo — a parte de verdade difícil de um app de divisão de contas, sendo o CRUD ao redor os 80% fáceis.",
      highlightTitle: "Acertando dívidas no menor número de transações",
      highlightBody:
        "Todo saldo é rastreado em centavos inteiros — dinheiro nunca toca um float do JavaScript em nenhum lugar desse código. Um algoritmo guloso separa os membros entre credores e devedores e repetidamente casa o maior credor com o maior devedor até os dois lados zerarem. É uma escolha deliberada: a solução matematicamente ótima é uma busca de soma de subconjuntos, mais que polinomial no caso geral, enquanto essa estratégia gulosa roda em O(n log n) e sempre acerta o grupo por completo. A suíte de testes verifica a propriedade que realmente importa — aplicar os acertos sugeridos sempre leva todo saldo a exatamente zero.",
      security: [
        "Senhas com hash via bcrypt (custo 12); sessões JWT em cookies httpOnly, sameSite=lax.",
        "Toda rota de grupo checa a associação no servidor — quem não é membro recebe um 403, não um 404 que vazaria a existência do grupo.",
        "Só quem pagou uma despesa pode excluí-la; só quem deve pode marcar a dívida como paga.",
        "União discriminada do Zod para tipos de divisão (igual vs. personalizada); queries parametrizadas pelo Prisma; rate limiting; CORS travado.",
      ],
    },
    demoAccounts: [
      { role: "Member", email: "alex@splitledger.dev" },
      { role: "Member", email: "blair@splitledger.dev" },
      { role: "Member", email: "casey@splitledger.dev" },
      { role: "Member", email: "dana@splitledger.dev" },
    ],
    demoPassword: "Passw0rd!123",
    screens: [
      { label: "Sign in", file: "1-login.jpg", path: "tab.app/login" },
      { label: "Groups", file: "2-groups.jpg", path: "tab.app/groups" },
      { label: "Balances", file: "3-group-detail.jpg", path: "tab.app/groups/lisbon-trip" },
      { label: "New expense", file: "4-add-expense.jpg", path: "tab.app/groups/lisbon-trip" },
    ],
  },
  {
    slug: "flowboard",
    name: "Corkboard",
    tagline: "Drag a card and everyone watching the board sees it move in the same second — no refresh, no merge conflicts.",
    detail:
      "Cards use fractional positioning, so reordering is a single-row write instead of renumbering a column, with automatic rebalancing when precision runs out. Moves are optimistic on the client and reconciled with the server.",
    stack: ["Next.js", "TypeScript", "Node/Express", "Socket.IO", "PostgreSQL", "Prisma"],
    accent: "#2f7a4d",
    accentSoft: "#dcefe1",
    darkBase: "#2a231a",
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
    pt: {
      tagline:
        "Arraste um cartão e todo mundo olhando o quadro vê ele se mover no mesmo segundo — sem atualizar a página, sem conflito de merge.",
      detail:
        "Os cartões usam posicionamento fracionário, então reordenar é uma única escrita de linha em vez de renumerar uma coluna inteira, com rebalanceamento automático quando a precisão se esgota. Os movimentos são otimistas no cliente e reconciliados com o servidor.",
      why: "A forma óbvia de guardar a ordem dos cartões é uma coluna inteira reindexada a cada arrasto — isso funciona até duas pessoas arrastarem cartões na mesma coluna ao mesmo tempo, ou a coluna ter algumas centenas de cartões, e aí cada movimento vira uma escrita O(n) e uma condição de corrida esperando pra acontecer.",
      highlightTitle: "Posicionamento fracionário com rebalanceamento automático",
      highlightBody:
        "Cada cartão recebe uma posição em ponto flutuante; inserir entre dois cartões é só o ponto médio entre suas posições — uma escrita O(1) tocando exatamente uma linha. A precisão do ponto flutuante eventualmente se esgota, então uma checagem de rebalanceamento detecta quando um espaço colapsou abaixo de um limite e reespaça todos os cartões daquela coluna uniformemente, numa única transação, antes de completar o movimento. Os movimentos de cartão são otimistas no cliente e revertem automaticamente se a API os rejeitar.",
      security: [
        "Senhas com hash via bcrypt (custo 12); sessões JWT em cookies httpOnly, sameSite=lax — o mesmo token controla quais salas do Socket.IO uma conexão pode entrar.",
        "Toda rota de quadro checa a associação no servidor; quem não é membro recebe um 403 no quadro e em tudo dentro dele.",
        "Só o OWNER de um quadro pode adicionar membros; qualquer membro pode criar colunas/cartões e mover cartões, espelhando como times de verdade usam um quadro compartilhado.",
        "Validação com Zod na borda; queries parametrizadas pelo Prisma; rate limiting; CORS travado.",
      ],
    },
    demoAccounts: [
      { role: "Member", email: "nova@flowboard.dev" },
      { role: "Member", email: "priya@flowboard.dev" },
      { role: "Member", email: "theo@flowboard.dev" },
    ],
    demoPassword: "Passw0rd!123",
    screens: [
      { label: "Sign in", file: "1-login.jpg", path: "corkboard.app/login" },
      { label: "Board", file: "2-board.jpg", path: "corkboard.app/boards/product-launch" },
    ],
  },
];

export interface SideProject {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  taglinePt: string;
}

export const sideProjects: SideProject[] = [
  {
    slug: "agente-design",
    name: "DesignMentor",
    tagline:
      "Desktop AI design mentor (Electron) that shells out to the Claude Code CLI instead of a paid API — screen eyedropper, color wheel, and a local ONNX background remover.",
    taglinePt:
      "Mentor de design com IA para desktop (Electron) que aciona a CLI do Claude Code em vez de uma API paga — conta-gotas de tela, roda de cores e um removedor de fundo local com ONNX.",
    stack: ["Electron", "Claude Code CLI", "sharp", "ONNX"],
  },
  {
    slug: "audiobook-generator",
    name: "Audiobook Generator",
    tagline:
      "Turns PDFs and text files into narrated audiobooks with neural voices, falling back to a fully offline TTS engine mid-narration if the network drops.",
    taglinePt:
      "Transforma PDFs e arquivos de texto em audiobooks narrados com vozes neurais, caindo para um motor de TTS totalmente offline no meio da narração se a internet cair.",
    stack: ["Node.js", "Express", "Edge TTS", "Piper TTS", "ffmpeg"],
  },
  {
    slug: "mouseKeeper",
    name: "MouseKeeper",
    tagline:
      "Turns a phone into a Wi-Fi remote for the PC — touchpad with a live screen preview, a real-time keyboard, and a fully customizable on-screen gamepad.",
    taglinePt:
      "Transforma um celular num controle remoto Wi-Fi para o PC — touchpad com preview da tela ao vivo, teclado em tempo real e um gamepad na tela totalmente personalizável.",
    stack: ["Node.js", "WebSocket", "nut-js"],
  },
];

export const githubUsername = "marcosedhubner-ux";
