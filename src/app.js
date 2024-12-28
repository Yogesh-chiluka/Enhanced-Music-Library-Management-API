import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from './utils/errorHandler.js'
const app = express();

app.use(cors({
    oringin:process.env.CROSS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit:'16kb'}));

app.use(express.urlencoded({extended:true,limit:'16kb'}));

app.use(express.urlencoded({extended:true, limit:'16kb'}));

app.use(express.static('public'));

app.use(cookieParser());



// Routes Import
import userRouter from './routes/user.routes.js'
import artistRouter from './routes/artist.routes.js'
import albumRouter from './routes/album.routes.js'
import trackRouter from './routes/track.routes.js'
import favoriteRouter from './routes/favourite.routes.js'



// Routes Declaration
app.use('/api/v1', userRouter)
app.use('/api/v1/artists',artistRouter)
app.use('/api/v1/albums',albumRouter)
app.use('/api/v1/tracks',trackRouter)
app.use('/api/v1/favorites',favoriteRouter)


app.use(errorHandler);










export { app }