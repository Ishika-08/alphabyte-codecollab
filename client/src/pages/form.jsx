import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Form = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload/kk44', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('File uploaded successfully!');
        // Redirect user to /editor/hash (replace 'hash' with actual hash value if available)
        navigate(`/candidate`);
      } else {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="mt-4 flex items-center justify-center p-12">
      <div className="shadow-2xl rounded-3xl mx-auto w-full max-w-[550px]">
        <h1 className="text-center text-2xl font-bold text-violet-600 sm:text-3xl">Upload File</h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Upload the Excel file which contains data of all the scheduled interviews.
        </p>
        <form className="py-6 px-9" onSubmit={handleFormSubmit}>
          <div className="mb-6 pt-4">
            <label htmlFor="file" className="mb-5 block text-xl font-semibold text-[#07074D]">
              Upload Excel File
            </label>
            <input type="file" name="file" id="file" className="sr-only" onChange={handleFileChange} />
            <label htmlFor="file" className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
              <div>
                <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                  Drop file here or Browse
                </span>
              </div>
            </label>
          </div>
          <div>
            <button type="submit" className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
              Send File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
