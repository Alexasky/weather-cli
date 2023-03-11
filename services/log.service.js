import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed('ERROR') + ' ' + error);
}
const printSucces = (msg) => {
	console.log(chalk.bgGreen('SUCCES') + ' ' + msg);
}
const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Without parameters - output weather
		-s [CITY] for save city
		-h for output help
		-t [API_KEY] for save token		
		`
	);
}
const printWeather = (res, icon) => {
	console.log(
		dedent`${chalk.bgYellow(' WEATHER ')} Weather in city ${res.name} 
		${icon} ${res.weather[0].description}
		Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
		Humidity: ${res.main.humidity}%
		Wind: ${res.wind.speed}
		`
	);
}

export { printError, printSucces, printHelp, printWeather }