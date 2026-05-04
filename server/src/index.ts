import express from "express";
import cookieParser from "cookie-parser";
import serverConfig from "./config/serverConfig";
import connectDB from "./config/db";
import apiRoutes from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.get('/test', (req, res) => {
    res.send("Test Api running ...")
})

app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(serverConfig.PORT, () => {
    console.log(`Server listening at port ${serverConfig.PORT}`);
});