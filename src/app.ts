import express, { NextFunction, Request, Response } from "express";
import { config } from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/user.route";
import bookRouter from "./book/book.route";
import cors from "cors";


const app=express();

//cors config
app.use(cors({
    origin:config.front_end_domain
}));
app.use(express.json());


// app.get("/test",(req,res)=>{
//     res.send("Server is ok");
// });

// app.get("/",(req,res,next)=>{
//     const error=createHttpError('503',"Something went wrong");
    // next(error);
    // throw error;
// })

//user router
app.use('/api/users',userRouter);
app.use('/api/books',bookRouter);


//global error handler
app.use(globalErrorHandler);
export default app;