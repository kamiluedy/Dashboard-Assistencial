import type { FluxoDiario, OcupacaoSetor, Paciente } from "../types"

export function calcularKpis(pacientes: Paciente[], fluxo: FluxoDiario[]) {
  const internados = pacientes.filter((p) => p.status === "Internado").length
  const altas = pacientes.filter((p) => p.status === "Alta").length
  const retornos = pacientes.filter((p) => p.retorno).length
  const totalAtendimentos = pacientes.length

  const taxaRetorno = totalAtendimentos > 0 ? (retornos / totalAtendimentos) * 100 : 0
  const taxaAlta = totalAtendimentos > 0 ? (altas / totalAtendimentos) * 100 : 0

  const entradasPeriodo = fluxo.reduce((acc, d) => acc + d.entradas, 0)
  const saidasPeriodo = fluxo.reduce((acc, d) => acc + d.saidas, 0)

  return {
    internados,
    altas,
    retornos,
    totalAtendimentos,
    taxaRetorno,
    taxaAlta,
    entradasPeriodo,
    saidasPeriodo,
  }
}

export function calcularOcupacaoTotal(ocupacao: OcupacaoSetor[]) {
  const totais = ocupacao.reduce(
    (acc, s) => {
      acc.totais += s.leitosTotais
      acc.ocupados += s.leitosOcupados
      return acc
    },
    { totais: 0, ocupados: 0 },
  )
  const percentual = totais.totais > 0 ? (totais.ocupados / totais.totais) * 100 : 0
  return { ...totais, percentual }
}
