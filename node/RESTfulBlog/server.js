// ========================================
// 			Require/Include
// ========================================
const 	express 		= require('express'),
		app 			= express(),
		port 			= '3000',
		mongoose 		= require('mongoose'),
		bodyParser 		= require('body-parser'),
		methodOverride 	= require('method-override'),
		db 				= require('./db');

// ========================================
// 			Node Config
// ========================================
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
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

// ========================================
// 			Routes
// ========================================
app.get('/', (req, res)=>{
	res.render('home');
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

app.post('/blogs', (req, res)=>{
	let blogData = req.body.blog;
	Blog.create(blogData, (err, blog)=>{
		if(err){
			console.log('DB CREATE ERROR:');
			console.log(err);
			res.render('new');
		} else {
			res.redirect('/blogs');
		}
	});
});

app.get('/blogs/new', (req, res)=>{
	res.render('new');
});

app.get('/blogs/:id', (req, res)=>{
	let id = req.params.id;
	Blog.findById(id, (err, blog)=>{
		if(err){
			console.log('Single Page Error');
			console.log(err);
			res.redirect('/blogs');
		}else{
			res.render('single', {blog: blog});
		}
	});
});

app.put('/blogs/:id', (req, res)=>{
	let id = req.params.id;
	let blogData = req.body.blog; 
	Blog.findByIdAndUpdate(id, blogData, (err, blog)=>{
		if(err){
			console.log('Single Blog Update Error');
			console.log(err);
			res.redirect('/blogs');
		}else{
			res.redirect('/blogs/' + id);
		}
	});
});

app.delete('/blogs/:id', (req, res)=>{
	let id = req.params.id;
	Blog.findByIdAndRemove(id, (err)=>{
		if(err){
			console.log('Single Blog Delete Error');
			console.log(err);
			res.redirect('/blogs');
		}else{
			res.redirect('/blogs');
		}
	});
});

app.get('/blogs/:id/edit', (req, res)=>{
	let id = req.params.id;
	Blog.findById(id, (err, blog)=>{
		if(err){
			console.log('Single Edit Page Error');
			console.log(err);
			res.redirect('/blogs');
		}else{
			res.render('edit', {blog: blog});
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