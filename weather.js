const request = require('request-promise');

const getWeather = input => getLatitudetLongitude(input).then( res => {
	if (!res) {
		return {message: `Couldn't find that place, sorry :(`}
	}
	return getMeteorologicalData(res)
})

const getLatitudetLongitude = (input) => {
	return request({
		url : `https://maps.googleapis.com/maps/api/geocode/json?address=${formatAddress(input)}`,
		json : true
	}).then( body => {
		if (body.status === 'ZERO_RESULTS') {
			return null
		} else if (body.status === 'OK') {
			return {
				address : body.results[0].formatted_address,
				lat : 		body.results[0].geometry.location.lat,
				lng : 		body.results[0].geometry.location.lng
			}
		}
	});
}

const formatAddress = input => encodeURIComponent(input.replace(/\$weather\s+/i, ''));

const getMeteorologicalData = input => {
	return request({
		url : `https://api.darksky.net/forecast/key/${input.lat},${input.lng}?units=ca`,
		json : true,
		resolveWithFullResponse: true,
	}).then( response => {
		let b = response.body
	  if (response.statusCode === 404) {
			return new Error("Unable to find weather location.");
		} else if (response.statusCode === 200){
			return {
				message : `The weather report for ${input.address} : It's currently ${b.currently.temperature} celcius and ${b.currently.summary}; feels like ${b.currently.apparentTemperature} celcius.\nToday: ${b.daily.data[0].summary}\nTomorrow: a high of ${b.daily.data[1].temperatureMax} celcius - ${b.daily.data[1].summary}`
			}
		}
	});
}

module.exports = {
	getWeather
}
