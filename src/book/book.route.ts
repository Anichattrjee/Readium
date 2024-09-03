import express from "express";
import path from "node:path";
import { createBook, listBooks, updateBook } from "./book.controller";
import multer from "multer";
import authenticate from "../middlewares/authenticate";

const bookRouter = express.Router();

//multer setup
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, //30mb
});

//beacuse we are adding multiple files thats why we are using upload.fields
bookRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

bookRouter.put(
  "/upddate/:bookId",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);

bookRouter.get("/", listBooks);

export default bookRouter;
