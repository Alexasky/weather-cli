import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
import http from 'http';

const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);

if (!token) {
	throw new Error('API_KEY is not exist, please input it use command -t [API_KEY] ');
}

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '⛅';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
}

const getPosition = async (city) => {

	//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
	//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
	const { data } = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
		params: {
			q: city,
			limit: 1,
			appid: token
		}
	});
	return data;

	// const urlGeo = new URL('http://api.openweathermap.org/geo/1.0/direct');

	// urlGeo.searchParams.append('q', city);
	// urlGeo.searchParams.append('limit', '5');
	// urlGeo.searchParams.append('appid', token);

	// http.get(urlGeo, (response) => {
	// 	let res = {};
	// 	response.on('data', (chank) => {
	// 		res += chank;
	// 	});
	// 	response.on('end', () => {
	// 		console.log(res);
	// 	});
	// });
}
const getWeather = async (city) => {
	const geoData = await getPosition(city);

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			lat: geoData[0].lat,
			lon: geoData[0].lon,
			appid: token,
			lang: 'en',
			units: 'metric'
		}
	});
	return data;
}

export { getWeather, getIcon }