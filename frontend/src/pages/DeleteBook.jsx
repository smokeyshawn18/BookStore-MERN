import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(true); // Start with loading true
  const [book, setBook] = useState(null); // Start with null
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch the book details
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data); // Store book data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred while fetching book details.");
        console.error(error);
      });
  }, [id]);

  const handleDeleteBook = () => {
    setLoading(true); // Start loading
    axios
      .delete(`http://localhost:5555/books/${id}`) // Ensure this URL matches your fetch URL
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully!", { variant: "success" });
        navigate("/"); // Redirect after deletion
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        enqueueSnackbar("Error", { variant: "error" });
      });
  };

  // Show spinner while loading
  if (loading) {
    return <Spinner />;
  }

  // If no book found, display a message
  if (!book) {
    return <div>No book found!</div>;
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center">Delete Book</h1>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-6 max-w-lg mx-auto">
        <h3 className="text-2xl text-center mb-6">
          Are you sure you want to delete the book titled{" "}
          <span className="font-bold">{book.title}</span>?
        </h3>
        <button
          className="p-4 bg-red-600 text-white rounded-lg w-full hover:bg-red-700 transition-all"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
