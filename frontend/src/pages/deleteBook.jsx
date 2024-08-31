import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted Successfully', {variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please check console');
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <BackButton />
        <h1 className="text-2xl font-bold mb-4">Delete Book</h1>
        {loading ? <Spinner /> : null}
        <div className="text-center">
          <h3 className="text-lg mb-4">Are you sure you want to delete this book?</h3>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors w-full"
            onClick={handleDeleteBook}
          >
            Yes, Delete It
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;