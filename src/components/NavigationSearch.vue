<template>
   <div class="flex gap-3 flex-1 justify-end">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              @input="getSearchResults"
              placeholder="Search for a city or state"
              class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
            />
            <ul
              class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[40px]"
              v-if="cityListResults"
            >
              <p class="py-2" v-if="searchError">
                Sorry, something went wrong, please try again.
              </p>
              <p
                class="py-2"
                v-if="!searchError && cityListResults.length === 0"
              >
                No results match your query, try a different term.
              </p>
              <template v-else>
                <li
                  v-for="searchResult in cityListResults"
                  :key="searchResult.id"
                  class="py-2 cursor-pointer"
                  @click="searchCity(searchResult)"
                >
                  {{ searchResult.name }}
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
router.push({
    name: "searchView",
    params: { city: searchQuery.id },
    query: {
      lat:searchQuery.coord.lat,
      lon:searchQuery.coord.lon,
      city:searchQuery.name
    },
    preview: true,
});
};

const getSearchResults = () => {
clearTimeout(queryTimeout.value);
const API_PATH = 'https://openweathermap.org/data/2.5/find?q=';
const TOKEN = '439d4b804bc8187953eb36d2a8c26a02';

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
  