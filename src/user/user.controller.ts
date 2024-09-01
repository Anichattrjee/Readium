import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { access } from "fs";



const register=async (req:Request,res:Response,next:NextFunction)=>{

    try {
        const {name,email,password}=req.body;
    
        if(!name || !email || !password){
            const error=createHttpError(400,"All fields are required");
            return next(error); 
        }
    
    
        const user=await User.findOne({email});
    
        if(user){
            const error=createHttpError(400,"User already exists with this email");
            return next(error);
        }
    
        const hashedPassword=await bcrypt.hash(password,10);
    
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword
        });
    
        const token=await jwt.sign({sub:newUser._id},config.jwt_secret as string,{expiresIn:"1d"});
    
        
    
        res.status(200).json({accessToken:token});
    
    } catch (error) {
        return next(createHttpError(500,"User Registration Failed"));
    }
}

const loginUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            const error=createHttpError(404,"All fields are required");
            return next(error);
        }

        const user=await User.findOne({email});

        if(!user){
            return next(createHttpError(404,"User not found"));
        }

        const passwordCorrect=await bcrypt.compare(password,user.password);

        if(!password){
            return next(createHttpError(404,"Inavlid Credentials"));
        }

        const token=await jwt.sign({sub:user._id},config.jwt_secret as string,{expiresIn:"1d"});

        res.status(201).json({accessToken:token});

    } catch (error) {
        
    }
}
export {register,loginUser};