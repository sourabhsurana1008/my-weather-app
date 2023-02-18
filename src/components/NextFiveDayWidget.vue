<template>
  <div
    class="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
    <div class="flex justify-between items-center" v-for="weatherData in data" :key="weatherData.dt">
      <span class="font-semibold text-lg w-1/4">
        {{
          new Date(weatherData.dt * 1000).toLocaleDateString(
            "en-us",
            {
              weekday: "short",
              day: "2-digit",
              month: "short",
            }
          )
        }}
      </span>
      <div class="flex items-center justify-end w-1/4 pr-10">
        <span class="font-semibold">{{ weatherData.humidity }}%</span>

      </div>
      <img class="w-auto h-[50px] object-cover" :src="
        `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
      " alt="" />
      <span class="font-semibold text-lg w-1/4 text-right"> {{ weatherData.temp.min }}° / {{ weatherData.temp.max
      }}°</span>
    </div>
</div>
</template>
<script>


export default {
  props: {
    data: Object,
    city: String
  },
  methods: {
    setMyDateToToday() {
      return new Date();
    }
  }
}
</script>