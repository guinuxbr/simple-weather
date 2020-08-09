class UI {
  constructor() {
    this.location = document.querySelector("#w-location");
    this.condition = document.querySelector("#w-main");
    this.temperature = document.querySelector("#w-temperature");
    this.details = document.querySelector("#w-details");
    this.icon = document.querySelector("#w-icon");
    this.humidity = document.querySelector("#w-humidity");
    this.description = document.querySelector("#w-description");
    this.feels_like = document.querySelector("#w-feels-like");
    this.wind = document.querySelector("#w-wind");
  }

  paint(weather) {
    const icon_img = weather.weather[0].icon;
    this.location.textContent = `${weather.name}, ${weather.sys.country}`;
    this.condition.textContent = `Condition: ${weather.weather[0].main}`;
    this.temperature.textContent = `Temperature: ${weather.main.temp}°C`;
    this.icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon_img}@2x.png`
    );
    this.feels_like.textContent = `Feels like: ${weather.main.feels_like}°C`;
    this.humidity.textContent = `Relative humidity: ${weather.main.humidity}%`;
    this.description.textContent = `Cloudiness: ${weather.weather[0].description}`;
    this.wind.textContent = `Wind speed: ${weather.wind.speed} m/s`;
  }
}
