<template>
	<div>
		<div class="container mx-auto" v-if="!route.query.city">
			<ul class="flex justify-center space-x-2 text-white">
				<li>
					<button @click="currentTaab('Rio de Janeiro', -22.9028, -43.2075)"
						class="text-slate-900 font-extrabold inline-block px-4 py-2 bg-white text-current focus:outline-none">
						Rio de Janeiro
					</button>
				</li>
				<li>
					<button @click="currentTaab('Beijing', '39.9075', '116.3972')"
						class="text-slate-900 font-extrabold inline-block px-4 py-2 bg-white text-current focus:outline-none">
						Beijing
					</button>
				</li>
				<li>
					<button @click="currentTaab('Los Angeles', '34.0522', '-118.2437')"
						class="text-slate-900 font-extrabold inline-block px-4 py-2 bg-white text-current focus:outline-none">
						Los Angeles
					</button>
				</li>
			</ul>
		</div>
	</div>

	<div class="flex flex-col items-center justify-center 
		  min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 ">
		<NextHourWidget :data=weatherDataHourly :city=selectedCity />
		<NextFiveDayWidget :data=weatherDataDaily :city=selectedCity />
	</div>
</template>

<script setup>
import { ref } from "vue";
import NextHourWidget from "./NextHourWidget.vue";
import NextFiveDayWidget from "./NextFiveDayWidget.vue";
import { getWeatherData } from './../core/httpService';
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const weatherDataHourly = ref(Object);
const weatherDataDaily = ref(Object);
const selectedCity = ref(String);
const currentTaab = async(city, lat, long) =>{
	const result = await getWeatherData(lat, long)
	selectedCity.value = city;
	weatherDataHourly.value = result.hourly.slice(0, 5);
	weatherDataDaily.value =  result.daily.slice(0, 5);
};

if(route.query.lat && route.query.lon && route.query.city) {
	currentTaab(route.query.city, route.query.lat, route.query.lon);
} else {
	currentTaab('Rio de Janeiro', -22.9028, -43.2075);
}
</script>


