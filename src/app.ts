import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/user.route";

const app=express();

app.use(express.json());


app.get("/test",(req,res)=>{
    res.send("Server is ok");
});

app.get("/",(req,res,next)=>{
    const error=createHttpError('503',"Something went wrong");
    // next(error);
    // throw error;
})

//user router
app.use('/api/users',userRouter);


//global error handler
app.use(globalErrorHandler);
export default app;