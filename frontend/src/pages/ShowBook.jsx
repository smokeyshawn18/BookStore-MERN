import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState(null); // Initialize as null for better checks
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [error, setError] = useState(null); // State to handle error messages

  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://bookstore-backend-tryn.onrender.com/books/${id}`
        );
        console.log("Response from API:", res);

        if (res.data && res.data.data) {
          setBook(res.data.data); // Access book data directly from response
        } else {
          setBook(null); // Reset to null if no book data
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError(
          err.response ? err.response.data.message : "An error occurred"
        ); // Capture error message
      } finally {
        setLoading(false); // Set loading to false at the end
      }
    };

    fetchBook();
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl font-bold my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : error ? ( // Check if there was an error
        <p>{error}</p>
      ) : book ? ( // Check if the book exists
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title || "N/A"}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author || "N/A"}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear || "N/A"}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>
              {book.createdAt ? new Date(book.createdAt).toString() : "N/A"}
            </span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Last Updated Time
            </span>
            <span>
              {book.updatedAt ? new Date(book.updatedAt).toString() : "N/A"}
            </span>
          </div>
        </div>
      ) : (
        <p>No book found.</p>
      )}
    </div>
  );
};

export default ShowBook;
