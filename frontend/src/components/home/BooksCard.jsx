import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import PropTypes from "prop-types"; // Import PropTypes
import { useState } from "react";
import { BiShow } from "react-icons/bi";
import BookModal from "./BookModel";

const BooksCard = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // State to track selected book

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4">
      {books.map((item) => (
        <div
          key={item._id}
          className="border border-gray-300 rounded-lg p-4 relative hover:shadow-lg transition-shadow duration-300 bg-white"
        >
          <h2 className="absolute top-2 right-2 px-4 py-1 bg-red-300 rounded-lg font-bold">
            {item.publishYear}
          </h2>
          <div className="flex items-center gap-x-2 mb-2">
            <PiBookOpenTextLight className="text-red-300 text-3xl" />
            <h2 className="text-xl font-semibold">Title: {item.title}</h2>
          </div>
          <div className="flex items-center gap-x-2">
            <BiUserCircle className="text-red-300 text-2xl" />
            <h3 className="text-lg font-medium">Author: {item.author}</h3>
          </div>
          <div className="flex justify-between mt-4 items-center gap-x-2">
            <BiShow
              className="text-3xl text-blue-800 hover:text-black cursor-pointer transition duration-200"
              onClick={() => {
                setSelectedBook(item);
                setShowModal(true);
              }}
            />
            <Link to={`/books/details/${item._id}`}>
              <BsInfoCircle className="text-2xl text-green-800 hover:text-black transition duration-200" />
            </Link>
            <Link to={`/books/edit/${item._id}`}>
              <AiOutlineEdit className="text-2xl text-yellow-500 hover:text-black transition duration-200" />
            </Link>
            <Link to={`/books/delete/${item._id}`}>
              <MdOutlineDelete className="text-2xl text-red-600 hover:text-black transition duration-200" />
            </Link>
          </div>
        </div>
      ))}

      {showModal && selectedBook && (
        <BookModal book={selectedBook} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

// Define prop types for validation
BooksCard.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Book ID
      title: PropTypes.string.isRequired, // Title of the book
      author: PropTypes.string.isRequired, // Author of the book
      publishYear: PropTypes.number.isRequired, // Publish year
    })
  ).isRequired, // Ensure books is an array of objects and is required
};

export default BooksCard;
