import { useMemo, useState } from "react"
import { Baby, LogIn, LogOut, RotateCcw, Stethoscope, Users } from "lucide-react"
import { Header } from "./components/Header"
import { KpiCard } from "./components/KpiCard"
import { FluxoChart } from "./components/FluxoChart"
import { OcupacaoChart } from "./components/OcupacaoChart"
import { PacientesTable } from "./components/PacientesTable"
import { PeriodoFiltro } from "./components/PeriodoFiltro"
import { fluxoDiario, ocupacaoSetores, pacientes } from "./data/mockData"
import { calcularKpis, calcularOcupacaoTotal } from "./lib/metrics"
import { anosDisponiveis, filtrarFluxoPorPeriodo, filtrarPacientesPorPeriodo, MESES } from "./lib/filters"
import { agregarFluxo } from "./lib/agregacao"
import { useTheme } from "./lib/useTheme"
import type { Setor } from "./types"

function App() {
  const { tema, alternarTema } = useTheme()
  const anos = useMemo(() => anosDisponiveis(fluxoDiario), [])
  const [ano, setAno] = useState<number | "todos">(anos[0] ?? "todos")
  const [mes, setMes] = useState<number | "todos">("todos")
  const [setorSelecionado, setSetorSelecionado] = useState<Setor | null>(null)
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null)

  const fluxoFiltrado = useMemo(() => filtrarFluxoPorPeriodo(fluxoDiario, ano, mes), [ano, mes])
  const pacientesPorPeriodo = useMemo(() => filtrarPacientesPorPeriodo(pacientes, ano, mes), [ano, mes])
  const pacientesFiltrados = useMemo(() => {
    let resultado = pacientesPorPeriodo
    if (setorSelecionado) resultado = resultado.filter((p) => p.setor === setorSelecionado)
    if (diaSelecionado) resultado = resultado.filter((p) => p.dataEntrada === diaSelecionado)
    return resultado
  }, [pacientesPorPeriodo, setorSelecionado, diaSelecionado])
  const pontosFluxo = useMemo(() => agregarFluxo(fluxoFiltrado, mes), [fluxoFiltrado, mes])

  const kpis = calcularKpis(pacientesFiltrados, fluxoFiltrado)
  const ocupacaoTotal = calcularOcupacaoTotal(ocupacaoSetores)
  const maternidade = ocupacaoSetores.find((s) => s.setor === "Maternidade")

  const tituloPeriodo = [mes !== "todos" ? MESES[mes - 1] : null, ano !== "todos" ? ano : null]
    .filter(Boolean)
    .join(" de ") || "Todo o periodo"

  function handleSetorClick(setor: Setor) {
    setSetorSelecionado((atual) => (atual === setor ? null : setor))
  }

  function handlePontoFluxoClick(chave: string) {
    const partes = chave.split("-")
    if (partes.length === 2) {
      // ponto agregado por mes: "YYYY-MM" -> ajusta os filtros de periodo
      const [anoChave, mesChave] = partes
      setAno(Number(anoChave))
      setMes(Number(mesChave))
      setDiaSelecionado(null)
    } else {
      // ponto diario: "YYYY-MM-DD" -> filtra pelo dia exato
      setDiaSelecionado((atual) => (atual === chave ? null : chave))
    }
  }

  function formatarDiaBr(iso: string) {
    const [anoStr, mesStr, diaStr] = iso.split("-")
    return `${diaStr}/${mesStr}/${anoStr}`
  }

  return (
    <div className="min-h-screen bg-[#eef0f3] dark:bg-[#0a0c10]">
      <Header tema={tema} onAlternarTema={alternarTema} />

      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-4">
          <PeriodoFiltro ano={ano} mes={mes} anos={anos} onAnoChange={setAno} onMesChange={setMes} />
        </div>

        {(setorSelecionado || diaSelecionado) && (
          <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-[#c7dcf5] bg-[#eaf2fc] px-4 py-2 text-sm text-[#184f95] dark:border-[#1f2937] dark:bg-[#12151c] dark:text-[#5eb8ff]">
            {setorSelecionado && (
              <span>
                Setor: <strong>{setorSelecionado}</strong>
              </span>
            )}
            {diaSelecionado && (
              <span>
                Dia: <strong>{formatarDiaBr(diaSelecionado)}</strong>
              </span>
            )}
            <button
              onClick={() => {
                setSetorSelecionado(null)
                setDiaSelecionado(null)
              }}
              className="ml-auto text-xs font-medium text-[#2a78d6] hover:text-[#184f95] dark:text-[#5eb8ff] dark:hover:text-white"
            >
              Remover filtros
            </button>
          </div>
        )}

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <KpiCard
            label="Internados"
            value={String(kpis.internados)}
            icon={Users}
          />
          <KpiCard
            label="Maternidade"
            value={maternidade ? `${maternidade.leitosOcupados}/${maternidade.leitosTotais}` : "-"}
            icon={Baby}
          />
          <KpiCard
            label="Altas"
            value={String(kpis.altas)}
            icon={LogOut}
          />
          <KpiCard
            label="Taxa retorno"
            value={`${kpis.taxaRetorno.toFixed(1)}%`}
            icon={RotateCcw}
          />
          <KpiCard
            label="Entradas"
            value={String(kpis.entradasPeriodo)}
            icon={LogIn}
          />
          <KpiCard
            label="Ocupacao"
            value={`${ocupacaoTotal.percentual.toFixed(0)}%`}
            icon={Stethoscope}
          />
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FluxoChart
            dados={pontosFluxo}
            titulo={tituloPeriodo}
            pontoSelecionado={mes === "todos" ? null : diaSelecionado}
            onPontoClick={handlePontoFluxoClick}
            tema={tema}
          />
          <OcupacaoChart
            dados={ocupacaoSetores}
            setorSelecionado={setorSelecionado}
            onSetorClick={handleSetorClick}
            tema={tema}
          />
        </section>

        <section className="mt-4">
          <PacientesTable pacientes={pacientesFiltrados} />
        </section>
      </main>

      <footer className="border-t border-[#dbe1ea] py-4 text-center text-xs text-[#8792a3] dark:border-[#1f2937] dark:text-[#565d70]">
        Dashboard Assistencial - dados de demonstracao
      </footer>
    </div>
  )
}

export default App
