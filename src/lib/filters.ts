import type { FluxoDiario, Paciente } from "../types"

export const MESES = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

export function anosDisponiveis(fluxo: FluxoDiario[]): number[] {
  const anos = new Set(fluxo.map((d) => Number(d.data.slice(0, 4))))
  return Array.from(anos).sort((a, b) => b - a)
}

export function filtrarFluxoPorPeriodo(fluxo: FluxoDiario[], ano: number | "todos", mes: number | "todos") {
  return fluxo.filter((d) => {
    const [anoStr, mesStr] = d.data.split("-")
    if (ano !== "todos" && Number(anoStr) !== ano) return false
    if (mes !== "todos" && Number(mesStr) !== mes) return false
    return true
  })
}

export function filtrarPacientesPorPeriodo(pacientes: Paciente[], ano: number | "todos", mes: number | "todos") {
  return pacientes.filter((p) => {
    const [anoStr, mesStr] = p.dataEntrada.split("-")
    if (ano !== "todos" && Number(anoStr) !== ano) return false
    if (mes !== "todos" && Number(mesStr) !== mes) return false
    return true
  })
}
