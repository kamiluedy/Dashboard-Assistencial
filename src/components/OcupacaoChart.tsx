import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { OcupacaoSetor, Setor } from "../types"
import type { Tema } from "../lib/useTheme"

const CORES = {
  light: {
    normal: "#1baf7a",
    atencao: "#184f95",
    critico: "#d03b3b",
    grade: "#e5e7eb",
    eixo: "#c3c2b7",
    texto: "#6b7280",
    textoEixoY: "#374151",
    tituloTexto: "#0b0b0b",
    tooltipBg: "#ffffff",
    tooltipBorder: "#e5e7eb",
    cardBg: "bg-white",
    cardBorder: "border-[#e5e7eb]",
  },
  dark: {
    normal: "#199e70",
    atencao: "#3987e5",
    critico: "#e66767",
    grade: "#1f2937",
    eixo: "#2a2f3d",
    texto: "#8b93a7",
    textoEixoY: "#c7cdd9",
    tituloTexto: "#ffffff",
    tooltipBg: "#161a23",
    tooltipBorder: "#1f2937",
    cardBg: "bg-[#12151c]",
    cardBorder: "border-[#1f2937]",
  },
} as const

interface OcupacaoChartProps {
  dados: OcupacaoSetor[]
  setorSelecionado: Setor | null
  onSetorClick: (setor: Setor) => void
  tema: Tema
}

export function OcupacaoChart({ dados, setorSelecionado, onSetorClick, tema }: OcupacaoChartProps) {
  const c = CORES[tema]

  function corOcupacao(percentual: number) {
    if (percentual >= 90) return c.critico
    if (percentual >= 75) return c.atencao
    return c.normal
  }

  const dadosFormatados = dados.map((s) => ({
    ...s,
    percentual: Math.round((s.leitosOcupados / s.leitosTotais) * 100),
  }))

  return (
    <div className={`rounded-xl border ${c.cardBorder} ${c.cardBg} p-5 shadow-sm`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold" style={{ color: c.tituloTexto }}>
            Ocupacao por setor
          </h2>
          <p className="text-sm" style={{ color: c.texto }}>
            {setorSelecionado ? `Filtrado por ${setorSelecionado} - clique na barra para trocar` : "Clique numa barra para filtrar o setor"}
          </p>
        </div>
        {setorSelecionado && (
          <button
            onClick={() => onSetorClick(setorSelecionado)}
            className="text-xs font-medium text-[#2a78d6] hover:text-[#184f95] dark:text-[#5eb8ff] dark:hover:text-white"
          >
            Limpar
          </button>
        )}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={dadosFormatados} layout="vertical" margin={{ top: 4, right: 24, left: 8, bottom: 0 }}>
          <CartesianGrid stroke={c.grade} horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: c.texto, fontSize: 12 }}
            axisLine={{ stroke: c.eixo }}
            tickLine={false}
            unit="%"
          />
          <YAxis
            type="category"
            dataKey="setor"
            tick={{ fill: c.textoEixoY, fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            width={110}
          />
          <Tooltip
            formatter={(value, _name, item) => [
              `${value}% (${item.payload.leitosOcupados}/${item.payload.leitosTotais} leitos)`,
              "Ocupacao",
            ]}
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${c.tooltipBorder}`,
              fontSize: 13,
              backgroundColor: c.tooltipBg,
              color: c.tituloTexto,
            }}
            labelStyle={{ color: c.tituloTexto }}
          />
          <Bar
            dataKey="percentual"
            radius={[0, 4, 4, 0]}
            barSize={22}
            onClick={(entry) => onSetorClick((entry.payload as { setor: Setor }).setor)}
            cursor="pointer"
          >
            {dadosFormatados.map((s) => (
              <Cell
                key={s.setor}
                fill={corOcupacao(s.percentual)}
                opacity={setorSelecionado && setorSelecionado !== s.setor ? 0.35 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex gap-4 text-xs" style={{ color: c.texto }}>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: c.normal }} />
          Normal (&lt;75%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: c.atencao }} />
          Atencao (75-90%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: c.critico }} />
          Critico (&gt;=90%)
        </span>
      </div>
    </div>
  )
}
