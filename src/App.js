import React from "react";
import Title from "./Components/Title";
import Form from "./Components/Form";
import Weather from "./Components/Weather";

const WEATHER_API_KEY = "2a5c8e34829c601bbfbec35b22571810";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    description: undefined,
    error: undefined,
  };
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${WEATHER_API_KEY}`
    );
    const data = await api_call.json();
    if (city && country) {
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        error: "Recheck and enter the value again",
      });
    }
  };
  render() {
    return (
      <div>
        <Title />
        <Form getWeather={this.getWeather} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }
}
export default App;
