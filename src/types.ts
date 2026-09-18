export type Setor = "Maternidade" | "UTI Neonatal" | "Pediatria" | "Pronto Socorro" | "Enfermaria"

export type StatusPaciente = "Internado" | "Alta" | "Transferido" | "Retorno"

export interface Paciente {
  id: string
  nome: string
  idade: number
  setor: Setor
  status: StatusPaciente
  dataEntrada: string
  dataSaida?: string
  retorno: boolean
  convenio: string
}

export interface FluxoDiario {
  data: string
  entradas: number
  saidas: number
  altas: number
  retornos: number
}

export interface OcupacaoSetor {
  setor: Setor
  leitosTotais: number
  leitosOcupados: number
}
