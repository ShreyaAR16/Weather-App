import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 })
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is not configured' }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    )
    
    const data = await response.json()

    if (!response.ok) {
      console.error('OpenWeatherMap API error:', data)
      return NextResponse.json({ error: data.message || 'Failed to fetch weather data' }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
}