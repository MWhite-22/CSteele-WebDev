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

// ========================================
// 			Listener
// ========================================

app.listen(port, ()=>{
	console.log('Server started on port: '+port);
});
