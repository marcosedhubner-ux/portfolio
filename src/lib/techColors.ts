const TECH_COLORS: Record<string, string> = {
  "Next.js": "#e5e7eb",
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  "React & Next.js": "#61dafb",
  "Node/Express": "#3c873a",
  "Node.js": "#3c873a",
  Express: "#a1a1aa",
  "Socket.IO": "#8b8b8b",
  PostgreSQL: "#4d92c8",
  Prisma: "#5a67d8",
  Electron: "#47848f",
  "Claude Code CLI": "#d97757",
  sharp: "#e6524b",
  ONNX: "#3b82f6",
  "Edge TTS": "#0078d7",
  "Piper TTS": "#a78bfa",
  ffmpeg: "#2c9c3f",
  WebSocket: "#a855f7",
  "nut-js": "#f472b6",
};

export function techColor(tech: string, fallback: string): string {
  return TECH_COLORS[tech] ?? fallback;
}
