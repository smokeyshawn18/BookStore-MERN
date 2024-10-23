import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa"; // Importing the book icon

import { MdOutlineAddBox } from "react-icons/md";
import { useState, useEffect } from "react";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://bookstore-backend-tryn.onrender.com/books")
      .then((response) => {
        console.log("Books response:", response.data); // Debugging line
        setBooks(response.data.data); // Make sure this is correct
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching books:", err); // Debugging line
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="p-4">
        {/* Centered Logo and Site Name */}
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-5xl font-bold text-sky-800 mr-2">Book Haven</h1>
          <FaBook className="text-sky-800 text-5xl" /> {/* Book Icon */}
        </div>

        {/* Button Toggle for View Type */}
        <div className="flex justify-center items-center gap-x-4 mb-4">
          <button
            className="bg-sky-200 hover:bg-sky-600 px-4 py-2 rounded-lg transition duration-300"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg transition duration-300"
            onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>

        {/* Books List Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold my-8">Books List</h2>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>

        {/* Conditional Rendering of Book Lists */}
        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </>
  );
};

export default Home;
