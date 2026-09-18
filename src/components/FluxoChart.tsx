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

const COLOR_ENTRADAS = "#2a78d6"
const COLOR_ALTAS = "#1baf7a"
const COLOR_RETORNOS = "#e34948"

interface FluxoChartProps {
  dados: PontoFluxo[]
  titulo: string
  pontoSelecionado: string | null
  onPontoClick: (chave: string) => void
}

interface DotProps {
  cx?: number
  cy?: number
  index?: number
}

function criarDot(dados: PontoFluxo[], onPontoClick: (chave: string) => void, cor: string, raio: number) {
  return function Dot({ cx, cy, index }: DotProps) {
    if (cx === undefined || cy === undefined || index === undefined) return null
    const ponto = dados[index]
    return (
      <circle
        cx={cx}
        cy={cy}
        r={raio}
        fill={cor}
        stroke="#ffffff"
        strokeWidth={1}
        style={{ cursor: "pointer" }}
        onClick={() => ponto && onPontoClick(ponto.chave)}
      />
    )
  }
}

export function FluxoChart({ dados, titulo, pontoSelecionado, onPontoClick }: FluxoChartProps) {
  const DotEntradas = criarDot(dados, onPontoClick, COLOR_ENTRADAS, 3)
  const ActiveDotEntradas = criarDot(dados, onPontoClick, COLOR_ENTRADAS, 5)
  const DotAltas = criarDot(dados, onPontoClick, COLOR_ALTAS, 3)
  const ActiveDotAltas = criarDot(dados, onPontoClick, COLOR_ALTAS, 5)
  const DotRetornos = criarDot(dados, onPontoClick, COLOR_RETORNOS, 3)
  const ActiveDotRetornos = criarDot(dados, onPontoClick, COLOR_RETORNOS, 5)

  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#0b0b0b]">Fluxo de pacientes</h2>
          <p className="text-sm text-[#6b7280]">
            {titulo}
            {pontoSelecionado ? " - clique num ponto para trocar" : " - clique num ponto para filtrar"}
          </p>
        </div>
        {pontoSelecionado && (
          <button
            onClick={() => onPontoClick(pontoSelecionado)}
            className="text-xs font-medium text-[#2a78d6] hover:text-[#184f95]"
          >
            Limpar
          </button>
        )}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={dados} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#c3c2b7" }}
            tickLine={false}
          />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} width={32} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              fontSize: 13,
              backgroundColor: "#ffffff",
              color: "#0b0b0b",
            }}
            labelStyle={{ color: "#0b0b0b" }}
          />
          <Legend iconType="line" wrapperStyle={{ fontSize: 13, color: "#6b7280" }} />
          <Line
            type="monotone"
            dataKey="entradas"
            name="Entradas"
            stroke={COLOR_ENTRADAS}
            strokeWidth={2}
            dot={<DotEntradas />}
            activeDot={<ActiveDotEntradas />}
          />
          <Line
            type="monotone"
            dataKey="altas"
            name="Altas"
            stroke={COLOR_ALTAS}
            strokeWidth={2}
            dot={<DotAltas />}
            activeDot={<ActiveDotAltas />}
          />
          <Line
            type="monotone"
            dataKey="retornos"
            name="Retornos"
            stroke={COLOR_RETORNOS}
            strokeWidth={2}
            dot={<DotRetornos />}
            activeDot={<ActiveDotRetornos />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
