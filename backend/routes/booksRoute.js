import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for saving a Book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for getting all Books from the DB
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for getting a Book from the DB by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    // Check if the book was found
    if (!book) {
      return res.status(404).json({ error: "No book found" });
    }

    return res.status(200).json({
      data: book,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for updating a Book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res
      .status(200)
      .json({ message: "Book updated successfully", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for deleting a Book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
