import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json(
    {
        limit: "50mb",
    }
));

//To encode url
app.use(express.urlencoded(
    {
        limit: "50mb",
        extended: true,
    }
));

//public assests
app.use(express.static("public"));
app.use(cookieParser());




//routes import
import userRouter from "./routes/user.routes.js";
import gptRouter from "./routes/gpt.routes.js";
import cropRouter from "./routes/crop.routes.js";

//routes declration
app.use("/api/v1/users", userRouter); //transferred control the the middlewere userRouter
app.use("/api/v1/gpt",gptRouter)
app.use("/api/v1/crop", cropRouter);


//error handle
import errorHandler from "./middlewares/error.middleware.js";
app.use(errorHandler);

export {app}