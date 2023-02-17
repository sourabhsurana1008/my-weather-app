import axios from "axios";
const getWeatherData = async (lat,long ) => {
    try {
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=482944e26d320a80bd5e4f23b3de7d1f`
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

const getCityData = setTimeout(async () => {
    if (searchQuery.value !== "") {
    try {
        const result = await axios.get(
        `https://openweathermap.org/data/2.5/find?q=${searchQuery.value}&type=like&sort=population&cnt=30&appid=439d4b804bc8187953eb36d2a8c26a02&_=1676562472726`
        );
        searchError.value = false;
        cityListResults.value = result.data.list;
    } catch {
        searchError.value = true;
    }
    return;
    }
    cityListResults.value = null;
}, 300);

export {getWeatherData, getCityData};