import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates{
  lat:number;
  lon:number;
}

// TODO: Define a class for the Weather object

class Weather{
  constructor(
    public tempature: number,
    public description: string,
    public icon: string
  ) {}
}

// TODO: Complete the WeatherService class
// TODO: Define the baseURL, API key, and city name properties
  class WeatherService {
    private baseURL: string;
    private apiKey: string;
    private cityName: string;

    constructor(){
      this.baseURL = 'https://api.openweathermap.org/data/2.5';
      this.apiKey = process.env.WEATHER_API_KEY || '';
      this.cityName = '';
    }

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  private async fetchLocationData(query: string){
    const response = await axios.get(`${this.baseURL}geo/1.0/direct`, {
      params: {
        q: query,
        limit: 1,
        appid: this.apiKey,
      },
    });
    return response.data;
  }


  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData[0].lat,
      lon: locationData[0].lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(city:string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${city}&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city); 
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherDaata(coordinates: Coordinates){
    const response = await axios.get(this.buildWeatherQuery(coordinates));
    return response.data;
  }
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response:any): Weather{
    return  new Weather(
      response.main.temp,
      response.weather[0].description,
      response.weather[0].icon
    );
  }
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
  return weatherData.map(item => 
    new Weather(item.main.temp, item.weather[0].description, item.weather[0].icon)
  );
}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    return currentWeather;
  }
}

export default new WeatherService();
