//importing dotenv
require('dotenv').config();

//importing app that is created in src/app.js
const app=require('./src/app');
const connectToDB=require('./src/config/database');
const invokegeminiai=require('./src/services/ai.servise');

//connecting to database
connectToDB();

//initializing port
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})