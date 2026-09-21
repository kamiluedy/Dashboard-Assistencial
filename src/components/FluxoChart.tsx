import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { PontoFluxo } from "../lib/agregacao"
import type { Tema } from "../lib/useTheme"

const CORES = {
  light: {
    entradas: "#2a78d6",
    altas: "#1baf7a",
    retornos: "#e34948",
    grade: "#e5e7eb",
    eixo: "#c3c2b7",
    texto: "#6b7280",
    tituloTexto: "#0b0b0b",
    tooltipBg: "#ffffff",
    tooltipBorder: "#e5e7eb",
    dotStroke: "#ffffff",
    cardBg: "bg-white",
    cardBorder: "border-[#e5e7eb]",
  },
  dark: {
    entradas: "#3987e5",
    altas: "#199e70",
    retornos: "#e66767",
    grade: "#1f2937",
    eixo: "#2a2f3d",
    texto: "#8b93a7",
    tituloTexto: "#ffffff",
    tooltipBg: "#161a23",
    tooltipBorder: "#1f2937",
    dotStroke: "#161a23",
    cardBg: "bg-[#12151c]",
    cardBorder: "border-[#1f2937]",
  },
} as const

interface FluxoChartProps {
  dados: PontoFluxo[]
  titulo: string
  pontoSelecionado: string | null
  onPontoClick: (chave: string) => void
  tema: Tema
}

interface DotProps {
  cx?: number
  cy?: number
  index?: number
}

function criarDot(dados: PontoFluxo[], onPontoClick: (chave: string) => void, cor: string, stroke: string, raio: number) {
  return function Dot({ cx, cy, index }: DotProps) {
    if (cx === undefined || cy === undefined || index === undefined) return null
    const ponto = dados[index]
    return (
      <circle
        cx={cx}
        cy={cy}
        r={raio}
        fill={cor}
        stroke={stroke}
        strokeWidth={1}
        style={{ cursor: "pointer" }}
        onClick={() => ponto && onPontoClick(ponto.chave)}
      />
    )
  }
}

export function FluxoChart({ dados, titulo, pontoSelecionado, onPontoClick, tema }: FluxoChartProps) {
  const c = CORES[tema]

  const DotEntradas = criarDot(dados, onPontoClick, c.entradas, c.dotStroke, 3)
  const ActiveDotEntradas = criarDot(dados, onPontoClick, c.entradas, c.dotStroke, 5)
  const DotAltas = criarDot(dados, onPontoClick, c.altas, c.dotStroke, 3)
  const ActiveDotAltas = criarDot(dados, onPontoClick, c.altas, c.dotStroke, 5)
  const DotRetornos = criarDot(dados, onPontoClick, c.retornos, c.dotStroke, 3)
  const ActiveDotRetornos = criarDot(dados, onPontoClick, c.retornos, c.dotStroke, 5)

  return (
    <div className={`rounded-xl border ${c.cardBorder} ${c.cardBg} p-5 shadow-sm`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold" style={{ color: c.tituloTexto }}>
            Fluxo de pacientes
          </h2>
          <p className="text-sm" style={{ color: c.texto }}>
            {titulo}
            {pontoSelecionado ? " - clique num ponto para trocar" : " - clique num ponto para filtrar"}
          </p>
        </div>
        {pontoSelecionado && (
          <button
            onClick={() => onPontoClick(pontoSelecionado)}
            className="text-xs font-medium text-[#2a78d6] hover:text-[#184f95] dark:text-[#5eb8ff] dark:hover:text-white"
          >
            Limpar
          </button>
        )}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={dados} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke={c.grade} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: c.texto, fontSize: 12 }}
            axisLine={{ stroke: c.eixo }}
            tickLine={false}
          />
          <YAxis tick={{ fill: c.texto, fontSize: 12 }} axisLine={false} tickLine={false} width={32} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${c.tooltipBorder}`,
              fontSize: 13,
              backgroundColor: c.tooltipBg,
              color: c.tituloTexto,
            }}
            labelStyle={{ color: c.tituloTexto }}
          />
          <Legend iconType="line" wrapperStyle={{ fontSize: 13, color: c.texto }} />
          <Line
            type="monotone"
            dataKey="entradas"
            name="Entradas"
            stroke={c.entradas}
            strokeWidth={2}
            dot={<DotEntradas />}
            activeDot={<ActiveDotEntradas />}
          />
          <Line
            type="monotone"
            dataKey="altas"
            name="Altas"
            stroke={c.altas}
            strokeWidth={2}
            dot={<DotAltas />}
            activeDot={<ActiveDotAltas />}
          />
          <Line
            type="monotone"
            dataKey="retornos"
            name="Retornos"
            stroke={c.retornos}
            strokeWidth={2}
            dot={<DotRetornos />}
            activeDot={<ActiveDotRetornos />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
