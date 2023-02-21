import axios from "axios";
const getWeatherData = async (lat,long ) => {

  const API_PATH = import.meta.env.VITE_DETAIL_API_PATH;
  const TOKEN = import.meta.env.VITE_DETAIL_API_TOKEN;
    try {
      const weatherData = await axios.get(
        `${API_PATH}lat=${lat}&lon=${long}&units=metric&appid=${TOKEN}`
      );
      // cal current date & time
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const utc = weatherData.data.current.dt * 1000 + localOffset;
      weatherData.data.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
      // cal hourly weather offset
      weatherData.data.hourly.forEach((hour) => {
        const utc = hour.dt * 1000 + localOffset;
        hour.currentTime =
          utc + 1000 * weatherData.data.timezone_offset;
      });
      return weatherData.data;
    } catch (err) {
      console.log(err);
    }
};
export {getWeatherData};
