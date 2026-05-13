export interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  time: string
}

export async function getWeather(
  latitude: string,
  longitude: string
): Promise<WeatherData> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
  )

  const data = await response.json()

  return {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    time: data.current.time,
  }
}