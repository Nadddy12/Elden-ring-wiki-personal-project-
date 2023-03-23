import mongoose from "mongoose";
import express from "express";
import puplicRouter from "./routes/publicRoute.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import modRouter from "./routes/modRoute.js";
import { verifyUser , verifyAdmin , verifyMod } from "./middleware/auth.js";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
const app = express();
app.use(cors());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_DB_URL);

mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
});

mongoose.connection.on("open", () => {
    console.log("Connexion à la base de donénes établie");
    app.use('/', puplicRouter);
    app.use('/user', [verifyUser] , userRouter);
    app.use('/admin', [verifyUser, verifyAdmin] , adminRouter);
    app.use('/mod', [verifyUser, verifyMod] , modRouter);

});

app.listen(9602,function(){
    console.log(`http://localhost:9602`);
});