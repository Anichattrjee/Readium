import { NextFunction, Request, Response } from "express";
import path from "node:path";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import Book from "./book.model";
import fs, { fstat } from "node:fs";
import { AuthRequest } from "../middlewares/authenticate";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const {title,genre}=req.body;  
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      }
    );

    const _req=req as AuthRequest;

    const newBook=await Book.create({
      title,
      genre,
      author:_req.userId,
      coverImage:uploadResult.secure_url,
      file:bookFileUploadResult.secure_url
    });


    //now we need to delete temporary files
    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);

    res.status(201).json({id:newBook._id});

  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "CreateBook Failed somehow"));
  }
};


const updateBook=async(req:Request,res:Response,next:NextFunction)=>{
  const { title,genre } = req.body;
  const bookId = req.params.bookId;

  const book = await Book.findOne({ _id: bookId });

  if (!book) {
      return next(createHttpError(404, "Book not found"));
  }
  // Check access
  const _req = req as AuthRequest;
  if (book.author.toString() !== _req.userId) {
      return next(createHttpError(403, "You can not update others book."));
  }

  // check if image field is exists.

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  let completeCoverImage = "";
  if (files.coverImage) {
      const filename = files.coverImage[0].filename;
      const converMimeType = files.coverImage[0].mimetype.split("/").at(-1);
      // send files to cloudinary
      const filePath = path.resolve(
          __dirname,
          "../../public/data/uploads/" + filename
      );
      completeCoverImage = filename;
      const uploadResult = await cloudinary.uploader.upload(filePath, {
          filename_override: completeCoverImage,
          folder: "book-covers",
          format: converMimeType,
      });

      completeCoverImage = uploadResult.secure_url;
      await fs.promises.unlink(filePath);
  }

  // check if file field is exists.
  let completeFileName = "";
  if (files.file) {
      const bookFilePath = path.resolve(
          __dirname,
          "../../public/data/uploads/" + files.file[0].filename
      );

      const bookFileName = files.file[0].filename;
      completeFileName = bookFileName;

      const uploadResultPdf = await cloudinary.uploader.upload(bookFilePath, {
          resource_type: "raw",
          filename_override: completeFileName,
          folder: "book-pdfs",
          format: "pdf",
      });

      completeFileName = uploadResultPdf.secure_url;
      await fs.promises.unlink(bookFilePath);
  }

  const updatedBook = await Book.findOneAndUpdate(
      {
          _id: bookId,
      },
      {
          title: title,
          genre: genre,
          coverImage: completeCoverImage
              ? completeCoverImage
              : book.coverImage,
          file: completeFileName ? completeFileName : book.file,
      },
      { new: true }
  );

  res.json(updatedBook);
};

const listBooks=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    //pagination to be added
    const books=await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    return next(createHttpError(500,"Error While Getting Books"));
  }
}

export { createBook, updateBook,listBooks };
