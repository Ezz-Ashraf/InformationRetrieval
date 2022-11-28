const path=require('path');
const express=require('express');
const bodyParse=require("body-parser");
const fs =require('fs')

const app=express();

app.set('view engine','ejs');
app.set('views','views');
const homeRoutes =require('./routes/home');
app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(homeRoutes);


	app.listen(3000, () =>{
		console.log("Information Retrieval app started")
	});

