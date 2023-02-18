<template>
  <div class="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
   
   
    <div class="flex justify-between"  v-if="data[0]">
      <div class="flex flex-col">
        <span class="text-6xl font-bold"> {{ Math.round(data[0].temp)  }}°C</span>
        <span class="font-semibold mt-1 text-gray-500">{{ city }}</span>
      </div>
      <img class="h-24 w-24 " :src="
          `http://openweathermap.org/img/wn/${data[0].weather[0].icon}@4x.png`
        " alt="" />
    </div>
    <div class="flex justify-between mt-12">
      <div class="flex flex-col items-center" v-for="hourData in data" :key="hourData.dt">
        <span class="font-semibold text-lg">{{ Math.round(hourData.temp)  }}°C</span>
        <img class="w-auto h-[50px] object-cover" :src="
          `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
        " alt="" />

        <span class="font-semibold mt-1 text-sm">{{
          new Date(
            hourData.currentTime
          ).toLocaleTimeString("en-us", {
            hour: "numeric",
          })
        }}</span>
      
      </div>
    </div>
</div>
</template>
<script>

export default {
  props: {
    data: Object,
    city: String
  }
}
</script>
