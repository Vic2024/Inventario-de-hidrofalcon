import type { getData } from "~/types"
export default function dataDate(data: getData) {
  if (data !== null) {
    return data.length <= 0
      ? []
      : data.map(el => {
        const titles = Object.keys(el)
        titles.forEach(t => {
          if (t === 'fecha_creacion' || t === 'fecha_modificacion') el[t] = new Date(el[t]).toLocaleString().split(',')[0]
        })
      })
  }
}