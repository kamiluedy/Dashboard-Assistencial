import type { FluxoDiario, OcupacaoSetor, Paciente, Setor, StatusPaciente } from "../types"

const nomes = [
  "Maria Silva", "Joao Pereira", "Ana Souza", "Carlos Oliveira", "Fernanda Lima",
  "Bruno Santos", "Juliana Costa", "Rafael Almeida", "Patricia Rocha", "Lucas Martins",
  "Camila Ferreira", "Diego Barbosa", "Larissa Ribeiro", "Thiago Carvalho", "Beatriz Gomes",
  "Eduardo Nascimento", "Vanessa Araujo", "Felipe Cardoso", "Gabriela Teixeira", "Marcos Vieira",
]

const setores: Setor[] = ["Maternidade", "UTI Neonatal", "Pediatria", "Pronto Socorro", "Enfermaria"]
const convenios = ["Unimed", "Bradesco Saude", "SUS", "Amil", "Particular"]

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function paraIso(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function gerarDataDiasAtras(diasAtras: number): string {
  const d = new Date()
  d.setDate(d.getDate() - diasAtras)
  return paraIso(d)
}

// Cobre os ultimos 18 meses para permitir filtro por mes/ano
const DIAS_HISTORICO = 18 * 30

export const pacientes: Paciente[] = Array.from({ length: 420 }, (_, i) => {
  const diasAtras = Math.floor(Math.random() * DIAS_HISTORICO)
  const status: StatusPaciente = randomFrom(["Internado", "Alta", "Alta", "Transferido", "Retorno"])
  const retorno = status === "Retorno" || Math.random() < 0.12

  return {
    id: `PAC-${String(i + 1).padStart(4, "0")}`,
    nome: randomFrom(nomes),
    idade: Math.floor(Math.random() * 70) + 1,
    setor: randomFrom(setores),
    status,
    dataEntrada: gerarDataDiasAtras(diasAtras),
    dataSaida:
      status !== "Internado" ? gerarDataDiasAtras(Math.max(diasAtras - Math.floor(Math.random() * 3), 0)) : undefined,
    retorno,
    convenio: randomFrom(convenios),
  }
})

export const fluxoDiario: FluxoDiario[] = Array.from({ length: DIAS_HISTORICO }, (_, i) => {
  const diasAtras = DIAS_HISTORICO - 1 - i
  const entradas = Math.floor(Math.random() * 12) + 8
  const altas = Math.floor(Math.random() * 8) + 5
  const retornos = Math.floor(Math.random() * 3)
  return {
    data: gerarDataDiasAtras(diasAtras),
    entradas,
    saidas: altas + Math.floor(Math.random() * 2),
    altas,
    retornos,
  }
})

export const ocupacaoSetores: OcupacaoSetor[] = [
  { setor: "Maternidade", leitosTotais: 24, leitosOcupados: 19 },
  { setor: "UTI Neonatal", leitosTotais: 10, leitosOcupados: 8 },
  { setor: "Pediatria", leitosTotais: 18, leitosOcupados: 11 },
  { setor: "Pronto Socorro", leitosTotais: 15, leitosOcupados: 13 },
  { setor: "Enfermaria", leitosTotais: 30, leitosOcupados: 21 },
]
