import { Calendar } from "lucide-react"
import { MESES } from "../lib/filters"

interface PeriodoFiltroProps {
  ano: number | "todos"
  mes: number | "todos"
  anos: number[]
  onAnoChange: (ano: number | "todos") => void
  onMesChange: (mes: number | "todos") => void
}

const selectClass =
  "appearance-none rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 pr-8 text-sm text-[#0b0b0b] outline-none focus:border-[#2a78d6] dark:border-[#1f2937] dark:bg-[#161a23] dark:text-white dark:focus:border-[#5eb8ff]"

export function PeriodoFiltro({ ano, mes, anos, onAnoChange, onMesChange }: PeriodoFiltroProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 shadow-sm dark:border-[#1f2937] dark:bg-[#12151c]">
      <span className="flex items-center gap-2 text-sm font-medium text-[#6b7280] dark:text-[#8b93a7]">
        <Calendar size={16} />
        Periodo
      </span>

      <div className="relative">
        <select
          className={selectClass}
          value={mes}
          onChange={(e) => onMesChange(e.target.value === "todos" ? "todos" : Number(e.target.value))}
        >
          <option value="todos">Todos os meses</option>
          {MESES.map((nome, index) => (
            <option key={nome} value={index + 1}>
              {nome}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <select
          className={selectClass}
          value={ano}
          onChange={(e) => onAnoChange(e.target.value === "todos" ? "todos" : Number(e.target.value))}
        >
          <option value="todos">Todos os anos</option>
          {anos.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {(ano !== "todos" || mes !== "todos") && (
        <button
          onClick={() => {
            onAnoChange("todos")
            onMesChange("todos")
          }}
          className="ml-auto text-xs font-medium text-[#2a78d6] hover:text-[#184f95] dark:text-[#5eb8ff] dark:hover:text-white"
        >
          Limpar filtros
        </button>
      )}
    </div>
  )
}
