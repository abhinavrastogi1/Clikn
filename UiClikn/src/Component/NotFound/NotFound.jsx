import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <AlertTriangle className="w-16 h-16 mb-4 text-yellow-400 animate-pulse" />
        <h1 className="text-6xl font-extrabold text-red-500 mb-2 tracking-tight">404</h1>
        <p className="text-xl text-gray-300 mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-2 inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl transition duration-300 underline"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
