import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    oringin:process.env.CROSS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit:'16kb'}));

app.use(express.urlencoded({extended:true,limit:'16kb'}));

app.use(express.urlencoded({extended:true, limit:'16kb'}));

app.use(express.static('public'));

//app.use(cookieParser());




// Routes Import
//import userRouter from './routes/user.routes.js'

// Routes Declaration

//app.use('/api/v1/users', userRouter);

app.use('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});













export { app }