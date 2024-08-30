import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app=express();

app.get("/test",(req,res)=>{
    res.send("Server is ok");
});

app.get("/",(req,res,next)=>{
    const error=createHttpError('503',"Something went wrong");
    // next(error);
    // throw error;
})



//global error handler
app.use(globalErrorHandler);
export default app;