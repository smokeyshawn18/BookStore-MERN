import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import PropTypes from "prop-types"; // Import PropTypes
import { useState } from "react";
import { BiShow } from "react-icons/bi";
import BookModal from "./BookModel";

const BooksSingleCard = ({ book, index }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <tr key={book._id} className="h-8">
      <td className="border border-slate-600 rounded-md text-center">
        {index + 1} {/* Use the index prop to display the row number */}
      </td>
      <td className="border border-slate-600 rounded-md text-center">
        {book.title}
      </td>
      <td className="border border-slate-600 rounded-md text-center max-md:hidden">
        {book.author}
      </td>
      <td className="border border-slate-600 rounded-md text-center max-md:hidden">
        {book.publishYear}
      </td>
      <td className="border border-slate-600 rounded-md text-center">
        <div className="flex justify-center gap-x-4">
          <BiShow
            className="text-3xl text-blue-800 hover:text-black cursor-pointer"
            onClick={() => setShowModal(true)}
          />
          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className="text-2xl text-green-800" />
          </Link>
          <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-600" />
          </Link>
          <Link to={`/books/delete/${book._id}`}>
            <MdOutlineDelete className="text-2xl text-red-600" />
          </Link>
          {showModal && (
            <BookModal book={book} onClose={() => setShowModal(false)} />
          )}
        </div>
      </td>
    </tr>
  );
};

// Define prop types for validation
BooksSingleCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Unique identifier for the book
    title: PropTypes.string.isRequired, // Title of the book
    author: PropTypes.string.isRequired, // Author of the book
    publishYear: PropTypes.number.isRequired, // Year the book was published
  }).isRequired, // Ensure book is required
  index: PropTypes.number.isRequired, // Index of the book in the list
};

export default BooksSingleCard;
