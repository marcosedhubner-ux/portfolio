"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "pt";

const STORAGE_KEY = "site-lang";

interface UiText {
  navWork: string;
  navAbout: string;
  navContact: string;
  navBackToPortfolio: string;
  heroEyebrow: string;
  heroHeadingPre: string;
  heroHeadingEm: string;
  heroHeadingPost: string;
  heroBody: string;
  workTitle: string;
  workCount: (n: number) => string;
  caseStudy: string;
  viewCode: string;
  alsoBuiltTitle: string;
  alsoBuiltCount: (n: number) => string;
  alsoBuiltSubtitle: string;
  aboutTitle: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
  footerTitle: string;
  footerSubtitle: string;
  footerSignature: string;
  caseEyebrow: string;
  viewSourceOnGithub: string;
  whyThisExists: string;
  security: string;
  tryIt: string;
  tryItBody: (password: string) => ReactNode;
  role: string;
  email: string;
  backToAllProjects: string;
}

const ui: Record<Lang, UiText> = {
  en: {
    navWork: "Work",
    navAbout: "About",
    navContact: "Contact",
    navBackToPortfolio: "← Portfolio",
    heroEyebrow: "Marcos Hubner — Full-Stack Developer — Cachoeirinha, Brazil / Remote",
    heroHeadingPre: "I build the part",
    heroHeadingEm: "after",
    heroHeadingPost: "the CRUD.",
    heroBody:
      "Five full-stack products, each built around one problem worth solving properly — conflict-free scheduling, a concurrency-safe inventory ledger, real-time collaboration, fair debt-settlement, and a restaurant order state machine. All open source, all tested, all documented.",
    workTitle: "Selected work",
    workCount: (n: number) => `${n} projects`,
    caseStudy: "Case study",
    viewCode: "View code ↗",
    alsoBuiltTitle: "Also built",
    alsoBuiltCount: (n: number) => `${n} tools`,
    alsoBuiltSubtitle: "Smaller personal tools, built to solve one specific problem I actually had.",
    aboutTitle: "About",
    aboutP1:
      "I'm a self-taught full-stack developer with two years of hands-on production experience — from freelance landing pages to systems currently running in production for a small business, moving between frontend, backend and automation depending on what the week needs.",
    aboutP2:
      "Recent work includes a WhatsApp AI agent with audio-message processing, a system for routing messages across multiple WhatsApp instances, and Puppeteer-based scraping tools built to work around anti-bot protections. Most of what I know came from shipping real things for real clients, end to end, rather than from a classroom.",
    aboutP3:
      "The five projects on this page are what I build when nobody is waiting on a deadline: a chance to slow down on the part that usually gets skipped — the state machine, the concurrency edge case, the algorithm — and get it right.",
    footerTitle: "Open to remote roles.",
    footerSubtitle: "Based in Cachoeirinha, Brazil. Happy to work across time zones.",
    footerSignature: "Designed and built by Marcos Hubner.",
    caseEyebrow: "Case study",
    viewSourceOnGithub: "View source on GitHub ↗",
    whyThisExists: "Why this exists",
    security: "Security",
    tryIt: "Try it",
    tryItBody: (password: string) => (
      <>
        Clone the repo, run the seed script, and log in with any of the demo accounts below
        (password <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">{password}</code> for all).
      </>
    ),
    role: "Role",
    email: "Email",
    backToAllProjects: "← Back to all projects",
  },
  pt: {
    navWork: "Projetos",
    navAbout: "Sobre",
    navContact: "Contato",
    navBackToPortfolio: "← Portfólio",
    heroEyebrow: "Marcos Hubner — Desenvolvedor Full-Stack — Cachoeirinha, Brasil / Remoto",
    heroHeadingPre: "Eu construo a parte",
    heroHeadingEm: "depois",
    heroHeadingPost: "do CRUD.",
    heroBody:
      "Cinco produtos full-stack, cada um construído em torno de um problema que vale a pena resolver de verdade — agendamento sem conflitos, um ledger de estoque seguro contra concorrência, colaboração em tempo real, divisão justa de dívidas e uma máquina de estados para pedidos de restaurante. Tudo open source, tudo testado, tudo documentado.",
    workTitle: "Projetos selecionados",
    workCount: (n: number) => `${n} projetos`,
    caseStudy: "Case study",
    viewCode: "Ver código ↗",
    alsoBuiltTitle: "Também construí",
    alsoBuiltCount: (n: number) => `${n} ferramentas`,
    alsoBuiltSubtitle: "Ferramentas pessoais menores, feitas pra resolver um problema específico que eu realmente tinha.",
    aboutTitle: "Sobre",
    aboutP1:
      "Sou desenvolvedor full-stack autodidata, com dois anos de experiência prática em produção — de landing pages freelance a sistemas rodando em produção para uma pequena empresa, transitando entre frontend, backend e automação conforme a necessidade da semana.",
    aboutP2:
      "Trabalhos recentes incluem um agente de IA para WhatsApp com processamento de mensagens de áudio, um sistema de roteamento de mensagens entre várias instâncias do WhatsApp, e ferramentas de scraping com Puppeteer construídas para contornar proteções anti-bot. A maior parte do que sei veio de entregar coisas reais para clientes reais, do início ao fim, e não de uma sala de aula.",
    aboutP3:
      "Os cinco projetos nesta página são o que eu construo quando não tem ninguém esperando um prazo: uma chance de desacelerar na parte que normalmente é pulada — a máquina de estados, o caso extremo de concorrência, o algoritmo — e fazer direito.",
    footerTitle: "Aberto a vagas remotas.",
    footerSubtitle: "Baseado em Cachoeirinha, Brasil. Tranquilo pra trabalhar em qualquer fuso horário.",
    footerSignature: "Projetado e construído por Marcos Hubner.",
    caseEyebrow: "Case study",
    viewSourceOnGithub: "Ver código-fonte no GitHub ↗",
    whyThisExists: "Por que isso existe",
    security: "Segurança",
    tryIt: "Testar",
    tryItBody: (password: string) => (
      <>
        Clone o repositório, rode o script de seed e faça login com qualquer uma das contas de
        demonstração abaixo (senha <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">{password}</code> para todas).
      </>
    ),
    role: "Função",
    email: "E-mail",
    backToAllProjects: "← Voltar para todos os projetos",
  },
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: UiText;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "pt") {
      setLangState(stored);
    } else if (navigator.language?.toLowerCase().startsWith("pt")) {
      setLangState("pt");
    }
  }, []);

  function setLang(next: Lang) {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: ui[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
