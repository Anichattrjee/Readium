import express from "express";
import path from "node:path";
import { createBook } from "./book.controller";
import multer from "multer";

const bookRouter=express.Router();

//multer setup
const upload=multer({
    dest:path.resolve(__dirname,"../../public/data/uploads"),
    limits:{fileSize:3e7}//30mb
});


//beacuse we are adding multiple files thats why we are using upload.fields
bookRouter.post("/",upload.fields([
    {name:'coverImage',maxCount:1},
    {name:'file',maxCount:1}
]),createBook);

export default bookRouter;