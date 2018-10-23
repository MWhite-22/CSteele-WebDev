// ========================================
// 			Require/Include
// ========================================
const 	express 	= require('express'),
		app 		= express(),
		port 		= '3000',
		mongoose 	= require('mongoose'),
		bodyParser 	= require('body-parser'),
		db 			= require('./db');

// ========================================
// 			Node Config
// ========================================
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// ========================================
// 			Database Connection
// ========================================
mongoose.connect(db, {useNewUrlParser: true}, (err)=>{
	if(err){
		console.log('DB CONNECTION ERROR:');
		console.log(err);
	} else {
		console.log('Successful Connection to Database: RESTfulBlog');
	}
});

// ========================================
// 			Schema Creation
// ========================================
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
// 	title: 'Hungry Blog',
// 	image: 'https://images.unsplash.com/photo-1540265556701-ae209ac395cd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2fd1a50c008e6d870e103603d5c7a294&auto=format&fit=crop&w=500&q=60',
// 	body: 'I LOVE FOOD. FOOD IS LIFE. FEED ME'
// }, (err, blog)=>{
// 	if(err){
// 		console.log('DB CREATE ERROR:');
// 		console.log(err);
// 	} else {
// 		console.log(blog);
// 	}
// });

// ========================================
// 			Routes
// ========================================
app.get('/', (req, res)=>{
	res.redirect('/blogs');
});

app.get('/blogs', (req, res)=>{
	Blog.find({}, (err, blogs)=>{
		if(err){
			console.log('Error Retrieving All Blog Posts');
			console.log(err);
		} else {
			res.render('index', {blogs: blogs});
		}
	});
});

app.get('*', (req, res)=>{
	res.send('404: Page Not Found');
});

// ========================================
// 			Listen
// ========================================
app.listen(port, ()=>{
	console.log('RESTful Blog started on port:' + port);
})