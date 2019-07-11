const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//define paths for Express
const publicDirectory = path.join(__dirname,'../public/');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectory));

//what the server should do if someone tries to reach a certain url
//first argument is the route
//second argument is the function, when someone visits the route, the callback takes in request and response to send back

app.get('', (req,res)=>{
	res.render('index',{
		title: 'Weather App',
		name: 'Lizzie Chai'
	})
});
app.get('/about', (req,res)=>{
	res.render('about',{
		title: 'About Me',
		name: 'Lizzie Chai'
	});
})
app.get('/help', (req,res)=>{
	res.render('help',{
		title: 'Help',
		name: 'Lizzie Chai',
		help: 'this is some long text about where you can find help'
	});
})
app.get('/weather', (req,res)=>{
	if (!req.query.address){
		return res.send({
			error: 'You must provide a location'
		})
	}
	geocode(req.query.address,(error,{latitude, longitude, location} = {})=>{
		if (error){
			res.send({
				error: error
			})
			return;
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error){
				res.send({
					error: error,
				})
				return;
			} 
			res.send({
				forecast: forecastData.forecast,
				location,
				address: req.query.address,
			});  	
		});
	});
	
})

//wild card matches
app.get('/help/*',(req,res)=>{
	res.render('error404', {
		title:'404',
		name: 'Lizzie Chai',
		errorMessage: 'Help article not found',
	})
})
app.get('*',(req,res)=>{
	res.render('error404',{
		title:'404',
		name: 'Lizzie Chai',
		errorMessage: 'Page not found'
	})
})
//app.com
//app.com/help
//app.com/about

//app.listen() starts server on a certain port
//commond development port 3000
//http-based website port 80
//can pass a callback function when the server is up and running
app.listen(3000,()=>{
	console.log('server is up on port 3000')
});