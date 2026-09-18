import type { FluxoDiario } from "../types"
import { MESES } from "./filters"

export interface PontoFluxo {
  chave: string
  label: string
  entradas: number
  saidas: number
  altas: number
  retornos: number
}

export function agregarFluxo(fluxo: FluxoDiario[], mes: number | "todos"): PontoFluxo[] {
  if (mes !== "todos") {
    return fluxo
      .slice()
      .sort((a, b) => (a.data < b.data ? -1 : 1))
      .map((d) => {
        const [, , dia] = d.data.split("-")
        return {
          chave: d.data,
          label: `${dia}`,
          entradas: d.entradas,
          saidas: d.saidas,
          altas: d.altas,
          retornos: d.retornos,
        }
      })
  }

  const porMes = new Map<string, PontoFluxo>()
  for (const d of fluxo) {
    const [ano, mesStr] = d.data.split("-")
    const chave = `${ano}-${mesStr}`
    const atual = porMes.get(chave) ?? {
      chave,
      label: MESES[Number(mesStr) - 1].slice(0, 3),
      entradas: 0,
      saidas: 0,
      altas: 0,
      retornos: 0,
    }
    atual.entradas += d.entradas
    atual.saidas += d.saidas
    atual.altas += d.altas
    atual.retornos += d.retornos
    porMes.set(chave, atual)
  }

  return Array.from(porMes.values()).sort((a, b) => (a.chave < b.chave ? -1 : 1))
}
