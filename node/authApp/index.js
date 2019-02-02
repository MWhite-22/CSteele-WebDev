const   bodyParser 		= require('body-parser'),
        mongoose        = require('mongoose'),
        express         = require('express'),
        app             = express(),
        port            = '8080'

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/secret', (req, res)=>{
    res.render('secret');
});

app.get('/*', (req, res)=>{
    res.render('index');
});

app.listen(port, ()=>{
	console.log(`Server started on port: ${port}`);
});