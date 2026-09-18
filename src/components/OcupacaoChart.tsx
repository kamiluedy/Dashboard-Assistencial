import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { OcupacaoSetor, Setor } from "../types"

function corOcupacao(percentual: number) {
  if (percentual >= 90) return "#d03b3b"
  if (percentual >= 75) return "#184f95"
  return "#1baf7a"
}

interface OcupacaoChartProps {
  dados: OcupacaoSetor[]
  setorSelecionado: Setor | null
  onSetorClick: (setor: Setor) => void
}

export function OcupacaoChart({ dados, setorSelecionado, onSetorClick }: OcupacaoChartProps) {
  const dadosFormatados = dados.map((s) => ({
    ...s,
    percentual: Math.round((s.leitosOcupados / s.leitosTotais) * 100),
  }))

  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#0b0b0b]">Ocupacao por setor</h2>
          <p className="text-sm text-[#6b7280]">
            {setorSelecionado ? `Filtrado por ${setorSelecionado} - clique na barra para trocar` : "Clique numa barra para filtrar o setor"}
          </p>
        </div>
        {setorSelecionado && (
          <button
            onClick={() => onSetorClick(setorSelecionado)}
            className="text-xs font-medium text-[#2a78d6] hover:text-[#184f95]"
          >
            Limpar
          </button>
        )}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={dadosFormatados} layout="vertical" margin={{ top: 4, right: 24, left: 8, bottom: 0 }}>
          <CartesianGrid stroke="#e5e7eb" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#c3c2b7" }}
            tickLine={false}
            unit="%"
          />
          <YAxis
            type="category"
            dataKey="setor"
            tick={{ fill: "#374151", fontSize: 13 }}
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
              border: "1px solid #e5e7eb",
              fontSize: 13,
              backgroundColor: "#ffffff",
              color: "#0b0b0b",
            }}
            labelStyle={{ color: "#0b0b0b" }}
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
      <div className="mt-3 flex gap-4 text-xs text-[#6b7280]">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#1baf7a" }} />
          Normal (&lt;75%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#184f95" }} />
          Atencao (75-90%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#d03b3b" }} />
          Critico (&gt;=90%)
        </span>
      </div>
    </div>
  )
}
