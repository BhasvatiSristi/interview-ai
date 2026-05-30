//importing express
const express=require('express');
const cookieParser = require('cookie-parser');
const cors=require('cors');

//initializing an instance of express
const app=express();
// allow Vite dev server origins (localhost and 127.0.0.1) and handle preflight
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];

// apply CORS early so preflight requests receive proper headers
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin (like mobile apps, curl, or server-to-server)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) !== -1){
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials:true
}));

// Fallback: ensure CORS headers are always present and handle OPTIONS explicitly
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (!origin) return next();
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    }
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

//all the incoming request body will be in json format
app.use(express.json());
app.use(cookieParser());

const authRouter=require('./routes/auth.routes');
const interviewRouter=require('./routes/interview.routes');

app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRouter);

//exporting the app module
module.exports=app;