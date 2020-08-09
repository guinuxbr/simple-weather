class Weather {
  constructor(city, country) {
    this.apiKey = "YOUR_API_KEY_HERE";
    this.city = city;
    this.country = country;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=${this.apiKey}`
    );

    const response_data = await response.json();

    return response_data;
  }

  // Change weather location
  changeLocation(city, country) {
    this.city = city;
    this.country = country;
  }
  
}
