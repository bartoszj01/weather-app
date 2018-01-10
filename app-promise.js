const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

var addr = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}`;

axios.get(geocodeUrl).then((response) => {
	if(response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find the address');
	}
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/75bbd9c86cf481b26e0e50f32ee318c2/${lat},${lng}`;
	console.log(reponse.data.results[0].formatted_address);
	return axios.get(weatherUrl);
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemparature;
	console.log(`it's currently ${temperature}. Feels like ${apparentTemparature}`);
}).catch((e) => {
	if(e.code === 'ENOTFOUND') {
		console.log('Unable to connect to api servers');
	} else {
		console.log('Unable to find the address');
	}
});



