// ========================================
// 			Require / Import
// ========================================
const express = require ('express');
const app = express();

const port = "8080";

// ========================================
// 			Node Config
// ========================================
app.set('view engine', 'ejs');
app.use(express.static('public'));

// ========================================
// 			Routes
// ========================================
app.get('/', (req, res)=>{
	res.render('home');
});

app.get('/campgrounds', (req, res)=>{
	let campgrounds = [
		{name: 'Salmon Creek', image: 'https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?cs=srgb&dl=adventure-boy-camping-450441.jpg&fm=jpg'},
		{name: 'Hilly Hill', image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?cs=srgb&dl=bonfire-camp-campfire-1061640.jpg&fm=jpg'},
		{name: 'Mnt. Mountain', image: 'https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?cs=srgb&dl=camping-clouds-dawn-803226.jpg&fm=jpg'},
	];

	res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/*', (req, res)=>{
	res.render('404');
});

// ========================================
// 			Listener
// ========================================

app.listen(port, ()=>{
	console.log('Server started on port: '+port);
});
