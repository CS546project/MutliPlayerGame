const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const configRoutes = require("./routes");
const session = require('express-session')

app.use(express.json());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let totalRequests = 0;

app.use(
	session({
		name: 'AuthCookie',
		secret: "This is a secret.. shhh don't tell anyone",
		saveUninitialized: true,
		resave: false
	})
);

app.use(async (req, res, next) => {
	totalRequests++;
	console.log(totalRequests);
	console.log(`There have been ${totalRequests} requests made to the server`);
	console.log(new Date().toUTCString()+ " " + req.method +" "+req.originalUrl);
	next();
});

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});