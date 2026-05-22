//importing express
const express=require('express');
const cookieParser = require('cookie-parser');

//initializing an instance of express
const app=express();

//all the incoming request body will be in json format
app.use(express.json());
app.use(cookieParser());

const authRouter=require('./routes/auth.routes');

app.use("/api/auth",authRouter);

//exporting the app module
module.exports=app;