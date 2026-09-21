import { Activity, Moon, Sun } from "lucide-react"
import type { Tema } from "../lib/useTheme"

interface HeaderProps {
  tema: Tema
  onAlternarTema: () => void
}

export function Header({ tema, onAlternarTema }: HeaderProps) {
  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <header className="border-b border-[#1c5cab] bg-[#2a78d6] dark:border-[#1f2937] dark:bg-[#0d0f14]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white dark:bg-[#5eb8ff]/15 dark:text-[#5eb8ff] dark:shadow-[0_0_16px_rgba(94,184,255,0.35)]">
            <Activity size={20} strokeWidth={2.2} />
          </span>
          <div>
            <h1 className="text-lg font-semibold text-white">Dashboard Assistencial</h1>
            <p className="text-sm text-white/80 dark:text-[#8b93a7]">Painel de indicadores clinicos e ocupacao hospitalar</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden text-sm capitalize text-white/80 dark:text-[#8b93a7] sm:block">{hoje}</p>
          <button
            onClick={onAlternarTema}
            aria-label={tema === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white transition hover:bg-white/25 dark:bg-white/5 dark:text-[#8b93a7] dark:hover:bg-white/10 dark:hover:text-white"
          >
            {tema === "light" ? <Moon size={18} strokeWidth={2} /> : <Sun size={18} strokeWidth={2} />}
          </button>
        </div>
      </div>
    </header>
  )
}
