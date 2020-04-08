const mongoose = require('mongoose');
URI = process.env.MONGO_URL;
mongoose.connect(URI,{useNewUrlParser : true,useUnifiedTopology: true,useFindAndModify: false },(err)=>{
	if(err) 
		console.log(err)
	console.log('DATABASE CONNECTED')
})