import { useEffect, useState } from "react"

export type Tema = "light" | "dark"

const STORAGE_KEY = "dashboard-tema"

function lerTemaInicial(): Tema {
  const salvo = localStorage.getItem(STORAGE_KEY)
  if (salvo === "light" || salvo === "dark") return salvo
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function useTheme() {
  const [tema, setTema] = useState<Tema>(lerTemaInicial)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema)
    localStorage.setItem(STORAGE_KEY, tema)
  }, [tema])

  function alternarTema() {
    setTema((atual) => (atual === "light" ? "dark" : "light"))
  }

  return { tema, alternarTema }
}
