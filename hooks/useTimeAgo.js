import {useEffect, useState} from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = timestamp => {
  const now = Date.now()
  // Vamos hacia atrás, por eso es negativo. De este modo sale "hace 7 días..."
  // Dividimos entre 1000 para quitar los milisegundos
  const elapsed = (timestamp - now) / 1000
  // Averiguar qué tiempo hay entre los dos tiempos
  for (const [unit, secondsInUnit] of DATE_UNITS) {
    // Ver qué es más grande, si el tiempo que ha pasado o el número de segundo de esa unidad
    // Lo hacemos para averiguar si han pasado segundos, horas o días
    // Hacemos el valor absoluto para saber la diferencia de tiempo entre el momento actual y cuándo se creó el tiempo
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      // el tiempo que ha pasado entre los segundos de la unidad = valor
      const value = Math.floor(elapsed / secondsInUnit)
      return {value, unit}
    }
  }
}

export default function useTimeAgo(timestamp) {
  // Inicializamos el estado con un método para que se ejecute solamente una vez
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

  // Actualizar los valores cada 5 segundos
  useEffect(() => {
    // La función del setInterval() se crea cada vez que se ejecuta la función, cada 5 segundos
    const interval = setInterval(() => {
      // recuperar el tiempo para actualizarlo
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeago(newTimeAgo)
    }, 5000)

    return () => clearInterval(interval)
  }, [timestamp])

  const relativeTimeFormat = new Intl.RelativeTimeFormat('es', {style: 'short'})

  const {value, unit} = timeago

  return relativeTimeFormat.format(value, unit)
}
