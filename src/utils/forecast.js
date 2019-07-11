const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/11a2c78d67f0fb11ef7ea71e5bb413b4/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';
	request({url, json: true}, (error, {body})=>{
		if (error){
			callback('Unable to connect to weather services.', undefined);
		} else if (body.error){
			callback('Unable to connect to find location. Try another search.', undefined);
		} else {
			const dailySummary = body.daily.data[0].summary;
			const temp = " The temperature is " + body.currently.temperature + " degrees out.";
			const rain = " There is a " + body.currently.precipProbability + "% chance of rain.";
			const tempHigh = " Temperature is expected to be as high as " + body.daily.data[0].temperatureHigh + " degrees.";
			const tempLow =  " Temperature is expected to be as low as " + body.daily.data[0].temperatureLow + " degrees."
			callback(undefined, {
				forecast: dailySummary + temp + rain + tempHigh + tempLow,
			});
		}
	});
}

module.exports = forecast