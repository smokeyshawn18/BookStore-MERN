import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState(""); // Initialized with empty string
  const [author, setAuthor] = useState(""); // Initialized with empty string
  const [publishYear, setPublishYear] = useState(""); // Initialized with empty string
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch the book data on component mount
    axios
      .get(`https://bookstore-backend-tryn.onrender.com/books/${id}`)
      .then((response) => {
        const { title, author, publishYear } = response.data;
        setAuthor(author || "");
        setTitle(title || "");
        setPublishYear(publishYear || "");
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        setLoading(false); // Ensure loading is false on error
        console.error("Error fetching book:", err);
        alert("An Error Occurred!"); // Display an error message
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`https://bookstore-backend-tryn.onrender.com/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully!", { variant: "success" });
        navigate("/"); // Redirect after saving
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error saving book:", err);
        enqueueSnackbar("Failed to update book!", { variant: "error" });
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading && <Spinner />} {/* Show spinner while loading */}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 w-full max-w-lg mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            disabled={loading} // Disable input while loading
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500 block">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            disabled={loading} // Disable input while loading
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500 block">
            Publish Year
          </label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            disabled={loading} // Disable input while loading
          />
        </div>
        <button
          className="p-2 bg-sky-300 hover:bg-sky-400 rounded-md w-full md:w-auto mx-auto my-2"
          onClick={handleEditBook}
          disabled={loading} // Disable button while loading
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
