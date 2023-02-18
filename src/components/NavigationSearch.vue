<template>
  <div class="flex gap-3 flex-1 justify-end">
    <div class="relative">
      <input type="text" id="search" v-model="searchQuery" @input="getSearchResults" placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />
      <ul id="res" class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[40px]" v-if="cityListResults">
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try full city name.
        </p>
        <p class="py-2" v-if="!searchError && cityListResults.length === 0">
          No results match, try full city name.
        </p>
        <template v-else>
          <li v-for="city in cityListResults" :key="city.id" class="py-2 cursor-pointer"
            @click="searchCity(city)">
            {{ city.name }}
          </li>
        </template>
      </ul>
    </div>
</div>
</template>
  
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const searchQuery = ref("");
const queryTimeout = ref(null);
const cityListResults = ref(null);
const searchError = ref(null);
const searchCity = (searchQuery) => {
  router.replace({
    name: "searchView",
    params: { city: searchQuery.id },
    query: {
      lat: searchQuery.coord.lat,
      lon: searchQuery.coord.lon,
      city: searchQuery.name
    }
  });
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  const API_PATH = import.meta.env.VITE_API_PATH;
  const TOKEN =  import.meta.env.VITE_TOKEN;

  setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result =
          await axios.get(
            `${API_PATH}${searchQuery.value}&type=like&sort=population&cnt=30&appid=${TOKEN}&_=1676562472726`
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
};
</script>
  