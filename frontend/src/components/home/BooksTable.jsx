import PropTypes from "prop-types"; // Import PropTypes
import BooksSingleCard from "./BooksSingleCard";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse border border-sky-400 bg-white rounded-lg shadow-md">
        <thead className="bg-sky-500 text-white">
          <tr>
            <th className="border border-sky-400 p-4 text-left font-bold">
              No
            </th>
            <th className="border border-sky-400 p-4 text-left font-bold">
              Title
            </th>
            {/* Hide the Author column on small screens */}
            <th className="border border-sky-400 p-4 hidden sm:table-cell text-left font-bold">
              Author
            </th>
            {/* Hide the Publish Year column on small screens */}
            <th className="border border-sky-400 p-4 hidden sm:table-cell text-left font-bold">
              Publish Year
            </th>
            <th className="border border-sky-400 p-4 font-bold">Operations</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {books.length > 0 ? (
            books.map((item, index) => (
              <BooksSingleCard key={item._id} book={item} index={index} />
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-4 text-gray-500 font-bold"
              >
                No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Define prop types for validation
BooksTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Book ID
      title: PropTypes.string.isRequired, // Title of the book
      author: PropTypes.string.isRequired, // Author of the book
      publishYear: PropTypes.number.isRequired, // Publish year (you can also use PropTypes.string if it can be a string)
    })
  ).isRequired, // Ensure books is an array of objects and is required
};

export default BooksTable;
