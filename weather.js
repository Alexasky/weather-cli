#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from './services/api.service.js';
import { printError, printHelp, printSucces, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Token is not inputed');
		return
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSucces('Token is saved');
	} catch (error) {
		printError(error.message);
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError('City is not inputed');
		return
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSucces('City is saved');
	} catch (error) {
		printError(error.message);
	}
}

const getForcast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city);
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (error) {
		if (error?.response?.status == 404) {
			printError('City is wrong inputed');
		}
		if (error?.response?.status == 401) {
			printError('Token is wrong inputed');
		}
		else {
			printError(error.message);
		}
	}

}

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		//output help
		return printHelp();
	}
	if (args.s) {
		//save city
		return saveCity(args.s);
	}
	if (args.t) {
		//save token
		return saveToken(args.t);
	}
	else {
		//output weather
		return getForcast();
	}
}

initCLI();