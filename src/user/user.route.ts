import express from "express";
import { register,loginUser } from "./user.controller";

const userRouter=express.Router();

userRouter.post("/register",register);
userRouter.post("/login",loginUser); 

export default userRouter;