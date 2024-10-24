# Weather App

A simple, responsive weather application built with Next.js and TypeScript. This app allows users to check the current weather conditions for any city worldwide using the OpenWeatherMap API.

## Features

- Search for weather by city name
- Display current temperature, weather description, humidity, and wind speed
- Emoji representation of weather conditions
- Dark mode toggle
- Responsive design for mobile and desktop

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An OpenWeatherMap API key (Sign up at [OpenWeatherMap](https://openweathermap.org/api) to get your free API key)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

## Usage

To run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To build the app for production:

```
npm run build
```

To start the production server:

```
npm start
```

## Project Structure

- `app/`: Contains the main application files
  - `page.tsx`: The main page component
  - `api/weather/route.ts`: API route for fetching weather data
- `components/`: Contains React components
  - `WeatherApp.tsx`: The main Weather App component
- `public/`: Static files
- `.env.local`: Environment variables (not tracked by Git)

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [OpenWeatherMap API](https://openweathermap.org/api)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/your-username/weather-app/issues) if you want to contribute.

## License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/your-username/weather-app](https://github.com/your-username/weather-app)
```

Remember to replace the following placeholders with your actual information:
- `your-username` with your GitHub username
- `Your Name` with your name or the name you want to be contacted by
- `@your_twitter` with your Twitter handle (if applicable)
- `email@example.com` with your contact email

This README provides a comprehensive overview of your weather app, including how to set it up, run it, and contribute to it. It also lists the main features and technologies used, which can be helpful for other developers or potential users of your app.
