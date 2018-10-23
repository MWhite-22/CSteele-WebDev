// ========================================
// 			Require/Include
// ========================================
const 	express = require('express'),
		app = express(),
		port = '3000',
		mongoose = require('mongoose'),
		const db = require('./db');

// ========================================
// 			Node Config
// ========================================
app.use(express.static('public'));
app.set('view engine', 'ejs');

// ========================================
// 			Database Connection
// ========================================
mongoose.connect(db, {useNewUrlParser: true});

// ========================================
// 			Routing
// ========================================

app.get('/', (req, res)=>{
	res.send('HELLO HOME PAGE');
});

// ========================================
// 			Listen
// ========================================
app.listen(port, ()=>{
	console.log('RESTful Blog started on port:' + port);
})