import type { Paciente, StatusPaciente } from "../types"

const statusStyle: Record<StatusPaciente, string> = {
  Internado: "bg-[#2a78d61a] text-[#184f95] dark:bg-[#5eb8ff]/10 dark:text-[#5eb8ff]",
  Alta: "bg-[#1baf7a1a] text-[#0c7a52] dark:bg-[#199e70]/10 dark:text-[#4ade9a]",
  Transferido: "bg-[#eda1001a] text-[#8a6200] dark:bg-[#c98500]/10 dark:text-[#e8bd6b]",
  Retorno: "bg-[#e349481a] text-[#a12c2b] dark:bg-[#e66767]/10 dark:text-[#ff9494]",
}

function formatarDataBr(iso: string) {
  const [ano, mes, dia] = iso.split("-")
  return `${dia}/${mes}/${ano}`
}

export function PacientesTable({ pacientes }: { pacientes: Paciente[] }) {
  const recentes = [...pacientes]
    .sort((a, b) => (a.dataEntrada < b.dataEntrada ? 1 : -1))
    .slice(0, 10)

  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm dark:border-[#1f2937] dark:bg-[#12151c]">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-[#0b0b0b] dark:text-white">Movimentacoes recentes</h2>
        <p className="text-sm text-[#6b7280] dark:text-[#8b93a7]">Ultimos 10 registros de pacientes</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e7eb] text-xs uppercase tracking-wide text-[#9ca3af] dark:border-[#1f2937] dark:text-[#565d70]">
              <th className="py-2 pr-3 font-medium">Paciente</th>
              <th className="py-2 pr-3 font-medium">Setor</th>
              <th className="py-2 pr-3 font-medium">Entrada</th>
              <th className="py-2 pr-3 font-medium">Convenio</th>
              <th className="py-2 pr-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentes.map((p) => (
              <tr key={p.id} className="border-b border-[#e5e7eb] last:border-0 dark:border-[#1f2937]">
                <td className="py-2.5 pr-3">
                  <p className="font-medium text-[#0b0b0b] dark:text-white">{p.nome}</p>
                  <p className="text-xs text-[#9ca3af] dark:text-[#565d70]">
                    {p.id} - {p.idade} anos
                  </p>
                </td>
                <td className="py-2.5 pr-3 text-[#374151] dark:text-[#c7cdd9]">{p.setor}</td>
                <td className="py-2.5 pr-3 text-[#374151] dark:text-[#c7cdd9]" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {formatarDataBr(p.dataEntrada)}
                </td>
                <td className="py-2.5 pr-3 text-[#374151] dark:text-[#c7cdd9]">{p.convenio}</td>
                <td className="py-2.5 pr-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[p.status]}`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
